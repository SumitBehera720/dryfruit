import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { query } from '@/lib/db';

interface AddressRow {
  id: number;
  userId: number;
  label: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: number;
}

// Ensure Address table exists
async function ensureTable() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS Address (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        label VARCHAR(50) DEFAULT 'Home',
        line1 VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        pincode VARCHAR(20) NOT NULL,
        isDefault TINYINT(1) DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_userId (userId)
      )
    `);
  } catch { /* table may already exist */ }
}

export async function GET(request: NextRequest) {
  const payload = requireAuth(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await ensureTable();
    const rows = await query<AddressRow>(
      'SELECT * FROM Address WHERE userId = ? ORDER BY isDefault DESC, id ASC',
      [payload.userId]
    );
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const payload = requireAuth(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await ensureTable();
    const body = await request.json();
    const { label, line1, city, state, pincode, isDefault } = body;

    if (!line1 || !city || !state || !pincode) {
      return NextResponse.json({ error: 'All address fields are required' }, { status: 400 });
    }

    // If setting as default, clear others first
    if (isDefault) {
      await query('UPDATE Address SET isDefault = 0 WHERE userId = ?', [payload.userId]);
    }

    const result = await query<{ insertId: number }>(
      'INSERT INTO Address (userId, label, line1, city, state, pincode, isDefault) VALUES (?,?,?,?,?,?,?)',
      [payload.userId, label || 'Home', line1, city, state, pincode, isDefault ? 1 : 0]
    );

    return NextResponse.json({ id: (result as unknown as { insertId: number }).insertId, success: true });
  } catch {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const payload = requireAuth(request);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await ensureTable();
    const body = await request.json();
    const { id, action, label, line1, city, state, pincode } = body;

    if (action === 'setDefault') {
      await query('UPDATE Address SET isDefault = 0 WHERE userId = ?', [payload.userId]);
      await query('UPDATE Address SET isDefault = 1 WHERE id = ? AND userId = ?', [id, payload.userId]);
      return NextResponse.json({ success: true });
    }

    if (action === 'delete') {
      await query('DELETE FROM Address WHERE id = ? AND userId = ?', [id, payload.userId]);
      return NextResponse.json({ success: true });
    }

    // Update address
    await query(
      'UPDATE Address SET label=?, line1=?, city=?, state=?, pincode=? WHERE id=? AND userId=?',
      [label, line1, city, state, pincode, id, payload.userId]
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
