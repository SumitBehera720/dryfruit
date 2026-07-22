import sys, paramiko

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)

cmd = sys.argv[1] if len(sys.argv) > 1 else 'ls -la /home/u892283443/frontend'
stdin, stdout, stderr = c.exec_command(cmd, timeout=30)

out = stdout.read().decode('utf-8', errors='replace')
err = stderr.read().decode('utf-8', errors='replace')

# Print safely in windows console by encoding to sys.stdout.encoding
sys.stdout.write(out.encode(sys.stdout.encoding or 'utf-8', errors='replace').decode(sys.stdout.encoding or 'utf-8'))
sys.stderr.write(err.encode(sys.stderr.encoding or 'utf-8', errors='replace').decode(sys.stderr.encoding or 'utf-8'))

c.close()
