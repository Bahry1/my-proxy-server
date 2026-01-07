const express = require('express');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');

const app = express();

// مسیر ساده برای تست
app.get('/', (req, res) => {
  res.send('VLESS WebSocket server is running');
});

// ساخت سرور HTTP
const server = createServer(app);

// WebSocket روی مسیر /
const wss = new WebSocketServer({ server, path: '/' });

wss.on('connection', (ws, req) => {
  console.log('New WS connection from', req.socket.remoteAddress);
  ws.on('message', (msg) => {
    console.log('Received:', msg.toString());
  });
  ws.send('Welcome to VLESS WS server');
});

const PORT = process.env.PORT || 443;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
