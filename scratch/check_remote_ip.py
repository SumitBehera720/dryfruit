import paramiko
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)

def run(cmd):
    stdin, stdout, stderr = c.exec_command(cmd)
    return stdout.read().decode('utf-8', errors='replace').strip()

print("SSH Server public IP:", run("curl -s https://ipinfo.io/ip"))
print("SSH Server hostname:", run("hostname"))
print("SSH Server ip addr:", run("ip addr || ifconfig"))
print("Is port 3000 listening on all interfaces?", run("netstat -tuln | grep 3000 || ss -tuln | grep 3000"))
c.close()
