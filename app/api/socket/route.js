import { WebSocketServer } from 'ws';

let wss; // keep single instance

export async function GET(req) {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws) => {
      console.log('Client connected ✅');

      ws.on('message', (msg) => {
        console.log('Received:', msg.toString());
        // echo to all connected clients (optional)
        wss.clients.forEach((client) => {
          if (client.readyState === ws.OPEN) {
            client.send(msg.toString());
          }
        });
      });

      ws.on('close', () => console.log('Client disconnected ❌'));
    });
  }

  const { socket } = (await import('next/server')).NextResponse;
  const upgradeHeader = req.headers.get('upgrade');

  if (upgradeHeader !== 'websocket') {
    return new Response('Expected WebSocket', { status: 400 });
  }

  return socket({
    onConnect: (ws) => wss.emit('connection', ws),
  });
}
