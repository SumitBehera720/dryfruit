import paramiko
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)

def run(cmd):
    stdin, stdout, stderr = c.exec_command(cmd)
    return stdout.read().decode('utf-8', errors='replace').strip()

print("--- htaccess files ---")
print(run("find /home/u892283443 -name .htaccess -maxdepth 4 2>/dev/null"))
print("--- public_html contents ---")
print(run("ls -la /home/u892283443/public_html 2>/dev/null || ls -la /home/u892283443 2>/dev/null"))
c.close()
