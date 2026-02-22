"use client";

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CompanyView from '../components/CompanyView';
import FullScreenChart from '../components/FullScreenChart';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const isFullScreen = searchParams.get('view') === 'chart';

  if (isFullScreen) {
    return <FullScreenChart />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 min-h-[calc(100vh-64px)] overflow-y-auto">
          <CompanyView />
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
