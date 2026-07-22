import paramiko
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)

def run(cmd):
    stdin, stdout, stderr = c.exec_command(cmd)
    return stdout.read().decode('utf-8', errors='replace').strip()

print("PHP CLI whoami exec:", run('php -r \'echo exec("whoami");\''))
print("PHP CLI disabled functions:", run('php -r \'echo ini_get("disable_functions");\''))
c.close()
