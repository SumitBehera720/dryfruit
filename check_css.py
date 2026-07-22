import paramiko, re
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Jyoti@45j', timeout=15)
s = c.open_sftp()
f = s.open('/home/u892283443/frontend/standalone/.next/server/app/index.html')
html = f.read().decode('utf-8')
f.close()
css = re.search(r'_next/static/css/([^"\')]+)', html)
print('HTML CSS ref:', css.group(1) if css else 'none')
js_chunks = re.findall(r'_next/static/chunks/([^"\')]+)', html)
js_chunks = [c for c in js_chunks if c.endswith('.js')]
print('First 8 JS chunks:')
for chunk in js_chunks[:8]:
    print(' ', chunk)
s.close()
c.close()
