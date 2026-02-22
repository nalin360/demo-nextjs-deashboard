import { Suspense } from 'react';
import DashboardContent from '@/src/components/DashboardContent';

export default function Home() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-50 font-sans text-zinc-400">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
          <p className="text-sm font-medium animate-pulse">Initializing Dashboard...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
