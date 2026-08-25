import paramiko
import os
import subprocess
import time
import sys

# 1. Load .env configuration
if os.path.exists('.env'):
    with open('.env') as ef:
        for line in ef:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"\''))

SSH_HOST = os.getenv('SSH_HOST', '145.79.58.122')
SSH_PORT = int(os.getenv('SSH_PORT', '65002'))
SSH_USER = os.getenv('SSH_USER', 'u892283443')
SSH_PASS = os.getenv('SSH_PASS', 'Qubnix123@')
REMOTE_PATH = os.getenv('REMOTE_PATH', f'/home/{SSH_USER}/frontend')
DATABASE_URL = os.getenv('DATABASE_URL', '')
JWT_SECRET = os.getenv('JWT_SECRET', 'dryfruit-secret-key')

LOCAL = os.getcwd()
FRONTEND = REMOTE_PATH
F = FRONTEND + '/standalone'
TMP = FRONTEND + '/standalone_tmp'
NODE_BIN = '/opt/alt/alt-nodejs20/root/usr/bin'

def print_step(step, msg):
    print(f"[{step}] {msg}", flush=True)

def print_success(msg):
    print(f"[SUCCESS] {msg}", flush=True)

def print_error(msg):
    print(f"[ERROR] {msg}", flush=True)

def main():
    start_total = time.time()
    print("=" * 60)
    print(" ULTRA FAST HOSTINGER DEPLOYMENT")
    print(f" Target: {SSH_USER}@{SSH_HOST}:{SSH_PORT} ({REMOTE_PATH})")
    print("=" * 60)

    # Step 1: Check standalone build
    print_step("1/5", "Checking local Next.js standalone build...")
    standalone_dir = os.path.join(LOCAL, '.next', 'standalone')
    static_dir = os.path.join(LOCAL, '.next', 'static')
    
    if not os.path.exists(standalone_dir) or not os.path.exists(static_dir):
        print_error("Next.js standalone build missing! Run 'npm run build' first.")
        sys.exit(1)

    # Step 2: Create Fast Gzip Tarball using native system tar (Lightning Fast)
    t0 = time.time()
    print_step("2/5", "Creating fast deployment bundle...")
    tar_path = os.path.join(LOCAL, 'fast_deploy.tar.gz')
    if os.path.exists(tar_path):
        os.remove(tar_path)

    # Fast creation: tar standalone + static into fast_deploy.tar.gz
    # Command: tar -czf fast_deploy.tar.gz -C .next/standalone .
    tar_cmd = [
        'tar', '-czf', 'fast_deploy.tar.gz',
        '-C', os.path.join('.next', 'standalone'), '.'
    ]
    
    res = subprocess.run(tar_cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print_error(f"Native tar failed: {res.stderr}")
        sys.exit(1)

    # Append .next/static inside the tar
    tar_static_cmd = [
        'tar', '-rzf', 'fast_deploy.tar.gz',
        '--prefix=.next/static/',
        '-C', os.path.join('.next', 'static'), '.'
    ]
    # Note: If -r with gzip isn't supported in bsdtar, we bundle via combined tar command below:
    # Alternative native bundle command:
    tar_bundle_cmd = [
        'tar', '-czf', 'fast_deploy.tar.gz',
        '-C', '.next/standalone', '.',
        '-C', '../static', '.'
    ]

    # Let's test standard tar structure by copying static into .next/standalone/.next/static
    target_static = os.path.join(standalone_dir, '.next', 'static')
    os.makedirs(target_static, exist_ok=True)
    
    # Sync static into standalone/.next/static for clean 1-pass tar
    subprocess.run(['cmd', '/c', f'xcopy /E /Y /Q "{static_dir}" "{target_static}"'], capture_output=True)

    res = subprocess.run(['tar', '-czf', 'fast_deploy.tar.gz', '-C', '.next/standalone', '.'], capture_output=True)
    if res.returncode != 0:
        print_error(f"Tar creation failed: {res.stderr}")
        sys.exit(1)

    tar_size = os.path.getsize(tar_path)
    tar_mb = tar_size / (1024 * 1024)
    print(f"    Bundle created: {tar_mb:.2f} MB in {time.time() - t0:.2f}s")

    # Step 3: SSH Connection & High-Speed Stream Upload
    t0 = time.time()
    print_step("3/5", f"Connecting via SSH to {SSH_HOST}:{SSH_PORT}...")
    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    c.connect(SSH_HOST, port=SSH_PORT, username=SSH_USER, password=SSH_PASS, timeout=15)
    
    # Prepare remote directory
    _, stdout, _ = c.exec_command(f'rm -rf {TMP} && mkdir -p {TMP}')
    stdout.channel.recv_exit_status()

    # Upload with 1MB chunk size and progress tracking
    print(f"    Uploading {tar_mb:.2f} MB via high-speed stream...")
    stdin, stdout, stderr = c.exec_command(f'cat > {TMP}/fast_deploy.tar.gz')
    chunk_size = 1024 * 1024 # 1MB chunks
    uploaded = 0

    with open(tar_path, 'rb') as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            stdin.write(chunk)
            stdin.flush()
            uploaded += len(chunk)
            pct = (uploaded / tar_size) * 100
            sys.stdout.write(f"\r    [Progress] {pct:.1f}% ({uploaded / (1024*1024):.1f}/{tar_mb:.1f} MB)")
            sys.stdout.flush()
    
    stdin.close()
    exit_code = stdout.channel.recv_exit_status()
    print()
    
    upload_time = time.time() - t0
    speed_mbps = tar_mb / upload_time if upload_time > 0 else 0
    if exit_code != 0:
        print_error(f"Upload failed: {stderr.read().decode()}")
        sys.exit(1)
    
    print(f"    Upload completed in {upload_time:.2f}s ({speed_mbps:.2f} MB/s)")

    # Step 4: Chained Remote Execution (Single SSH Call)
    t0 = time.time()
    print_step("4/5", "Extracting, setting up environment & restarting PM2...")

    ecosystem_content = f"""module.exports = {{
  apps: [{{
    name: 'aerth',
    cwd: '{F}',
    script: '{NODE_BIN}/node',
    args: 'server.js',
    env: {{
      PORT: 3000,
      NODE_ENV: 'production',
      PATH: '{NODE_BIN}:/usr/local/bin:/usr/bin:/bin'
    }},
    out_file: '{FRONTEND}/pm2.log',
    error_file: '{FRONTEND}/pm2.err',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    max_memory_restart: '1G',
    kill_timeout: 10000,
    listen_timeout: 15000,
    restart_delay: 3000,
    max_restarts: 30,
    min_uptime: 10000,
    autorestart: true
  }}]
}};"""

    remote_commands = f"""set -e
export PATH={NODE_BIN}:$PATH

# 1. Extract tarball
cd {TMP}
tar xzf fast_deploy.tar.gz
rm fast_deploy.tar.gz

# 2. Link Node modules & Public folder
cp -r {FRONTEND}/node_modules/@prisma {TMP}/node_modules/ 2>/dev/null || true
cp -r {FRONTEND}/node_modules/.prisma {TMP}/node_modules/ 2>/dev/null || true
ln -sfn {FRONTEND}/public {TMP}/public

# 3. Create .env file
cat << 'EOF' > {TMP}/.env
DATABASE_URL="{DATABASE_URL}"
JWT_SECRET="{JWT_SECRET}"
EOF

# 4. Atomic directory swap
rm -rf {F}_old
mv {F} {F}_old 2>/dev/null || true
mv {TMP} {F}
mkdir -p {FRONTEND}/.next
ln -sfn {F}/.next/static {FRONTEND}/.next/static

DOMAIN_DIR="/home/{SSH_USER}/domains/darkgreen-raccoon-384863.hostingersite.com/public_html"
if [ -d "$DOMAIN_DIR" ]; then
  ln -sfn {F}/.next "$DOMAIN_DIR/_next" 2>/dev/null || true
  ln -sfn {FRONTEND}/public/images "$DOMAIN_DIR/images" 2>/dev/null || true
  ln -sfn {FRONTEND}/public/uploads "$DOMAIN_DIR/uploads" 2>/dev/null || true
fi

# 5. Ecosystem config
cat << 'EOF' > {FRONTEND}/ecosystem.config.js
{ecosystem_content}
EOF

# 6. PM2 Zero-Downtime Reload / Restart using node directly
cd {FRONTEND}
chmod +x node_modules/.bin/* 2>/dev/null || true
node node_modules/pm2/bin/pm2 reload aerth 2>/dev/null || node node_modules/pm2/bin/pm2 start ecosystem.config.js
rm -rf {F}_old
"""

    stdin, stdout, stderr = c.exec_command(remote_commands)
    exit_status = stdout.channel.recv_exit_status()

    if exit_status != 0:
        err_text = stderr.read().decode('utf-8', errors='replace')
        print_error(f"Remote deployment command failed (exit code {exit_status}):\n{err_text}")
        sys.exit(1)
    
    print(f"    Remote setup & PM2 reload done in {time.time() - t0:.2f}s")

    # Step 5: Instant Live Health Check
    print_step("5/5", "Performing live HTTP health check...")
    time.sleep(2)
    _, stdout, _ = c.exec_command('curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://127.0.0.1:3000/')
    http_code = stdout.read().decode().strip()
    
    c.close()
    if os.path.exists(tar_path):
        os.remove(tar_path)

    total_time = time.time() - start_total
    print("=" * 60)
    if http_code == "200":
        print_success(f"DEPLOYMENT COMPLETE! App is LIVE (HTTP 200 OK)")
    else:
        print_error(f"App deployed but returned HTTP status: {http_code}")
    print(f" Total Time Elapsed: {total_time:.2f} seconds")
    print("=" * 60)

if __name__ == '__main__':
    main()
