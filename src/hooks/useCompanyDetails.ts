import { useQuery } from '@tanstack/react-query';
import { CompanyInfo } from '@/src/types';

export function useCompanyDetails(ticker: string | null) {
  return useQuery<CompanyInfo>({
    queryKey: ['company', ticker],
    queryFn: async () => {
      if (!ticker) throw new Error('Ticker is required');
      const res = await fetch(`/api/company/${ticker}`);
      if (!res.ok) throw new Error('Failed to fetch company details');
      return res.json();
    },
    enabled: !!ticker,
  });
}
