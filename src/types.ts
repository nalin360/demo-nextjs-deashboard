export interface CompanyStats {
  marketCap: string;
  peRatio: string;
  dividendYield: string;
  volume: string;
}

export interface HistoryPoint {
  date: string;
  value: number;
}

export interface CompanyInfo {
  name: string;
  ticker: string;
  price: number;
  change: number;
  description: string;
  stats: CompanyStats;
  history: HistoryPoint[];
}
