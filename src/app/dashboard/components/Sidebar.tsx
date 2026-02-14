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
  Zap, 
  User, 
  LogOut 
} from 'lucide-react';
import { useLanguage } from '../context/language_context';

interface SidebarProps {
  userName?: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ userName }) => {
  const { t } = useLanguage();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <aside className="w-72 bg-[#0a0a0c] border-r border-white/5 flex flex-col p-6 z-20 h-full">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Zap size={22} className="text-white" fill="white" />
        </div>
        <span className="text-xl font-black text-white tracking-tighter uppercase">SmartFinance AI</span>
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
        <div className="p-4 glass rounded-2xl flex flex-col gap-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-white/10">
                <User size={20} className="text-slate-400" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{userName || "User"}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase truncate">Premium Plan</p>
              </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 flex items-center justify-center gap-2 transition-all font-bold text-xs uppercase"
          >
            <LogOut size={14} />
            {t.dashboard.sidebar.logout || "Logout"}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
