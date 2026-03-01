import { useQuery } from '@tanstack/react-query';

export function useCompanies() {
  return useQuery<string[]>({
    queryKey: ['companies'],
    queryFn: async () => {
      const res = await fetch('/api/companies');
      if (!res.ok) throw new Error('Failed to fetch companies');
      return res.json();
    },
  });
}
