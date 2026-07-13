import paramiko

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Jyoti@45j', timeout=10)

FRONTEND = '/home/u892283443/frontend'

cmds = [
    # Copy static files to standalone
    'cp -r ' + FRONTEND + '/.next/static ' + FRONTEND + '/standalone/.next/ && echo "static copied"',
    # Copy public directory to standalone  
    'cp -r ' + FRONTEND + '/public ' + FRONTEND + '/standalone/ && echo "public copied"',
    # Copy images directory if it exists in public
    'cp -r ' + FRONTEND + '/public/images ' + FRONTEND + '/standalone/images && echo "images copied"',
    # Copy icons
    'cp ' + FRONTEND + '/public/*.ico ' + FRONTEND + '/standalone/ 2>/dev/null; echo "icons done"',
    # Also copy images from public to standalone root for direct access
    'cp -r ' + FRONTEND + '/public/images ' + FRONTEND + '/standalone/images 2>/dev/null; echo "images2 done"',
]

for cmd in cmds:
    _, stdout, stderr = c.exec_command(cmd, timeout=30)
    out = stdout.read().decode().strip()
    err = stderr.read().decode().strip()
    if out: print(out[:200])
    if err: print('ERR:', err[:200])

# Verify
_, stdout, _ = c.exec_command('ls ' + FRONTEND + '/standalone/.next/static/chunks/ 2>/dev/null | head -5', timeout=5)
print('Chunks:', stdout.read().decode().strip()[:100])

_, stdout, _ = c.exec_command('ls ' + FRONTEND + '/standalone/public/images/ 2>/dev/null | head -5 || ls ' + FRONTEND + '/standalone/images/ 2>/dev/null | head -5', timeout=5)
print('Images:', stdout.read().decode().strip()[:100])

_, stdout, _ = c.exec_command('ls ' + FRONTEND + '/standalone/favicon.ico 2>/dev/null || echo no_favicon', timeout=5)
print('Favicon:', stdout.read().decode().strip())

# Restart PM2
NODE_BIN = '/opt/alt/alt-nodejs20/root/usr/bin'
_, stdout, _ = c.exec_command('export PATH=' + NODE_BIN + ':$PATH && cd ' + FRONTEND + ' && ./node_modules/.bin/pm2 restart aerth 2>&1 | cat', timeout=15)
print('Restarted PM2')

import time
time.sleep(3)

# Test locally
_, stdout, _ = c.exec_command('curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://127.0.0.1:3000/_next/static/css/6f04973f57702304.css', timeout=10)
print('CSS:', stdout.read().decode().strip())

_, stdout, _ = c.exec_command('curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://127.0.0.1:3000/', timeout=10)
print('Root:', stdout.read().decode().strip())

c.close()
