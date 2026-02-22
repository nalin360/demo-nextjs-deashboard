"use client";

import React, { useState, useEffect } from 'react';
import { CompanyInfo } from '@/src/types';
import CompanyChart from './CompanyChart';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FullScreenChart() {
  const router = useRouter();
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  
  const params = new URLSearchParams(window.location.search);
  const ticker = params.get('ticker') || 'AAPL';

  useEffect(() => {
    fetch(`/api/company/${ticker}`)
      .then(res => res.json())
      .then(data => {
        setCompany(data);
        setLoading(false);
      });
  }, [ticker]);

  const handleBack = () => {
    router.push('/');
  };

  if (loading || !company) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-48 bg-zinc-200 rounded"></div>
          <div className="h-[60vh] w-[80vw] bg-zinc-100 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen p-8 bg-zinc-50 overflow-hidden flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="p-3 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-all text-zinc-500 hover:text-zinc-900 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">{company.name}</h1>
            <p className="text-zinc-500 font-medium">{company.ticker} Performance Analysis</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-zinc-900">${company.price}</div>
          <div className={company.change >= 0 ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>
            {company.change >= 0 ? '+' : ''}{company.change}%
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <CompanyChart history={company.history} isPositive={company.change >= 0} hideExpand />
      </div>
    </div>
  );
}
