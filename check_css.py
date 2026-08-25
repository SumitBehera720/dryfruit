import paramiko, re, os

SSH_HOST = os.getenv('SSH_HOST', 'your-server-ip')
SSH_PORT = int(os.getenv('SSH_PORT', '22'))
SSH_USER = os.getenv('SSH_USER', 'your-username')
SSH_PASS = os.getenv('SSH_PASS', 'your-password')
REMOTE_PATH = os.getenv('REMOTE_PATH', f'/home/{SSH_USER}/frontend')

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect(SSH_HOST, port=SSH_PORT, username=SSH_USER, password=SSH_PASS, timeout=15)
s = c.open_sftp()
f = s.open(f'{REMOTE_PATH}/standalone/.next/server/app/index.html')
html = f.read().decode('utf-8')
f.close()
css = re.search(r'_next/static/css/([^"\')]+)', html)
print('HTML CSS ref:', css.group(1) if css else 'none')
js_chunks = re.findall(r'_next/static/chunks/([^"\')]+)', html)
js_chunks = [chunk for chunk in js_chunks if chunk.endswith('.js')]
print('First 8 JS chunks:')
for chunk in js_chunks[:8]:
    print(' ', chunk)
s.close()
c.close()
