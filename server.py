
import SocketServer
from SimpleHTTPServer import SimpleHTTPRequestHandler

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        SimpleHTTPRequestHandler.__init__(self, *args, **kwargs)
        self.extensions_map['.webapp'] = 'application/x-web-app-manifest+json'

httpd = SocketServer.TCPServer(('localhost', 8000), Handler)
httpd.serve_forever()
