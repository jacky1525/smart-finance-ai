"use client";

import React from 'react';
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Settings, 
  Search, 
  Bell, 
  ChevronDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  LogOut,
  User,
  Zap,
  CreditCard,
  Plus
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useLanguage } from '../context/language_context';

const cashFlowData = [
  { name: 'May', income: 8200, expenses: 3900 },
  { name: 'Jun', income: 9400, expenses: 4100 },
  { name: 'Jul', income: 8900, expenses: 4500 },
  { name: 'Aug', income: 10500, expenses: 3800 },
  { name: 'Sep', income: 9800, expenses: 4200 },
  { name: 'Oct', income: 12400, expenses: 4120 },
];

const transactions = [
  { id: 1, name: 'Apple Store', amount: -1299.00, date: 'Oct 24, 2024', category: 'Tech', logo: 'A' },
  { id: 2, name: 'Stripe Payout', amount: 5400.00, date: 'Oct 23, 2024', category: 'Income', logo: 'S' },
  { id: 3, name: 'Whole Foods', amount: -214.50, date: 'Oct 22, 2024', category: 'Food', logo: 'W' },
  { id: 4, name: 'Netflix Subscription', amount: -19.99, date: 'Oct 21, 2024', category: 'Entertainment', logo: 'N' },
  { id: 5, name: 'Starbucks', amount: -7.50, date: 'Oct 21, 2024', category: 'Food', logo: 'S' },
];

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex h-screen bg-[#060608] text-slate-200 overflow-hidden font-inter">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0a0a0c] border-r border-white/5 flex flex-col p-6 z-20">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap size={22} className="text-white" fill="white" />
          </div>
          <span className="text-xl font-black text-white tracking-tighter">SMARTFINANCE AI</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: t.dashboard.sidebar.dashboard, active: true },
            { id: 'transactions', icon: <ArrowLeftRight size={20} />, label: t.dashboard.sidebar.transactions },
            { id: 'aiInsights', icon: <Sparkles size={20} />, label: t.dashboard.sidebar.aiInsights },
            { id: 'budgets', icon: <Target size={20} />, label: t.dashboard.sidebar.budgets },
            { id: 'investments', icon: <TrendingUp size={20} />, label: t.dashboard.sidebar.investments },
            { id: 'settings', icon: <Settings size={20} />, label: t.dashboard.sidebar.settings },
          ].map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                item.active 
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              <span className={item.active ? 'text-indigo-400' : 'text-slate-500'}>{item.icon}</span>
              <span className="text-sm font-bold">{item.label}</span>
              {item.id === 'aiInsights' && (
                <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
              )}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5">
          <button 
            onClick={handleSignOut}
            className="w-full p-4 glass rounded-2xl flex items-center gap-3 group cursor-pointer hover:bg-white/10 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-white/10">
              <User size={20} className="text-slate-400" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Alex Thompson</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase truncate">Premium Plan</p>
            </div>
            <LogOut size={16} className="text-slate-500 group-hover:text-rose-400 transition-colors" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#060608]/50 backdrop-blur-xl z-10">
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

        {/* Scrollable Dashboard Area */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth">
          {/* Top Row: Net Worth & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass rounded-[32px] p-8 relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full group-hover:bg-indigo-500/20 transition-all duration-700"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">{t.dashboard.netWorth}</h3>
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-black text-white tracking-tighter">$142,500.80</span>
                    <span className="flex items-center gap-1 text-emerald-400 font-bold text-sm bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                      <ArrowUpRight size={14} /> +$3,200 (2.4%)
                    </span>
                  </div>
                </div>
                <div className="mt-8 flex gap-3">
                  <button className="px-6 py-3 bg-white text-black font-black text-xs uppercase rounded-xl hover:bg-emerald-400 transition-all active:scale-95 shadow-xl shadow-white/5">
                    Deposit Funds
                  </button>
                  <button className="px-6 py-3 glass text-white font-black text-xs uppercase rounded-xl hover:bg-white/10 transition-all active:scale-95">
                    View Wallets
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex-1 glass rounded-3xl p-6 border-l-4 border-emerald-500/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.dashboard.monthlyIncome}</span>
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <p className="text-2xl font-black text-white">$9,450</p>
                <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                </div>
              </div>
              <div className="flex-1 glass rounded-3xl p-6 border-l-4 border-rose-500/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.dashboard.monthlyExpenses}</span>
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                    <ArrowDownRight size={16} />
                  </div>
                </div>
                <p className="text-2xl font-black text-white">$4,120</p>
                <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[45%] bg-rose-500 shadow-[0_0_10px_#f43f5e]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: AI Assistant Spotlight */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500 rounded-[34px] blur opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
            <div className="relative glass rounded-[32px] p-1 bg-gradient-to-r from-indigo-600/20 to-emerald-600/20">
              <div className="bg-[#0a0a0c]/80 backdrop-blur-2xl rounded-[30px] p-8 flex flex-col md:flex-row items-center gap-8 border border-white/5">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-600 to-emerald-600 flex items-center justify-center text-white shadow-2xl glow-indigo shrink-0">
                  <Sparkles size={40} fill="white" />
                </div>
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-black text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
                    {t.dashboard.aiAssistant}
                    <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30 uppercase">LIVE</span>
                  </h3>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    {t.dashboard.aiWarning}
                  </p>
                </div>
                <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase rounded-2xl transition-all shadow-xl shadow-indigo-600/30 active:scale-95 shrink-0">
                  {t.dashboard.viewRecs}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row: Charts & Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Chart Card */}
            <div className="glass rounded-[32px] p-8 flex flex-col h-[450px]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-white">{t.dashboard.cashFlow}</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase mt-1">Net Flow: +$8,280.00</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Income</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-1.5 rounded-full bg-indigo-500"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Expenses</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#475569" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false} 
                      dy={10}
                      fontWeight="bold"
                    />
                    <YAxis 
                      stroke="#475569" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(val) => `$${val/1000}k`}
                      fontWeight="bold"
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0a0a0c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                      itemStyle={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="income" 
                      stroke="#10b981" 
                      strokeWidth={4} 
                      dot={{ fill: '#10b981', r: 4, strokeWidth: 0 }} 
                      activeDot={{ r: 8, strokeWidth: 0, fill: '#10b981', className: 'glow-emerald' }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="#6366f1" 
                      strokeWidth={4} 
                      dot={{ fill: '#6366f1', r: 4, strokeWidth: 0 }} 
                      activeDot={{ r: 8, strokeWidth: 0, fill: '#6366f1', className: 'glow-indigo' }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="glass rounded-[32px] p-8 flex flex-col h-[450px]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-white">{t.dashboard.recentActivity}</h3>
                <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-indigo-400 transition-all border border-white/5">
                  <Plus size={20} />
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all border border-white/5 group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all group-hover:scale-110 ${
                        tx.amount > 0 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                      }`}>
                        {tx.logo}
                      </div>
                      <div>
                        <p className="text-sm font-black text-white group-hover:text-indigo-300 transition-colors">{tx.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{tx.date} • {tx.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-black ${tx.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>
                        {tx.amount > 0 ? `+ $${tx.amount.toLocaleString()}` : `- $${Math.abs(tx.amount).toLocaleString()}`}
                      </p>
                      <CreditCard size={12} className="ml-auto mt-1 text-slate-700" />
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="mt-6 w-full py-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 text-slate-400 text-[10px] font-black uppercase tracking-widest transition-all">
                Load More Activity
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-indigo-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
};

export default Dashboard;
