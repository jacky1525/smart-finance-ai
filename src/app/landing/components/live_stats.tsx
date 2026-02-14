
"use client";

import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';
import { useLanguage } from '../context/language_context';

const LiveStats: React.FC = () => {
  const { t } = useLanguage();

  const data = useMemo(() => [
    { name: t.months[0], spending: 4000, savings: 2400 },
    { name: t.months[1], spending: 3000, savings: 1398 },
    { name: t.months[2], spending: 2000, savings: 9800 },
    { name: t.months[3], spending: 2780, savings: 3908 },
    { name: t.months[4], spending: 1890, savings: 4800 },
    { name: t.months[5], spending: 2390, savings: 3800 },
    { name: t.months[6], spending: 3490, savings: 4300 },
  ], [t.months]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-3 gap-12 items-center">
        <div className="lg:col-span-1 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Activity size={24} />
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight">
            {t.stats.title} <br /> <span className="text-emerald-400 underline decoration-emerald-500/30 underline-offset-8">{t.stats.titleAccent}</span>
          </h2>
          <p className="text-slate-400">
            {t.stats.desc}
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 glass rounded-2xl">
              <span className="text-xs font-bold text-slate-500 uppercase block mb-1">{t.stats.avgRoi}</span>
              <span className="text-2xl font-bold text-white">+12.4%</span>
            </div>
            <div className="p-4 glass rounded-2xl">
              <span className="text-xs font-bold text-slate-500 uppercase block mb-1">{t.stats.users}</span>
              <span className="text-2xl font-bold text-white">52K+</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 glass rounded-3xl p-8 border border-white/10 h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-white">{t.stats.chartTitle}</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{t.stats.spending}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{t.stats.savings}</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val: number) => `$${val}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              />
              <Area type="monotone" name={t.stats.spending} dataKey="spending" stroke="#6366f1" fillOpacity={1} fill="url(#colorSpending)" strokeWidth={3} />
              <Area type="monotone" name={t.stats.savings} dataKey="savings" stroke="#10b981" fillOpacity={1} fill="url(#colorSavings)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LiveStats;
