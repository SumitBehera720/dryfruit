import paramiko
import time

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)

def run(cmd):
    stdin, stdout, stderr = c.exec_command(cmd)
    return stdout.read().decode('utf-8', errors='replace').strip()

print("Stopping PM2 and aerth process...")
run("export PATH=/opt/alt/alt-nodejs20/root/usr/bin:$PATH && cd /home/u892283443/frontend && ./node_modules/.bin/pm2 delete aerth 2>/dev/null || true")
run("export PATH=/opt/alt/alt-nodejs20/root/usr/bin:$PATH && cd /home/u892283443/frontend && ./node_modules/.bin/pm2 kill 2>/dev/null || true")
run("pkill -9 -f next-server 2>/dev/null || true")

# Verify down
status = run("curl -s -o /dev/null -w '%{http_code}' --max-time 3 http://127.0.0.1:3000/")
print("Status after stop (should be 000):", status)

print("Running cron-check.sh to resurrect...")
print(run("/bin/bash /home/u892283443/frontend/cron-check.sh"))

# Wait 5 seconds
time.sleep(5)

# Verify up
status2 = run("curl -s -o /dev/null -w '%{http_code}' --max-time 3 http://127.0.0.1:3000/")
print("Status after resurrection (should be 200):", status2)

print("Resurrection logs:")
print(run("cat /home/u892283443/frontend/cron_check.log"))

# Clean up log
run("rm -f /home/u892283443/frontend/cron_check.log")
c.close()
