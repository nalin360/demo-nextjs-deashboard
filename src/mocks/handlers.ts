import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/companies', () => {
    return HttpResponse.json(['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA']);
  }),

  http.get('/api/company/:ticker', ({ params }) => {
    const { ticker } = params;
    return HttpResponse.json({
      ticker,
      name: `${ticker} Inc.`,
      description: `This is a mocked description for ${ticker} provided by MSW.`,
      price: 150.00 + Math.random() * 50,
      change: (Math.random() * 10 - 5).toFixed(2),
      history: Array.from({ length: 20 }, (_, i) => ({
        date: `2024-01-${i + 1}`,
        value: 140 + Math.random() * 20
      })),
      stats: {
        marketCap: '$2.5T',
        peRatio: '25.4',
        dividendYield: '1.2%',
        volume: '50M'
      }
    });
  }),
];
