import paramiko, os

SSH_HOST = os.getenv('SSH_HOST', '145.79.58.122')
SSH_PORT = int(os.getenv('SSH_PORT', '65002'))
SSH_USER = os.getenv('SSH_USER', 'u892283443')
SSH_PASS = os.getenv('SSH_PASS', 'Qubnix123@')
REMOTE_PATH = os.getenv('REMOTE_PATH', f'/home/{SSH_USER}/frontend')

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect(SSH_HOST, port=SSH_PORT, username=SSH_USER, password=SSH_PASS, timeout=15)

def safe_print(label, text):
    clean = text.encode('ascii', errors='replace').decode('ascii')
    print(label, clean)

stdin, stdout, stderr = c.exec_command(f'export PATH=/opt/alt/alt-nodejs20/root/usr/bin:$PATH && cd {REMOTE_PATH} && ./node_modules/.bin/pm2 status 2>&1', timeout=30)
safe_print('PM2 STATUS:', stdout.read().decode('utf-8', errors='replace'))

stdin, stdout, stderr = c.exec_command(f'tail -n 50 {REMOTE_PATH}/pm2.err', timeout=30)
safe_print('PM2 ERR LOG:', stdout.read().decode('utf-8', errors='replace'))

stdin, stdout, stderr = c.exec_command(f'tail -n 50 {REMOTE_PATH}/pm2.log', timeout=30)
safe_print('PM2 OUT LOG:', stdout.read().decode('utf-8', errors='replace'))

stdin, stdout, stderr = c.exec_command('curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://127.0.0.1:3000/ 2>&1', timeout=30)
safe_print('Root status:', stdout.read().decode('utf-8', errors='replace'))

c.close()
