import paramiko
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)

def run(cmd):
    stdin, stdout, stderr = c.exec_command(cmd)
    return stdout.read().decode('utf-8', errors='replace').strip()

print("--- User Processes ---")
print(run("ps -u u892283443 -f").encode('ascii', errors='replace').decode('ascii'))
print("--- PM2 status ---")
print(run("export PATH=/opt/alt/alt-nodejs20/root/usr/bin:$PATH && cd /home/u892283443/frontend && ./node_modules/.bin/pm2 status").encode('ascii', errors='replace').decode('ascii'))
c.close()

