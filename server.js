// server.js
// Final version - Simple HTTP Proxy Server

const http = require('http');
const httpProxy = require('http-proxy');

// ایجاد پروکسی
const proxy = httpProxy.createProxyServer({});

// ساخت سرور
const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: 'http://example.com' }, (err) => {
    console.error('Proxy error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Proxy error');
  });
});

// پورت از محیط Render یا لوکال
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
