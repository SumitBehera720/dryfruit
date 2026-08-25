import mysql from 'mysql2/promise';

let dbConfigured = true;

// Validate environment variables at startup
function validateEnv() {
  const required = ['DATABASE_URL', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  if (missing.length > 0) {
    console.error(`[ERROR] [FATAL] Startup validation failed. Missing environment variables: ${missing.join(', ')}`);
    dbConfigured = false;
  }
}
validateEnv();

// Parse the DATABASE_URL env var
// Format: mysql://user:pass@host:port/dbname
function parseDbUrl(url: string) {
  const match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:/]+)(?::(\d+))?\/(.+)/);
  if (!match) throw new Error('Invalid DATABASE_URL format');
  return {
    user: decodeURIComponent(match[1]),
    password: decodeURIComponent(match[2]),
    host: match[3],
    port: parseInt(match[4] || '3306'),
    database: match[5],
  };
}

let pool: mysql.Pool | null = null;
let schemaVerified = false;

async function verifySchema(pool: mysql.Pool) {
  const expectedSchema: Record<string, string[]> = {
    Product: ['id', 'slug', 'name', 'price', 'salePrice', 'label', 'category', 'gender', 'description', 'active', 'createdAt', 'updatedAt'],
    ProductVariant: ['id', 'productId', 'colorName', 'hex', 'image', 'images', 'stock'],
    ContentSection: ['id', 'page', 'section', 'title', 'subtitle', 'description', 'image', 'linkUrl', 'linkText', 'sortOrder', 'active', 'createdAt', 'updatedAt'],
    JournalPost: ['id', 'title', 'excerpt', 'author', 'category', 'date', 'image', 'active', 'createdAt', 'updatedAt'],
    Category: ['id', 'slug', 'name', 'gender', 'sortOrder']
  };

  console.log('[INFO] Starting database schema verification...');
  for (const [table, columns] of Object.entries(expectedSchema)) {
    try {
      const [rows] = await pool.execute(`DESCRIBE \`${table}\``);
      const existingCols = (rows as { Field: string }[]).map(row => row.Field);
      const missing = columns.filter(col => !existingCols.includes(col));
      if (missing.length > 0) {
        console.error(`[ERROR] [FATAL] Schema mismatch in table '${table}'. Missing columns: ${missing.join(', ')}`);
      } else {
        console.log(`[INFO] Table '${table}' schema verified successfully.`);
      }
    } catch (err) {
      const error = err as Error;
      console.error(`[ERROR] [FATAL] Schema verification failed for table '${table}':`, error.message);
    }
  }
}

async function checkHealthAndSchema(pool: mysql.Pool) {
  if (schemaVerified) return;
  schemaVerified = true;

  try {
    console.log('[INFO] Running database connection health check...');
    const [healthRows] = await pool.execute('SELECT NOW() as now');
    const dbTime = (healthRows as { now: string }[])[0]?.now;
    console.log(`[INFO] Database connection healthy. Server time: ${dbTime}`);

    await verifySchema(pool);
  } catch (err) {
    const error = err as Error;
    console.error('[ERROR] [FATAL] Database connection or health check failed:', error.message);
  }
}

export function getPool(): mysql.Pool {
  if (!dbConfigured) {
    throw new Error('Database is not configured: missing DATABASE_URL or JWT_SECRET env variables.');
  }
  if (!pool) {
    const dbUrl = process.env.DATABASE_URL || '';
    if (!dbUrl.startsWith('mysql://')) {
      throw new Error('Database URL is not configured or is invalid');
    }
    const config = parseDbUrl(dbUrl);

    // Startup connection details logging (redacting password)
    console.log('--- DATABASE CONNECTION STARTUP ---');
    console.log(`Connected to MySQL:`);
    console.log(`  Host:     ${config.host}:${config.port}`);
    console.log(`  Database: ${config.database}`);
    console.log(`  User:     ${config.user}`);
    console.log('-----------------------------------');

    pool = mysql.createPool({
      ...config,
      waitForConnections: true,
      connectionLimit: 3,
      queueLimit: 10,
      connectTimeout: 10000,
      idleTimeout: 30000,
    });

    // Run connection and schema health check asynchronously
    checkHealthAndSchema(pool).catch((err) => {
      console.error('[ERROR] Background health check failed:', err);
    });
  }
  return pool;
}

export async function query<T = unknown>(sql: string, params?: (string | number | boolean | null)[]): Promise<T[]> {
  const db = getPool();
  const startTime = Date.now();
  const debugMode = process.env.ADMIN_DEBUG === 'true';

  try {
    const [result] = await db.execute(sql, params as never);
    const duration = Date.now() - startTime;

    let rowsAffected = 0;
    if (result && typeof result === 'object' && 'affectedRows' in result) {
      rowsAffected = (result as mysql.ResultSetHeader).affectedRows;
      if (debugMode) {
        console.log(`[INFO] [SQL Query] SQL: "${sql}" | Params: ${JSON.stringify(params || [])} | Affected Rows: ${rowsAffected} | Time: ${duration}ms`);
      } else {
        console.log(`[INFO] [SQL Query] SQL: "${sql}" | Affected Rows: ${rowsAffected} | Time: ${duration}ms`);
      }
    } else {
      const rowCount = Array.isArray(result) ? result.length : 0;
      if (debugMode) {
        console.log(`[INFO] [SQL Query] SQL: "${sql}" | Params: ${JSON.stringify(params || [])} | Returned Rows: ${rowCount} | Time: ${duration}ms`);
      } else {
        console.log(`[INFO] [SQL Query] SQL: "${sql}" | Returned Rows: ${rowCount} | Time: ${duration}ms`);
      }
    }

    return result as T[];
  } catch (error) {
    const duration = Date.now() - startTime;
    const err = error as Error;
    if (debugMode) {
      console.error(`[ERROR] [SQL Error] SQL: "${sql}" | Params: ${JSON.stringify(params || [])} | Time: ${duration}ms | Error:`, error);
    } else {
      console.error(`[ERROR] [SQL Error] SQL: "${sql}" | Time: ${duration}ms | Error:`, err.message);
    }
    throw error;
  }
}

export async function withTransaction<T>(
  callback: (conn: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const db = getPool();
  const conn = await db.getConnection();
  const startTime = Date.now();
  try {
    await conn.beginTransaction();
    console.log('[INFO] [SQL Transaction] BEGIN');
    const result = await callback(conn);
    await conn.commit();
    const duration = Date.now() - startTime;
    console.log(`[INFO] [SQL Transaction] COMMIT | Time: ${duration}ms`);
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    const err = error as Error;
    console.error(`[ERROR] [SQL Transaction] ROLLBACK | Time: ${duration}ms | Error:`, err.message);
    try {
      await conn.rollback();
    } catch (rollbackErr) {
      console.error('[ERROR] [SQL Transaction] Rollback failed:', rollbackErr);
    }
    throw error;
  } finally {
    conn.release();
  }
}


