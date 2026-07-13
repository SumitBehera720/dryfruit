import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow admin routes, API routes, and static files during maintenance
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  try {
    const settingsRes = await fetch(`${request.nextUrl.origin}/api/settings`, {
      signal: AbortSignal.timeout(3000),
    });

    if (settingsRes.ok) {
      const settings = await settingsRes.json();
      if (settings.maintenance_mode === 'true') {
        return new NextResponse(
          `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AERTH - Under Maintenance</title>
  <style>
    body { margin: 0; padding: 0; background: #0c0c0c; color: white; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center; }
    .container { padding: 2rem; max-width: 480px; }
    h1 { font-size: 2rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
    p { color: #a1a1aa; font-size: 0.875rem; line-height: 1.6; }
    .icon { width: 48px; height: 48px; border: 2px solid #27272a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1.5rem; }
    .tagline { color: #52525b; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.3em; margin-top: 1.5rem; }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">⚙</div>
    <h1>Under Maintenance</h1>
    <p>We are currently performing scheduled updates to enhance your experience. We will be back shortly.</p>
    <p class="tagline">Move with the Elements</p>
  </div>
</body>
</html>`,
          {
            headers: { 'Content-Type': 'text/html' },
            status: 503,
          }
        );
      }
    }
  } catch {
    // If settings fetch fails, allow access
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
