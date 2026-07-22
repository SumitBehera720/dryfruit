import paramiko

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)

def run(cmd):
    stdin, stdout, stderr = c.exec_command(cmd)
    return stdout.read().decode('utf-8', errors='replace').strip()

# Script content
cron_script = """#!/bin/bash
export PATH="/opt/alt/alt-nodejs20/root/usr/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
export PM2_HOME="/home/u892283443/.pm2"

# 1. Try to curl the local Next.js server
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://127.0.0.1:3000/)

if [ "$STATUS_CODE" = "000" ] || [ "$STATUS_CODE" = "502" ]; then
    echo "$(date): Aerth is down (Status: $STATUS_CODE). Attempting resurrection..." >> /home/u892283443/frontend/cron_check.log
    
    # Try pm2 resurrect first
    /opt/alt/alt-nodejs20/root/usr/bin/node /home/u892283443/frontend/node_modules/.bin/pm2 resurrect >> /home/u892283443/frontend/cron_check.log 2>&1
    
    # Wait a few seconds
    sleep 5
    
    # Check again
    STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://127.0.0.1:3000/)
    if [ "$STATUS_CODE" = "000" ] || [ "$STATUS_CODE" = "502" ]; then
        echo "$(date): Resurrection failed. Cleaning up and restarting..." >> /home/u892283443/frontend/cron_check.log
        
        # Kill PM2 and clear any app trace
        /opt/alt/alt-nodejs20/root/usr/bin/node /home/u892283443/frontend/node_modules/.bin/pm2 delete aerth >> /home/u892283443/frontend/cron_check.log 2>&1 || true
        /opt/alt/alt-nodejs20/root/usr/bin/node /home/u892283443/frontend/node_modules/.bin/pm2 kill >> /home/u892283443/frontend/cron_check.log 2>&1 || true
        
        # Kill any orphaned node next-server processes
        /usr/bin/pkill -f "next-server" >> /home/u892283443/frontend/cron_check.log 2>&1 || true
        /usr/bin/pkill -f "node server.js" >> /home/u892283443/frontend/cron_check.log 2>&1 || true
        
        # Start fresh
        /opt/alt/alt-nodejs20/root/usr/bin/node /home/u892283443/frontend/node_modules/.bin/pm2 start /home/u892283443/frontend/ecosystem.config.js >> /home/u892283443/frontend/cron_check.log 2>&1
        /opt/alt/alt-nodejs20/root/usr/bin/node /home/u892283443/frontend/node_modules/.bin/pm2 save --force >> /home/u892283443/frontend/cron_check.log 2>&1
    else
        echo "$(date): Resurrection succeeded. Aerth is up (Status: $STATUS_CODE)." >> /home/u892283443/frontend/cron_check.log
    fi
else
    # Up and running
    true
fi
"""

print("Writing cron-check.sh...")
stdin, stdout, stderr = c.exec_command('cat > /home/u892283443/frontend/cron-check.sh')
stdin.write(cron_script)
stdin.close()
stdout.channel.recv_exit_status()

print("Making cron-check.sh executable...")
print(run("chmod +x /home/u892283443/frontend/cron-check.sh"))

print("Killing old watch-aerth.sh loop...")
print(run("pkill -f watch-aerth.sh || true"))

print("Verifying files...")
print(run("ls -la /home/u892283443/frontend/cron-check.sh"))

c.close()
print("Done")
