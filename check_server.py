import paramiko
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)
def safe_print(label, text):
    clean = text.encode('ascii', errors='replace').decode('ascii')
    print(label, clean)

stdin, stdout, stderr = c.exec_command('export PATH=/opt/alt/alt-nodejs20/root/usr/bin:$PATH && cd /home/u892283443/frontend && ./node_modules/.bin/pm2 status 2>&1', timeout=30)
safe_print('PM2 STATUS:', stdout.read().decode('utf-8', errors='replace'))

stdin, stdout, stderr = c.exec_command('tail -n 50 /home/u892283443/frontend/pm2.err', timeout=30)
safe_print('PM2 ERR LOG:', stdout.read().decode('utf-8', errors='replace'))

stdin, stdout, stderr = c.exec_command('tail -n 50 /home/u892283443/frontend/pm2.log', timeout=30)
safe_print('PM2 OUT LOG:', stdout.read().decode('utf-8', errors='replace'))

stdin, stdout, stderr = c.exec_command('curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://127.0.0.1:3000/ 2>&1', timeout=30)
safe_print('Root status:', stdout.read().decode('utf-8', errors='replace'))

stdin, stdout, stderr = c.exec_command('curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://127.0.0.1:3000/images/fbc2edd4-5429-482c-957e-3536a862daad-removebg-preview.png 2>&1', timeout=30)
safe_print('Image status:', stdout.read().decode('utf-8', errors='replace'))

c.close()

