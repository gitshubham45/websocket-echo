const WebSocket = require('ws');

const websocket = (ctx, next) => {
  const server = ctx.server;

  if (!server.ws) {
    const wss = new WebSocket.Server({ noServer: true });

    wss.on('connection', (ws) => {
      ws.on('message', async (message) => {
        // Broadcast the message to all connected clients
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      });
    });

    server.on('upgrade', (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    });

    server.ws = wss;
  }

  return next();
};

module.exports = websocket;