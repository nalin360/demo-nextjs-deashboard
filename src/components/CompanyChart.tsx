"use client";

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Activity, Maximize2 } from 'lucide-react';
import { HistoryPoint } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { useMarketStore } from '@/src/store/useMarketStore';

interface CompanyChartProps {
  history: HistoryPoint[];
  isPositive: boolean;
  hideExpand?: boolean;
}

export default function CompanyChart({ history, isPositive, hideExpand }: CompanyChartProps) {
  const selectedTicker = useMarketStore(state => state.selectedTicker);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenNewTab = () => {
    const url = `${window.location.origin}${window.location.pathname}?view=chart&ticker=${selectedTicker}`;
    window.open(url, '_blank');
  };

  return (
    <div className={cn(
      "bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm overflow-hidden relative flex flex-col min-h-[400px]",
      hideExpand ? "flex-1" : "h-[480px]"
    )}>
      <div className="flex items-center justify-between mb-8 shrink-0">
        <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-zinc-400" />
          Performance History
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {['1D', '1W', '1M', '1Y', 'ALL'].map(t => (
              <button key={t} className={cn(
                "px-3 py-1 text-xs font-bold rounded-full transition-all",
                t === '1M' ? "bg-zinc-900 text-white" : "text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100"
              )}>
                {t}
              </button>
            ))}
          </div>
          {!hideExpand && (
            <button 
              onClick={handleOpenNewTab}
              className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all"
              title="Open in new tab"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? "#10b981" : "#f43f5e"} stopOpacity={0.1}/>
                  <stop offset="95%" stopColor={isPositive ? "#10b981" : "#f43f5e"} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#a1a1aa' }}
                dy={10}
              />
              <YAxis 
                hide 
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  padding: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={isPositive ? "#10b981" : "#f43f5e"} 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-300">
            <Activity className="w-8 h-8 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
