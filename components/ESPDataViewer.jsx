'use client';
import { useEffect, useState } from 'react';

export default function ESPDataViewer() {
  const [data, setData] = useState('Waiting for data...');

  useEffect(() => {
    const ws = new WebSocket('wss://your-domain.com/api/socket');

    ws.onopen = () => console.log('Connected to ESP32 socket ✅');
    ws.onmessage = (msg) => setData(msg.data);
    ws.onclose = () => console.log('Socket closed ❌');

    return () => ws.close();
  }, []);

  return (
    <div className="p-4 text-center text-white bg-gray-800 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">ESP32 Live Data</h2>
      <pre>{data}</pre>
    </div>
  );
}
