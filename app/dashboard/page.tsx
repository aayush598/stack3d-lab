'use client';
import dynamic from 'next/dynamic';

// Dynamically import the VR component to disable SSR
const VRScene = dynamic(() => import('@/components/VRScene'), { ssr: false });
const ESPDataViewer = dynamic(() => import('@/components/ESPDataViewer'), { ssr: false });

export default function Dashboard() {

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Welcome, 
      </h1>
      <p className="mt-4 text-gray-500">You are logged in 🎉</p>
      <ESPDataViewer />
      <VRScene />
    </div>
  );
}
