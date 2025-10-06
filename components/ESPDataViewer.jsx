'use client';
import { useEffect, useState } from 'react';

export default function ESPDataViewer() {
  const [data, setData] = useState('Waiting for ESP32 data...');

  useEffect(() => {
    const ws = new WebSocket('wss://stack3d-lab-ws.vercel.app'); // same URL

    ws.onopen = () => console.log('✅ Connected to WebSocket');
    ws.onmessage = (msg) => setData(msg.data);
    ws.onclose = () => console.log('❌ Socket closed');

    return () => ws.close();
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg text-center">
      <h2 className="text-xl mb-2">ESP32 Live Data</h2>
      <pre>{data}</pre>
    </div>
  );
}
