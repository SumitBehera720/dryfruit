import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-placeholder';

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return null;
}

export function requireAdmin(request: NextRequest): JwtPayload | null {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || payload.role !== 'admin') return null;
  return payload;
}

// Accepts any authenticated user (customer or admin)
export function requireAuth(request: NextRequest): JwtPayload | null {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}

export type AuthResult = 
  | { status: 200; payload: JwtPayload }
  | { status: 401; error: string }
  | { status: 403; error: string };

export function authenticateAdmin(request: NextRequest): AuthResult {
  const token = getTokenFromRequest(request);
  if (!token) {
    return { status: 401, error: 'Authentication required. No token provided.' };
  }
  const payload = verifyToken(token);
  if (!payload) {
    return { status: 401, error: 'Invalid or expired authentication token.' };
  }
  if (payload.role !== 'admin') {
    return { status: 403, error: 'Forbidden. Admin privileges required.' };
  }
  return { status: 200, payload };
}

