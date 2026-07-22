import http.client
import urllib.request
import urllib.error

urls = [
    "http://localhost:3000/",
    "http://localhost:3000/favicon.ico",
    "http://localhost:3000/icon.png",
    "http://localhost:3000/apple-icon.png",
    "http://localhost:3000/images/fbc2edd4-5429-482c-957e-3536a862daad.png"
]

for url in urls:
    print(f"Requesting {url} ...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            print(f"  Status: {response.status}")
            print(f"  Headers: {dict(response.info())}")
            content = response.read(100)
            print(f"  Content snippet: {content[:50]}")
    except urllib.error.URLError as e:
        print(f"  Error: {e}")
    except Exception as e:
        print(f"  General error: {e}")
