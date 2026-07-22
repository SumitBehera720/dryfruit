import os
from PIL import Image

src_png = r"d:\aerth\public\images\fbc2edd4-5429-482c-957e-3536a862daad.png"
dst_ico_app = r"d:\aerth\src\app\favicon.ico"
dst_ico_pub = r"d:\aerth\public\favicon.ico"

print(f"Opening {src_png}...")
with Image.open(src_png) as img:
    # Save as ICO with multiple sizes (16, 32, 48, 64)
    img.save(dst_ico_app, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print(f"Saved {dst_ico_app}")
    img.save(dst_ico_pub, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print(f"Saved {dst_ico_pub}")

print("Favicon conversion complete.")
