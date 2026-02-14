"use client";

import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/language_context';

const Topbar: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#060608]/50 backdrop-blur-xl z-10 w-full">
      <div className="relative w-96 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
        <input
          type="text"
          placeholder={t.dashboard.search}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl cursor-pointer hover:bg-white/10 transition-all">
          <span className="text-xs font-bold text-white uppercase tracking-widest">October 2024</span>
          <ChevronDown size={14} className="text-slate-500" />
        </div>
        <button className="relative w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all">
          <Bell size={20} />
          <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-[#060608]"></div>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
