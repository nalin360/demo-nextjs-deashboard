import { create } from 'zustand';

interface MarketState {
  selectedTicker: string;
  setSelectedTicker: (ticker: string) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  selectedTicker: 'AAPL',
  setSelectedTicker: (ticker) => set({ selectedTicker: ticker }),
}));
