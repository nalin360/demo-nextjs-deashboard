import { useState, useMemo, useRef } from 'react';
import { useSearchShortcut } from './useSearchShortcut';

/**
 * Hook to manage ticker search state, filtering, and keyboard shortcuts.
 * @param tickers The list of tickers to filter.
 * @param onShortcutTrigger Callback when the Cmd+K shortcut is triggered.
 */
export function useTickerSearch(tickers: string[], onShortcutTrigger: () => void) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle the Cmd+K shortcut
  useSearchShortcut(searchInputRef, onShortcutTrigger);

  // Filter tickers based on search query
  const filteredTickers = useMemo(() => {
    return tickers.filter(t => 
      t.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tickers, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchInputRef,
    filteredTickers
  };
}
