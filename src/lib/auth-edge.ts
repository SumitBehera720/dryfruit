import * as jose from 'jose';

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-placeholder';
export const COOKIE_NAME = 'aerth_token';

export async function verifyTokenEdge(token: string): Promise<JwtPayload | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret, { algorithms: ['HS256'] });
    return payload as unknown as JwtPayload;
  } catch {
    return null;
  }
}

export function getTokenFromCookie(request: { cookies: { get: (name: string) => { value: string } | undefined } }): string | null {
  return request.cookies.get(COOKIE_NAME)?.value || null;
}
