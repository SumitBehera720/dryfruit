import paramiko, os, sys

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('145.79.58.122', port=65002, username='u892283443', password='Qubnix123@', timeout=15)

local_path = "d:/aerth/public/uploads/Animate_the_provided_AERTH_log_gwr_video_mvp.mp4"
remote_path = "/home/u892283443/frontend/public/uploads/Animate_the_provided_AERTH_log_gwr_video_mvp.mp4"

print("Uploading video file...")
file_size = os.path.getsize(local_path)
print(f"Local file size: {file_size} bytes")

# Open SSH stdin redirect to cat
stdin, stdout, stderr = c.exec_command('cat > ' + remote_path)
with open(local_path, 'rb') as f:
    uploaded = 0
    while True:
        chunk = f.read(65536)
        if not chunk:
            break
        stdin.write(chunk)
        stdin.flush()
        uploaded += len(chunk)
        # Print progress
        print(f"Progress: {uploaded}/{file_size} bytes", end='\r')
stdin.close()

exit_status = stdout.channel.recv_exit_status()
if exit_status != 0:
    print(f"\nUpload failed! Error: {stderr.read().decode()}")
    sys.exit(1)

# Verify remote file size
stdin, stdout, stderr = c.exec_command(f"wc -c < {remote_path}")
remote_size = int(stdout.read().decode().strip())
print(f"\nRemote file size verified: {remote_size} bytes")

if remote_size == file_size:
    print("SUCCESS: Video uploaded and verified successfully!")
else:
    print("ERROR: Upload size mismatch!")

c.close()
