'use client';

import { useEffect, useState } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (process.env.NODE_ENV === 'development') {
        const { initMocks } = await import('../mocks');
        await initMocks();
        setMswReady(true);
      } else {
        setMswReady(true);
      }
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady]);

  if (!mswReady && process.env.NODE_ENV === 'development') {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-zinc-400 animate-pulse">Starting Mock Services...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
