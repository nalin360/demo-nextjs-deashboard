import React, { useState, useEffect } from 'react';
import { CompanyInfo } from '@/src/types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, TrendingDown, Info, DollarSign, BarChart3, Activity, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface CompanyViewProps {
  ticker: string;
}

export default function CompanyView({ ticker }: CompanyViewProps) {
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/company/${ticker}`)
      .then(res => res.json())
      .then(data => {
        setCompany(data);
        setLoading(false);
      });
  }, [ticker]);

  if (loading || !company) {
    return (
      <div className="p-8 space-y-8 animate-pulse">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="h-8 w-48 bg-zinc-200 rounded"></div>
            <div className="h-4 w-32 bg-zinc-200 rounded"></div>
          </div>
          <div className="h-12 w-32 bg-zinc-200 rounded"></div>
        </div>
        <div className="h-64 bg-zinc-100 rounded-xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-zinc-100 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const isPositive = company.change >= 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 max-w-6xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">{company.name}</h1>
            <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-sm font-bold border border-zinc-200">
              {company.ticker}
            </span>
          </div>
          <p className="text-zinc-500 max-w-2xl leading-relaxed">
            {company.description}
          </p>
        </div>
        
        <div className="text-right bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm min-w-[200px]">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">Current Price</p>
          <div className="text-4xl font-black text-zinc-900 mb-2">
            ${company.price.toLocaleString()}
          </div>
          <div className={cn(
            "inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm font-bold",
            isPositive ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
          )}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {isPositive ? '+' : ''}{company.change}%
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm overflow-hidden relative">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-zinc-400" />
            Performance History
          </h3>
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
        </div>
        
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={company.history}>
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
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          label="Market Cap" 
          value={company.stats.marketCap} 
          icon={<Globe className="w-4 h-4" />} 
        />
        <StatCard 
          label="P/E Ratio" 
          value={company.stats.peRatio} 
          icon={<BarChart3 className="w-4 h-4" />} 
        />
        <StatCard 
          label="Div. Yield" 
          value={company.stats.dividendYield} 
          icon={<DollarSign className="w-4 h-4" />} 
        />
        <StatCard 
          label="Avg. Volume" 
          value={company.stats.volume} 
          icon={<Activity className="w-4 h-4" />} 
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button className="flex-1 bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200">
          Buy {company.ticker}
        </button>
        <button className="flex-1 bg-white text-zinc-900 border border-zinc-200 py-4 rounded-2xl font-bold hover:bg-zinc-50 transition-all">
          Add to Portfolio
        </button>
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:border-zinc-300 transition-colors group">
      <div className="flex items-center gap-2 mb-3 text-zinc-400 group-hover:text-zinc-600 transition-colors">
        {icon}
        <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-2xl font-black text-zinc-900">{value}</div>
    </div>
  );
}
