"use client";
import React, { useState, useTransition } from "react";
import { X, Mail, Lock, User, ArrowRight, Loader2, Apple, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/app/landing/context/language_context";
import { registerUser } from "@/actions/register-action";

import { login } from "@/actions/login-action";
import { googleSignIn } from "@/actions/google-auth-action";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userId: string) => void;
  initialView?: "login" | "register"; // YENİ: Başlangıç görünümü
}

export default function AuthModal({ isOpen, onClose, onSuccess, initialView = "register" }: AuthModalProps) {
  const { t } = useLanguage();
  const router = useRouter(); // YENİ: Yönlendirme için
  // initialView prop'una göre state'i başlat (useEffect ile güncellemek daha sağlıklı olabilir modal açılıp kapandığında)
  const [isLogin, setIsLogin] = useState(initialView === "login");
  const [showPassword, setShowPassword] = useState(false);
  const [pending, startTransition] = useTransition();

  // Modal her açıldığında view'i resetlemek için effect
  React.useEffect(() => {
    if (isOpen) {
      setIsLogin(initialView === "login");
    }
  }, [isOpen, initialView]);
  
  // Basit form state (Zod validation backend'de yapılacak)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      if (isLogin) {
        // LOGIN İŞLEMİ
        const result = await login(formData);
        if (result.error) {
          setError(result.error);
        } else if (result.success) {
           if (result.hasCompletedOnboarding) {
             // Onboarding bitmiş -> Dashboard'a git
             // Router.push yetmeyebilir, session'ın client'a geçmesi için refresh gerekebilir.
             window.location.href = "/dashboard"; 
           } else {
             // Onboarding bitmemiş -> Wizard'ı aç (Resume)
             onSuccess(result.userId!);
           }
        }
      } else {
        // REGISTER İŞLEMİ
        const result = await registerUser(formData);
        if (result.error) {
          setError(result.error);
        } else if (result.success && result.userId) {
          // Başarılı ise wizard'ı açmak için parent'ı bilgilendir
          onSuccess(result.userId); 
        }
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0a0a0c] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            {isLogin ? t.auth.welcomeBack : t.auth.createAccount}
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            {isLogin ? t.auth.loginSubtitle : t.auth.registerSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 ml-1">{t.auth.fullName}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder={t.auth.fullName}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 ml-1">{t.auth.email}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="email" 
                required
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 ml-1">{t.auth.password}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center flex items-center justify-center gap-2">
              <AlertCircle size={14} />
              {/* @ts-ignore */}
              {t.auth.errors[error] || error}
            </div>
          )}

          <button 
            disabled={pending}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 active:scale-95 mt-4"
          >
            {pending ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                {isLogin ? t.auth.signIn : t.auth.createAccountBtn} <ArrowRight size={18} />
              </>
            )}
          </button>

          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-white/5"></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase">{t.auth.orContinue}</span>
            <div className="flex-1 h-px bg-white/5"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button" 
              onClick={() => googleSignIn()}
              className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition-all"
            >
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-4 h-4" alt="Google" />
              Google
            </button>
            <button 
              type="button" 
              disabled
              className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-white/5 bg-white/5 text-slate-600 font-bold text-xs cursor-not-allowed opacity-50"
            >
              <Apple size={16} />
              Apple
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-600 mt-2">{t.auth.appleComingSoon}</p>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            {isLogin ? t.auth.dontHaveAccount : t.auth.alreadyHaveAccount}{" "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              {isLogin ? t.auth.signUpLink : t.auth.signInLink}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
