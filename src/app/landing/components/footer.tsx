
"use client";

import React from 'react';
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../context/language_context';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="text-white w-5 h-5" fill="currentColor" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">SmartFinance <span className="text-emerald-400">AI</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter size={18} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github size={18} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Mail size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.platform}</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t.footer.pricing}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t.footer.integrations}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t.footer.security}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t.footer.api}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.company}</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t.footer.about}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t.footer.blog}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t.footer.careers}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t.footer.press}</a></li>
            </ul>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/10">
            <h4 className="text-white font-bold mb-4">{t.footer.newsletter}</h4>
            <p className="text-xs text-slate-500 mb-4">{t.footer.newsletterSub}</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder={t.footer.emailPlaceholder}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500/50 w-full"
              />
              <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-emerald-400 transition-all">
                {t.footer.newsletterBtn}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5">
          <p className="text-xs text-slate-600">
            {t.footer.rights}
          </p>
          <div className="flex gap-8 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-slate-400 transition-colors">{t.footer.terms}</a>
            <a href="#" className="hover:text-slate-400 transition-colors">{t.footer.cookies}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
