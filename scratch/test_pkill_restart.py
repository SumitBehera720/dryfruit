import paramiko
import time

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)

def run(cmd):
    stdin, stdout, stderr = c.exec_command(cmd)
    return stdout.read().decode('utf-8', errors='replace').strip()

print("Initial processes:")
print(run("ps -u u892283443 -f").encode('ascii', errors='replace').decode('ascii'))

print("Killing watch-aerth.sh...")
print(run("pkill -9 -f watch-aerth.sh || true"))

print("Sleeping 5 seconds...")
time.sleep(5)

print("Processes after 5s:")
print(run("ps -u u892283443 -f").encode('ascii', errors='replace').decode('ascii'))

c.close()
