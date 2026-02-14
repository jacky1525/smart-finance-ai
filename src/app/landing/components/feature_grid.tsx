
"use client";

import React from 'react';
import { BrainCircuit, LineChart, Target, Shield, Globe } from 'lucide-react';
import { useLanguage } from '../context/language_context';

const FeatureGrid: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: t.features.f1Title,
      description: t.features.f1Desc,
      icon: <BrainCircuit size={40} className="text-emerald-400" />,
      className: 'row-span-2 md:col-span-2 md:row-span-2 bg-emerald-500/5 border-emerald-500/10 min-h-[300px]',
      contentClass: 'flex flex-col items-center justify-center text-center h-full',
      iconClass: 'bg-emerald-500/10 p-4 rounded-2xl mb-6 ring-1 ring-emerald-500/20'
    },
    {
      title: t.features.f2Title,
      description: t.features.f2Desc,
      icon: <Target size={24} className="text-indigo-400" />,
      className: 'bg-indigo-500/5 border-indigo-500/10',
    },
    {
      title: t.features.f3Title,
      description: t.features.f3Desc,
      icon: <LineChart size={24} className="text-blue-400" />,
      className: 'bg-blue-500/5 border-blue-500/10',
    },
    {
      title: t.features.f4Title,
      description: t.features.f4Desc,
      icon: <Shield size={24} className="text-slate-400" />,
      className: 'bg-slate-500/5 border-slate-500/10',
    },
    {
      title: t.features.f5Title,
      description: t.features.f5Desc,
      icon: <Globe size={24} className="text-purple-400" />,
      className: 'md:col-span-2 bg-purple-500/5 border-purple-500/10',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
      {features.map((f, i) => (
        <div key={i} className={`p-8 rounded-3xl border flex flex-col group hover:border-white/20 transition-all duration-300 overflow-hidden relative ${f.className}`}>
          <div className={`z-10 transition-transform duration-300 ${f.contentClass || 'justify-between h-full'}`}>
            <div className={`mb-4 w-fit transition-transform duration-300 group-hover:scale-110 ${f.contentClass ? 'origin-center' : 'origin-top-left'} ${f.iconClass || ''}`}>
              {f.icon}
            </div>
            <div>
              <h3 className={`text-xl font-bold text-white mb-2 ${f.contentClass ? 'text-3xl' : ''}`}>{f.title}</h3>
              <p className={`text-sm text-slate-400 leading-relaxed ${f.contentClass ? 'max-w-md text-base' : 'max-w-xs'}`}>{f.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
