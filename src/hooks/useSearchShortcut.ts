import { useEffect, RefObject } from 'react';

/**
 * Hook to handle the Cmd/Ctrl + K shortcut for focusing a search input.
 * @param inputRef Reference to the input element to focus.
 * @param onTrigger Callback to execute when the shortcut is triggered (e.g., to expand a collapsed sidebar).
 */
export function useSearchShortcut(
  inputRef: RefObject<HTMLInputElement | null>,
  onTrigger: () => void
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onTrigger();
        // Small delay to allow for any UI transitions (like sidebar expanding)
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputRef, onTrigger]);
}
