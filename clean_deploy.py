import paramiko, os, tarfile, time

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Jyoti@45j', timeout=10)

sftp = c.open_sftp()
FRONTEND = '/home/u892283443/frontend'
F = FRONTEND + '/standalone'
LOCAL = os.getcwd()

# Step 1: Clean standalone on server
_, stdout, _ = c.exec_command('rm -rf ' + F + ' && mkdir -p ' + F + ' && echo "cleaned"', timeout=15)
print('1. Cleaned:', stdout.read().decode().strip())

# Step 2: Create tar of complete standalone (with node_modules)
tar_path = os.path.join(LOCAL, 'full_deploy.tar.gz')
with tarfile.open(tar_path, 'w:gz') as tar:
    # Add everything from .next/standalone
    standalone_dir = os.path.join(LOCAL, '.next', 'standalone')
    for root, dirs, files in os.walk(standalone_dir):
        rel = os.path.relpath(root, standalone_dir)
        for f in files:
            fp = os.path.join(root, f)
            tar.add(fp, arcname=os.path.join(rel, f) if rel != '.' else f)
    # Add .next/static
    static_dir = os.path.join(LOCAL, '.next', 'static')
    for root, dirs, files in os.walk(static_dir):
        rel = os.path.relpath(root, static_dir)
        for f in files:
            fp = os.path.join(root, f)
            tar.add(fp, arcname=os.path.join('.next', 'static', rel, f) if rel != '.' else os.path.join('.next', 'static', f))

print(f'2. Tar: {os.path.getsize(tar_path)} bytes ({len(tar.getmembers())} files)')

# Step 3: Upload
sftp.put(tar_path, F + '/deploy.tar.gz')
sftp.close()
print('3. Uploaded')

# Step 4: Extract
_, stdout, _ = c.exec_command('cd ' + F + ' && tar xzf deploy.tar.gz && rm deploy.tar.gz && echo "extracted"', timeout=30)
print('4.', stdout.read().decode().strip())

# Step 5: Verify files
_, stdout, _ = c.exec_command('ls ' + F + '/server.js && ls ' + F + '/.next/static/css/*.css && ls ' + F + '/.next/static/chunks/webpack-*.js && echo "all present"', timeout=5)
print('5. Files:', stdout.read().decode().strip()[:200])

# Step 6: Restart PM2
NODE_BIN = '/opt/alt/alt-nodejs20/root/usr/bin'
_, stdout, _ = c.exec_command('export PATH=' + NODE_BIN + ':$PATH && cd ' + FRONTEND + ' && ./node_modules/.bin/pm2 restart aerth 2>&1 | cat', timeout=15)
time.sleep(3)

# Test
_, stdout, _ = c.exec_command('curl -s -o /dev/null -w "Root: %{http_code} | " --max-time 5 http://127.0.0.1:3000/ && curl -s -o /dev/null -w "CSS: %{http_code} | " --max-time 5 http://127.0.0.1:3000/_next/static/css/$(ls ' + F + '/.next/static/css/ | head -1) && curl -s -o /dev/null -w "JS: %{http_code}\n" --max-time 5 http://127.0.0.1:3000/_next/static/chunks/webpack-*.js', timeout=15)
print('6.', stdout.read().decode().strip())

c.close()
os.remove(tar_path)
print('7. Done')
