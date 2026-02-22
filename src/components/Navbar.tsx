import { User, ShoppingCart, BarChart2, Bell, Search } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  return (
    <nav className="h-16 border-b border-zinc-200 bg-white flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 font-bold text-xl text-zinc-900">
          <div className="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center text-white">
            M
          </div>
          MarketPulse
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-500">
          <a href="#" className="text-zinc-900 border-b-2 border-zinc-900 py-5">Overview</a>
          <a href="#" className="hover:text-zinc-900 transition-colors py-5">Markets</a>
          <a href="#" className="hover:text-zinc-900 transition-colors py-5">Portfolio</a>
          <a href="#" className="hover:text-zinc-900 transition-colors py-5">News</a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search tickers..." 
            className="pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-zinc-200 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 px-4 border-x border-zinc-200">
          <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors relative">
            <ShoppingCart className="w-5 h-5 text-zinc-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            <span className="sr-only">Orders</span>
          </button>
          <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
            <BarChart2 className="w-5 h-5 text-zinc-600" />
            <span className="sr-only">Positions</span>
          </button>
        </div>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-zinc-900">Alex Rivera</p>
            <p className="text-xs text-zinc-500">Pro Account</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold border-2 border-white shadow-sm">
            AR
          </div>
        </div>
      </div>
    </nav>
  );
}
