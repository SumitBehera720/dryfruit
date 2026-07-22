import paramiko
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)

def run(cmd):
    stdin, stdout, stderr = c.exec_command(cmd)
    out = stdout.read().decode('utf-8', errors='replace').strip()
    err = stderr.read().decode('utf-8', errors='replace').strip()
    return f"STDOUT: {out}\nSTDERR: {err}"

# Write a simple file
stdin, stdout, stderr = c.exec_command('echo "* * * * * date" > /home/u892283443/test_cron_debug')
stdout.channel.recv_exit_status()

print("--- Running crontab test_cron_debug ---")
print(run("crontab /home/u892283443/test_cron_debug"))

print("--- Running crontab -l ---")
print(run("crontab -l"))

# Cleanup
run("rm -f /home/u892283443/test_cron_debug")
c.close()
