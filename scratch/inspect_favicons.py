import os
from PIL import Image

files_to_check = [
    r"d:\aerth\public\images\fbc2edd4-5429-482c-957e-3536a862daad.png",
    r"d:\aerth\src\app\favicon.ico",
    r"d:\aerth\src\app\favicon_backup.ico",
    r"d:\aerth\src\app\icon.png",
    r"d:\aerth\src\app\apple-icon.png"
]

for f in files_to_check:
    if os.path.exists(f):
        sz = os.path.getsize(f)
        print(f"{f}: size={sz} bytes")
        try:
            with Image.open(f) as img:
                print(f"  Format={img.format}, Size={img.size}, Mode={img.mode}")
        except Exception as e:
            print(f"  Error opening: {e}")
    else:
        print(f"{f} does not exist")
