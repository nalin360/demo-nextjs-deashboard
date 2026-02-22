import { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ChevronRight, 
  LayoutDashboard, 
  PieChart, 
  History, 
  Settings, 
  LogOut, 
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  Command
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  onSelectTicker: (ticker: string) => void;
  selectedTicker: string;
}

export default function Sidebar({ onSelectTicker, selectedTicker }: SidebarProps) {
  const [tickers, setTickers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/companies')
      .then(res => res.json())
      .then(data => {
        setTickers(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCollapsed(false);
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredTickers = tickers.filter(t => 
    t.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="border-r border-zinc-200 bg-zinc-50 h-[calc(100vh-64px)] flex flex-col sticky top-16 z-20 overflow-hidden"
    >
      <div className="p-4 flex items-center justify-between border-b border-zinc-200/50 h-14 shrink-0">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.h2 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-xs font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap"
            >
              Watchlist
            </motion.h2>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-zinc-200 rounded-lg transition-colors text-zinc-500 hover:text-zinc-900 ml-auto"
        >
          {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="relative mb-4">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div 
                key="search-expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative group"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-12 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:ring-2 focus:ring-zinc-200 outline-none transition-all"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 bg-zinc-100 border border-zinc-200 rounded text-[10px] font-medium text-zinc-400">
                  <Command className="w-2.5 h-2.5" />
                  <span>K</span>
                </div>
              </motion.div>
            ) : (
              <motion.button 
                key="search-collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setIsCollapsed(false);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
                className="w-full flex justify-center p-2 hover:bg-zinc-200 rounded-lg text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <Search className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-1">
          {loading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className={cn(
                "h-12 bg-zinc-200 animate-pulse rounded-lg w-full",
                isCollapsed && "h-10 w-10 mx-auto"
              )}></div>
            ))
          ) : (
            filteredTickers.map(ticker => (
              <button
                key={ticker}
                onClick={() => onSelectTicker(ticker)}
                title={isCollapsed ? ticker : undefined}
                className={cn(
                  "w-full flex items-center p-3 rounded-lg transition-all group relative",
                  isCollapsed ? "justify-center" : "justify-between",
                  selectedTicker === ticker 
                    ? "bg-white shadow-sm border border-zinc-200 text-zinc-900" 
                    : "text-zinc-500 hover:bg-zinc-200/50 hover:text-zinc-900"
                )}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={cn(
                    "w-8 h-8 rounded flex items-center justify-center font-bold text-xs shrink-0 transition-colors",
                    selectedTicker === ticker ? "bg-zinc-900 text-white" : "bg-zinc-200 text-zinc-600 group-hover:bg-zinc-300"
                  )}>
                    {ticker[0]}
                  </div>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="font-semibold truncate whitespace-nowrap"
                      >
                        {ticker}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                {!isCollapsed && (
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-transform shrink-0",
                    selectedTicker === ticker ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  )} />
                )}
              </button>
            ))
          )}
          {!loading && filteredTickers.length === 0 && !isCollapsed && (
            <p className="text-xs text-center text-zinc-400 py-4">No results found</p>
          )}
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-zinc-200 space-y-1 shrink-0">
        <button className={cn(
          "w-full flex items-center gap-3 p-3 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50 rounded-lg transition-colors",
          isCollapsed ? "justify-center" : "justify-start"
        )}>
          <Settings className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Settings</span>}
        </button>
        <button className={cn(
          "w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors",
          isCollapsed ? "justify-center" : "justify-start"
        )}>
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
