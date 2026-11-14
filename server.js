import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm',
  '.lottie': 'application/octet-stream',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(urlObj.pathname);

  // Strip GitHub Pages prefix if present so local testing supports both
  if (pathname.startsWith('/bbsv-portal/')) {
    pathname = pathname.slice('/bbsv-portal'.length);
  } else if (pathname === '/bbsv-portal') {
    pathname = '/';
  }

  // Normalize safe path
  let safePath = path.normalize(path.join(PUBLIC_DIR, pathname));
  if (!safePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  try {
    let stat = fs.existsSync(safePath) ? fs.statSync(safePath) : null;

    if (stat && stat.isDirectory()) {
      safePath = path.join(safePath, 'index.html');
      stat = fs.existsSync(safePath) ? fs.statSync(safePath) : null;
    }

    if (!stat) {
      if (fs.existsSync(safePath + '.html')) {
        safePath = safePath + '.html';
        stat = fs.statSync(safePath);
      } else if (fs.existsSync(path.join(safePath, 'index.html'))) {
        safePath = path.join(safePath, 'index.html');
        stat = fs.statSync(safePath);
      }
    }

    if (!stat || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 Not Found</h1><p>The requested page was not found on this server.</p><p><a href="/">Return Home</a></p>');
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000'
    });

    const readStream = fs.createReadStream(safePath);
    readStream.pipe(res);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error: ' + err.message);
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` BBSV Ltd Portal Replica Server is running!`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` Serving files from: ${PUBLIC_DIR}`);
  console.log(`======================================================\n`);
});
