import paramiko
import time

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)

def run(cmd):
    stdin, stdout, stderr = c.exec_command(cmd)
    return stdout.read().decode('utf-8', errors='replace').strip()

print("Setting up test cron...")
cron_content = '* * * * * echo "cron running at $(date)" >> /home/u892283443/cron_test.log\n'
stdin, stdout, stderr = c.exec_command('cat > /home/u892283443/test_cron')
stdin.write(cron_content)
stdin.close()
stdout.channel.recv_exit_status()

print("Loading test crontab...")
print(run("crontab /home/u892283443/test_cron"))
print("Current Crontab:")
print(run("crontab -l"))

print("Waiting 65 seconds to check if log is written...")
time.sleep(65)

print("Checking test log:")
print(run("cat /home/u892283443/cron_test.log 2>/dev/null || echo 'No log found'"))

# Cleanup
run("rm -f /home/u892283443/test_cron /home/u892283443/cron_test.log")
run("crontab -r")
print("Cleaned up and removed test cron.")
c.close()
