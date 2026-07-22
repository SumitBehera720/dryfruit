import paramiko, os, tarfile, time, sys

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)

FRONTEND = '/home/u892283443/frontend'
F = FRONTEND + '/standalone'
TMP = FRONTEND + '/standalone_tmp'
LOCAL = os.getcwd()

def run(cmd, timeout=180):
    _, stdout, stderr = c.exec_command(cmd, timeout=timeout)
    stdout.channel.settimeout(timeout)
    stderr.channel.settimeout(timeout)
    out = stdout.read().decode('utf-8', errors='replace').strip()
    err = stderr.read().decode('utf-8', errors='replace').strip()
    return out, err

def safe_print(label, text):
    clean = text.encode('ascii', errors='replace').decode('ascii')
    print(label, clean)

# Step 1: Create tar of standalone + static
print('Creating tar...')
tar_path = os.path.join(LOCAL, 'deploy.tar.gz')
with tarfile.open(tar_path, 'w:gz') as tar:
    standalone_dir = os.path.join(LOCAL, '.next', 'standalone')
    for root, dirs, files in os.walk(standalone_dir):
        rel = os.path.relpath(root, standalone_dir)
        for f in files:
            fp = os.path.join(root, f)
            if not os.path.exists(fp):
                continue
            try:
                tar.add(fp, arcname=os.path.join(rel, f) if rel != '.' else f)
            except Exception as e:
                print(f"Skipping {fp}: {e}")
    static_dir = os.path.join(LOCAL, '.next', 'static')
    for root, dirs, files in os.walk(static_dir):
        rel = os.path.relpath(root, static_dir)
        for f in files:
            fp = os.path.join(root, f)
            if not os.path.exists(fp):
                continue
            try:
                tar.add(fp, arcname=os.path.join('.next', 'static', rel, f) if rel != '.' else os.path.join('.next', 'static', f))
            except Exception as e:
                print(f"Skipping {fp}: {e}")

tar_size = os.path.getsize(tar_path)
print(f'Tar: {tar_size} bytes')

# Step 2: Prepare temp dir on server
safe_print('Preparing tmp dir:', run('rm -rf ' + TMP + ' && mkdir -p ' + TMP)[0])

# Step 3: Upload tar
print('Uploading...')
stdin, stdout, stderr = c.exec_command('cat > ' + TMP + '/deploy.tar.gz')
with open(tar_path, 'rb') as f:
    while True:
        chunk = f.read(65536)
        if not chunk:
            break
        stdin.write(chunk)
        stdin.flush()
stdin.close()
exit_status = stdout.channel.recv_exit_status()
if exit_status != 0:
    print('Upload failed via SSH stdin!', stderr.read().decode())
    sys.exit(1)

# Verify upload size
out, err = run('wc -c < ' + TMP + '/deploy.tar.gz')
try:
    lines = [l.strip() for l in out.strip().split('\n') if l.strip()]
    remote_size = int(lines[-1])
except (ValueError, IndexError):
    print(f'Failed to parse remote file size from output:\n{out}')
    sys.exit(1)

if remote_size != tar_size:
    print(f'UPLOAD SIZE MISMATCH: local={tar_size} remote={remote_size}')
    os.remove(tar_path)
    sys.exit(1)
print(f'Upload verified: {remote_size} bytes')

# Step 4: Extract
out, err = run('cd ' + TMP + ' && tar xzf deploy.tar.gz && rm deploy.tar.gz && echo "extracted"')
safe_print('Extract:', out)

# Step 5: Copy Prisma client + symlink public
NODE_BIN = '/opt/alt/alt-nodejs20/root/usr/bin'
cmds = '''
set -e
export PATH={NODE_BIN}:$PATH
cp -r {FRONTEND}/node_modules/@prisma {TMP}/node_modules/ 2>/dev/null || true
cp -r {FRONTEND}/node_modules/.prisma {TMP}/node_modules/ 2>/dev/null || true
ln -sfn {FRONTEND}/public {TMP}/public
echo "prisma done"
'''.format(F=FRONTEND, FRONTEND=FRONTEND, NODE_BIN=NODE_BIN, TMP=TMP)
out, err = run(cmds)
safe_print('Prisma:', out[-300:] if len(out) > 300 else out)

# Step 5b: Static files are already in the tar at .next/static/ — use them directly
# NO symlink to server's stale .next/static (that would cause hash mismatch 404s)

# Step 6: Verify files
out, err = run('ls -la ' + TMP + '/server.js && ls ' + TMP + '/.next/static/chunks/app/shop/ 2>&1 | head -3 && echo "files ok"')
safe_print('Files:', out[-300:] if len(out) > 300 else out)

# Step 7: Recreate .env in tmp
print('Creating .env...')
stdin, stdout, stderr = c.exec_command('cat > ' + TMP + '/.env')
stdin.write('DATABASE_URL="mysql://u892283443_aerth:Qubnix123%40@localhost:3306/u892283443_aerth"\n')
stdin.write('JWT_SECRET="aerth-jwt-secret-2026-qubnix"\n')
stdin.close()
stdout.channel.recv_exit_status()

# Step 8: Atomic swap
out, err = run('rm -rf ' + F + '_old && mv ' + F + ' ' + F + '_old 2>/dev/null; mv ' + TMP + ' ' + F + ' && mkdir -p ' + FRONTEND + '/.next && ln -sfn ' + F + '/.next/static ' + FRONTEND + '/.next/static && echo "swapped"')
safe_print('Swap:', out)

# Step 8b: Write robust PM2 ecosystem config (prevents crash-loop on EADDRINUSE)
ECOSYSTEM = '''module.exports = {
  apps: [{
    name: 'aerth',
    cwd: '%s',
    script: '/opt/alt/alt-nodejs20/root/usr/bin/node',
    args: 'server.js',
    env: {
      PORT: 3000,
      NODE_ENV: 'production',
      PATH: '/opt/alt/alt-nodejs20/root/usr/bin:/usr/local/bin:/usr/bin:/bin'
    },
    out_file: '%s/pm2.log',
    error_file: '%s/pm2.err',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    max_memory_restart: '1G',
    kill_timeout: 10000,
    listen_timeout: 15000,
    restart_delay: 5000,
    max_restarts: 30,
    min_uptime: 20000,
    exp_backoff_restart_delay: 100,
    autorestart: true,
  }]
};''' % (F, FRONTEND, FRONTEND)
stdin, stdout, stderr = c.exec_command('cat > ' + FRONTEND + '/ecosystem.config.js')
stdin.write(ECOSYSTEM)
stdin.close()
stdout.channel.recv_exit_status()
print('Ecosystem config written')

# Clean up any stale root-level .next directory that Next might fallback to
run('rm -rf ' + FRONTEND + '/.next')

# Step 9: Restart PM2 (use start to pick up new config)
out, err = run('export PATH=' + NODE_BIN + ':$PATH && cd ' + FRONTEND + ' && ./node_modules/.bin/pm2 delete aerth 2>/dev/null; ./node_modules/.bin/pm2 start ecosystem.config.js 2>&1', timeout=60)
time.sleep(5)
safe_print('PM2:', out[-300:] if len(out) > 300 else out)

# Step 10: Test endpoints
http = 'http://127.0.0.1:3000'
chunk_test = run('ls ' + F + '/.next/static/chunks/app/shop/ 2>/dev/null | head -1')[0].strip()
test_cmd = (
    'curl -s -o /dev/null -w "Root: %{http_code} " --max-time 5 ' + http + '/ && '
)
if chunk_test:
    test_cmd += 'curl -s -o /dev/null -w "Shop: %{http_code} " --max-time 5 ' + http + '/shop && '
test_cmd += 'echo "done"'
out, err = run(test_cmd, timeout=30)
safe_print('Test:', out)

# Step 11: Clean up old backup
run('rm -rf ' + F + '_old')
print('Cleaned up old backup')
os.remove(tar_path)
print('DONE')
