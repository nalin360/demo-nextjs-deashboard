import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CompanyView from './components/CompanyView';

export default function App() {
  const [selectedTicker, setSelectedTicker] = useState('AAPL');

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <Navbar />
      
      <div className="flex">
        <Sidebar 
          selectedTicker={selectedTicker} 
          onSelectTicker={setSelectedTicker} 
        />
        
        <main className="flex-1 min-h-[calc(100vh-64px)] overflow-y-auto">
          <CompanyView ticker={selectedTicker} />
        </main>
      </div>
    </div>
  );
}
