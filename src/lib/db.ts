import mysql from 'mysql2/promise';

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

export function getPool(): mysql.Pool {
  if (!pool) {
    const dbUrl = process.env.DATABASE_URL || '';
    if (!dbUrl.startsWith('mysql://')) {
      throw new Error('Database URL is not configured or is invalid');
    }
    const config = parseDbUrl(dbUrl);
    pool = mysql.createPool({
      ...config,
      waitForConnections: true,
      connectionLimit: 3,
      queueLimit: 10,
      connectTimeout: 10000,
      idleTimeout: 30000,
    });
  }
  return pool;
}

export async function query<T = unknown>(sql: string, params?: (string | number | boolean | null)[]): Promise<T[]> {
  const db = getPool();
  const [rows] = await db.execute(sql, params as never);
  return rows as T[];
}
