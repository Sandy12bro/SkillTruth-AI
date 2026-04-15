import React from 'react';
import Card from '../components/ui/Card';
import { Search, Calendar, Filter, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const History = () => {
  const historyItems = [
    { id: 1, name: 'Senior Dev Resume', date: '2026-04-10', status: 'Completed', score: 92, type: 'Full Analysis' },
    { id: 2, name: 'Product Manager CV', date: '2026-04-08', status: 'Flagged', score: 65, type: 'Integrity Check' },
    { id: 3, name: 'Marketing Specialist', date: '2026-04-05', status: 'Completed', score: 88, type: 'Skill Audit' },
    { id: 4, name: 'Junior Designer', date: '2026-04-01', status: 'Completed', score: 95, type: 'Full Analysis' },
  ];

  return (
    <div className="p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">History Vault</h1>
          <p className="text-slate-600 dark:text-slate-400">Search and manage all past verification sessions.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-white"
            />
          </div>
          <Button variant="glass" className="flex items-center gap-2">
            <Filter size={18} /> Filter
          </Button>
        </div>
      </header>

      <div className="space-y-4">
        {historyItems.map((item, i) => (
          <Card key={item.id} className="flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-indigo-500/5 transition-shadow">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Calendar size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.name}</h4>
                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 font-medium">{item.type}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full md:w-auto md:gap-12">
              <div className="text-center md:text-right">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">ST-Score</p>
                <p className={`text-2xl font-black ${item.score > 80 ? 'text-emerald-600 dark:text-emerald-500' : 'text-amber-600 dark:text-amber-500'}`}>
                  {item.score}%
                </p>
              </div>

              <div className="flex items-center gap-6">
                 <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border ${
                    item.status === 'Completed' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-200 dark:border-emerald-500/20' : 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500 border-red-200 dark:border-red-500/20'
                  }`}>
                    {item.status}
                  </span>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all text-slate-500 dark:text-slate-400">
                    <ArrowRight size={20} />
                  </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button variant="glass" className="text-sm font-bold opacity-80 hover:opacity-100">
          Load Older Reports
        </Button>
      </div>
    </div>
  );
};

export default History;
