const http = require('http');
const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname);
const MIME = {
  'html': 'text/html; charset=utf-8',
  'css':  'text/css',
  'js':   'application/javascript',
  'png':  'image/png',
  'jpg':  'image/jpeg',
  'svg':  'image/svg+xml',
  'ico':  'image/x-icon',
};

http.createServer((req, res) => {
  let url = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(ROOT, url);
  try {
    const data = fs.readFileSync(filePath);
    const ext  = filePath.split('.').pop();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'text/plain',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(data);
  } catch(e) {
    res.writeHead(404);
    res.end('Not found: ' + url);
  }
}).listen(4567, '0.0.0.0', () => {
  console.log('TextFlow server ready at http://localhost:4567');
});
