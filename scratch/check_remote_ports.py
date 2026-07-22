import paramiko
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)

def run(cmd):
    stdin, stdout, stderr = c.exec_command(cmd)
    return stdout.read().decode('utf-8', errors='replace').strip()

print("--- PS Node ---")
print(run("ps aux | grep node | grep -v grep"))
print("--- LSOF 3000 ---")
print(run("lsof -i :3000 || netstat -an | grep 3000"))
c.close()
