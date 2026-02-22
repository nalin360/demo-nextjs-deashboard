"use client";

import Navbar from '@/src/components/Navbar';
import Sidebar from '@/src/components/Sidebar';
import CompanyView from '@/src/components/CompanyView';
import FullScreenChart from '@/src/components/FullScreenChart';
import { useSearchParams } from 'next/navigation';

export default function DashboardContent() {
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
