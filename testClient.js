// testClient.js
import WebSocket from 'ws';

const ws = new WebSocket('wss://stack3d-lab-ws.onrender.com');

ws.on('open', () => {
  console.log('✅ Connected to WebSocket Server');

  // Send test message every 2 seconds
  setInterval(() => {
    const message = JSON.stringify({
      temperature: (20 + Math.random() * 10).toFixed(2),
      humidity: (40 + Math.random() * 20).toFixed(2),
      time: new Date().toLocaleTimeString(),
    });
    console.log('📤 Sending:', message);
    ws.send(message);
  }, 2000);
});

ws.on('message', (data) => {
  console.log('📩 Received from server:', data.toString());
});

ws.on('close', () => console.log('❌ Disconnected'));
ws.on('error', (err) => console.error('⚠️ Error:', err.message));
