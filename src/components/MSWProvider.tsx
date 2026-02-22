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
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
