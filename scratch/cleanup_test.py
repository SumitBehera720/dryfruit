import paramiko
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)
c.exec_command("rm -f /home/u892283443/frontend/cron_check.log")
c.close()
print("Cleaned up log file")
