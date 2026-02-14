
"use client";

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import DashboardMockup from './dashboard_mockup';
import { useLanguage } from '../context/language_context';

interface HeroProps {
  onRegister: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRegister }) => {
  const { t } = useLanguage();

  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest animate-pulse">
            <Sparkles size={14} /> {t.hero.badge}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-white">
            {t.hero.headline} <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-emerald-400 to-indigo-400">{t.hero.headlineAccent}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl">
            {t.hero.subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={onRegister}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 group"
            >
              {t.hero.ctaPrimary} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/10">
              {t.hero.ctaSecondary}
            </button>
          </div>

          <div className="flex items-center gap-8 pt-4 border-t border-white/5">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0c] object-cover" src={`https://picsum.photos/seed/${i + 100}/80/80`} alt="user" />
              ))}
              <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#0a0a0c] flex items-center justify-center text-[10px] font-bold text-slate-300">
                +2k
              </div>
            </div>
            <div className="text-sm">
              <span className="block text-white font-bold">{t.hero.rating}</span>
              <span className="text-slate-500 font-medium">{t.hero.trusted}</span>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 rounded-3xl blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
};

export default Hero;
