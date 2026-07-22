import socket
try:
    ip = socket.gethostbyname('palevioletred-turtle-524259.hostingersite.com')
    print('IP for palevioletred-turtle-524259.hostingersite.com is:', ip)
except Exception as e:
    print('Failed to resolve host:', e)
