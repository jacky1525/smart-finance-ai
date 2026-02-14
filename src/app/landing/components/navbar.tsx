
"use client";

import React from 'react';
import { Zap } from 'lucide-react';
import { useLanguage } from '../context/language_context';

interface NavbarProps {
  isScrolled: boolean;
  onRegister: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, onRegister }) => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4 shadow-2xl' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300 shadow-lg glow-indigo">
            <Zap className="text-white w-6 h-6" fill="currentColor" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">SmartFinance <span className="text-emerald-400">AI</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors">{t.nav.features}</a>
          <a href="#stats" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors">{t.nav.performance}</a>
          <a href="#ai-demo" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors">{t.nav.insights}</a>
        </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${language === 'en' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('tr')}
              className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all ${language === 'tr' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              TR
            </button>
          </div>

          <button 
            onClick={onRegister}
            className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-emerald-400 transition-all active:scale-95 shadow-lg"
          >
            {t.nav.getStarted}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
