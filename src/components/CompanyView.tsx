"use client";

import React, { useState, useEffect } from 'react';
import { CompanyInfo } from '@/src/types';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Activity, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import CompanyChart from './CompanyChart';
import { useMarketStore } from '@/src/store/useMarketStore';
import { useCompanyDetails } from '@/src/hooks/useCompanyDetails';

export default function CompanyView() {
  const selectedTicker = useMarketStore((state) => state.selectedTicker);

  const { data: company, isLoading: loading } = useCompanyDetails(selectedTicker);

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
      <CompanyChart history={company.history} isPositive={isPositive} />

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
