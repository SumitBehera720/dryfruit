import paramiko

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)

def run(cmd):
    stdin, stdout, stderr = c.exec_command(cmd)
    return stdout.read().decode('utf-8', errors='replace').strip()

print("Reading original files...")
bashrc = run("cat /home/u892283443/.bashrc")
bash_profile = run("cat /home/u892283443/.bash_profile")

# Clean bashrc
clean_bashrc_lines = []
for line in bashrc.splitlines():
    if "ensure-aerth-running.sh" in line or "watch-aerth.sh" in line:
        continue
    if "# Auto-start aerth Next.js server" in line or "# Start aerth watchdog if not running" in line:
        continue
    clean_bashrc_lines.append(line)
new_bashrc = "\n".join(clean_bashrc_lines)

# Clean bash_profile
clean_bash_profile_lines = []
for line in bash_profile.splitlines():
    if "ensure-aerth-running.sh" in line:
        continue
    if "# Auto-start aerth Next.js server" in line:
        continue
    clean_bash_profile_lines.append(line)
new_bash_profile = "\n".join(clean_bash_profile_lines)

print("Writing clean .bashrc...")
stdin, stdout, stderr = c.exec_command("cat > /home/u892283443/.bashrc")
stdin.write(new_bashrc)
stdin.close()
stdout.channel.recv_exit_status()

print("Writing clean .bash_profile...")
stdin, stdout, stderr = c.exec_command("cat > /home/u892283443/.bash_profile")
stdin.write(new_bash_profile)
stdin.close()
stdout.channel.recv_exit_status()

print("Verifying clean .bashrc...")
print(run("cat /home/u892283443/.bashrc"))
print("Verifying clean .bash_profile...")
print(run("cat /home/u892283443/.bash_profile"))

c.close()
print("Done")
