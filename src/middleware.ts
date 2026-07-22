import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyTokenEdge, COOKIE_NAME } from '@/lib/auth-edge';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow admin routes, API routes, and ALL static/Next.js internal paths
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/icons') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  // Check if user has a valid auth cookie → bypass maintenance
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (token) {
    const payload = await verifyTokenEdge(token);
    if (payload) {
      return NextResponse.next();
    }
  }

  let maintenanceMode = false;
  try {
    const port = process.env.PORT || 3000;
    const settingsRes = await fetch(`http://127.0.0.1:${port}/api/settings`, {
      signal: AbortSignal.timeout(5000),
      headers: { 'x-internal-request': '1' },
    });
    if (settingsRes.ok) {
      const settings = await settingsRes.json();
      maintenanceMode = settings.maintenance_mode === 'true';
    }
  } catch {
    // If fetch fails, default to maintenance OFF so site stays accessible
    maintenanceMode = false;
  }

  if (maintenanceMode) {
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AERTH - Under Maintenance</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0c0c0c; color: white; font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center; }
    .container { padding: 2rem; max-width: 400px; width: 100%; }
    .icon { width: 56px; height: 56px; margin: 0 auto 1.5rem; border: 2px solid #27272a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; }
    h1 { font-size: 1.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.5rem; }
    .subtitle { color: #a1a1aa; font-size: 0.875rem; line-height: 1.6; margin-bottom: 0.5rem; }
    .tagline { color: #52525b; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 1.5rem; }
    .divider { border: none; border-top: 1px solid #27272a; margin: 1.5rem 0; }
    .form-group { margin-bottom: 0.75rem; text-align: left; }
    label { display: block; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #71717a; margin-bottom: 0.4rem; }
    input { width: 100%; background: #18181b; border: 1px solid #3f3f46; border-radius: 8px; padding: 0.75rem 1rem; color: white; font-size: 0.875rem; outline: none; transition: border-color 0.15s; }
    input:focus { border-color: #71717a; }
    .btn { width: 100%; padding: 0.8rem; border-radius: 8px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; border: none; cursor: pointer; margin-top: 0.5rem; transition: all 0.15s; }
    .btn-primary { background: white; color: black; }
    .btn-primary:hover { background: #e5e5e5; }
    .btn-primary:disabled { background: #52525b; color: #a1a1aa; cursor: not-allowed; }
    .error { color: #ef4444; font-size: 0.75rem; margin-top: 0.75rem; min-height: 1rem; }
    .note { color: #52525b; font-size: 0.65rem; margin-top: 1rem; }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">&#9881;</div>
    <h1>Under Maintenance</h1>
    <p class="subtitle">We are currently performing scheduled updates.</p>
    <p class="tagline">Move with the Elements</p>
    <hr class="divider">
    <form id="loginForm">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="your@email.com" autocomplete="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="••••••••" autocomplete="current-password" required>
      </div>
      <button type="submit" class="btn btn-primary" id="submitBtn">Login</button>
      <p class="error" id="errorMsg"></p>
    </form>
    <p class="note">Enter your credentials to access the site.</p>
  </div>
  <script>
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const errEl = document.getElementById('errorMsg');
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      btn.disabled = true;
      btn.textContent = 'Logging in...';
      errEl.textContent = '';
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          errEl.textContent = data.error || 'Invalid credentials';
          btn.disabled = false;
          btn.textContent = 'Login';
          return;
        }
        // Redirect based on role
        if (data.user && data.user.role === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/';
        }
      } catch {
        errEl.textContent = 'Network error. Please try again.';
        btn.disabled = false;
        btn.textContent = 'Login';
      }
    });
  </script>
</body>
</html>`,
      {
        headers: { 'Content-Type': 'text/html' },
        status: 503,
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|images|icons).*)'],
};
