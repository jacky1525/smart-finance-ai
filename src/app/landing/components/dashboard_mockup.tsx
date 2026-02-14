
"use client";

import React from 'react';
import { PieChart, CreditCard, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/language_context';

const DashboardMockup: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative glass rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden min-h-[500px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">{t.mockup.balance}</h3>
          <p className="text-3xl font-extrabold text-white">$42,910.50</p>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
            <PieChart size={16} />
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
            <CreditCard size={16} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
          <div className="flex items-center gap-1 text-emerald-400 mb-1">
            <ArrowUpRight size={14} />
            <span className="text-[10px] font-bold uppercase">{t.mockup.income}</span>
          </div>
          <p className="text-xl font-bold text-white">$12,400</p>
        </div>
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
          <div className="flex items-center gap-1 text-rose-400 mb-1">
            <ArrowDownRight size={14} />
            <span className="text-[10px] font-bold uppercase">{t.mockup.expenses}</span>
          </div>
          <p className="text-xl font-bold text-white">$3,840</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-300">{t.mockup.recent}</h4>
          <button className="text-[10px] font-bold uppercase text-indigo-400 hover:text-indigo-300">{t.mockup.viewAll}</button>
        </div>
        
        {t.mockup.transactions.map((tx, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-xs">
                {tx.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{tx.name}</p>
                <p className="text-[10px] text-slate-500">{tx.date} • {tx.category}</p>
              </div>
            </div>
            <p className={`text-sm font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-white'}`}>
              {tx.amount}
            </p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-4 bg-indigo-600 px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
        <Sparkles size={14} className="text-white" />
        <span className="text-[10px] font-bold text-white uppercase tracking-tight">{t.mockup.ready}</span>
      </div>
    </div>
  );
};

export default DashboardMockup;
