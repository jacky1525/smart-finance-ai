
"use client";

import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Home, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  Mail, 
  Lock,
  ArrowRight,
  Apple,
  Briefcase,
  Users,
  Coins,
  Shield,
  Zap
} from 'lucide-react';
import { useLanguage } from '@/app/landing/context/language_context';
import { completeOnboarding } from '@/actions/onboarding-action';

interface RegistrationWizardProps {
  onComplete: () => void;
  onCancel: () => void;
  userId: string;
}

const RegistrationWizard: React.FC<RegistrationWizardProps> = ({ onComplete, onCancel, userId }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    goal: '',
    age: 25,
    employment: '',
    income: 50000,
    maritalStatus: 'single', // 'single' | 'married'
    spouseWork: false,
    spouseIncome: 40000,
    savings: 10000,
    assets: [] as string[],
    aiExp: '',
    risk: ''
  });

  // Per-step validation with localized error messages
  const validateStep = (): string | null => {
    switch (step) {
      case 1:
        if (!formData.goal) return t.wizard.validationErrors?.goal || "Please select a goal";
        break;
      case 2:
        if (!formData.employment) return t.wizard.validationErrors?.employment || "Please select employment status";
        break;
      case 3:
        // maritalStatus has default, always valid
        break;
      case 4:
        // savings has default, assets optional
        break;
      case 5:
        if (!formData.aiExp) return t.wizard.validationErrors?.aiExp || "Please select AI experience";
        if (!formData.risk) return t.wizard.validationErrors?.risk || "Please select risk appetite";
        break;
    }
    return null;
  };

  const submitData = async () => {
    setLoading(true);
    setError("");
    const result = await completeOnboarding(userId, formData);
    setLoading(false);
    
    if (result.success) {
      setStep(6); // Success screen
    } else {
      setError(result.error || "An error occurred");
    }
  };

  const nextStep = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(""); // Clear error on success
    
    if (step === 5) {
      submitData();
    } else {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => {
    setError("");
    setStep(s => Math.max(s - 1, 1));
  };

  const progress = (step / 5) * 100;

  const toggleAsset = (asset: string) => {
    setFormData(prev => ({
      ...prev,
      assets: prev.assets.includes(asset) 
        ? prev.assets.filter(a => a !== asset) 
        : [...prev.assets, asset]
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
        {t.wizard.step1.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { id: 'save', icon: <Home className="text-indigo-400" />, title: t.wizard.step1.goal1, sub: t.wizard.step1.goal1Desc },
          { id: 'grow', icon: <TrendingUp className="text-emerald-400" />, title: t.wizard.step1.goal2, sub: t.wizard.step1.goal2Desc },
          { id: 'debt', icon: <ShieldCheck className="text-rose-400" />, title: t.wizard.step1.goal3, sub: t.wizard.step1.goal3Desc },
        ].map(goal => (
          <button
            key={goal.id}
            onClick={() => setFormData({ ...formData, goal: goal.id })}
            className={`p-6 rounded-2xl border transition-all text-left flex flex-col items-center justify-center gap-4 group ${
              formData.goal === goal.id 
                ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/50 shadow-lg' 
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className={`p-4 rounded-xl transition-colors ${formData.goal === goal.id ? 'bg-indigo-600' : 'bg-white/5'}`}>
              {goal.icon}
            </div>
            <div className="text-center">
              <p className="font-bold text-white">{goal.title}</p>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tight">{goal.sub}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-white text-center">{t.wizard.step2.title}</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.wizard.step2.age}</label>
            <span className="text-emerald-400 font-bold text-lg">{formData.age}</span>
          </div>
          <input 
            type="range" min="18" max="99" value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.wizard.step2.employment}</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {t.wizard.step2.empOptions.map(opt => (
              <button
                key={opt} onClick={() => setFormData({ ...formData, employment: opt })}
                className={`px-4 py-2.5 rounded-xl border text-[11px] font-bold transition-all ${
                  formData.employment === opt 
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg glow-indigo' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.wizard.step2.income}</label>
            <span className="text-indigo-400 font-bold text-lg">${formData.income.toLocaleString()}</span>
          </div>
          <input 
            type="range" min="0" max="1000000" step="5000" value={formData.income}
            onChange={(e) => setFormData({ ...formData, income: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-white text-center">{t.wizard.step3.title}</h2>
      
      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.wizard.step3.marital}</label>
          <div className="flex gap-4">
            <button 
              onClick={() => setFormData({...formData, maritalStatus: 'single'})}
              className={`flex-1 py-4 rounded-2xl border font-bold transition-all flex items-center justify-center gap-2 ${formData.maritalStatus === 'single' ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}
            >
              <User size={18} /> {t.wizard.step3.single}
            </button>
            <button 
              onClick={() => setFormData({...formData, maritalStatus: 'married'})}
              className={`flex-1 py-4 rounded-2xl border font-bold transition-all flex items-center justify-center gap-2 ${formData.maritalStatus === 'married' ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}
            >
              <Users size={18} /> {t.wizard.step3.married}
            </button>
          </div>
        </div>

        {formData.maritalStatus === 'married' && (
          <div className="space-y-6 p-6 glass rounded-2xl border-white/10 animate-in slide-in-from-top-4 duration-500">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.wizard.step3.spouseWork}</label>
              <div className="flex gap-2">
                {[true, false].map(val => (
                  <button 
                    key={val.toString()}
                    onClick={() => setFormData({...formData, spouseWork: val})}
                    className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${formData.spouseWork === val ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}
                  >
                    {val ? t.wizard.step3.yes : t.wizard.step3.no}
                  </button>
                ))}
              </div>
            </div>

            {formData.spouseWork && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.wizard.step3.spouseIncome}</label>
                  <span className="text-emerald-400 font-bold">${formData.spouseIncome.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="0" max="1000000" step="5000" value={formData.spouseIncome}
                  onChange={(e) => setFormData({ ...formData, spouseIncome: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-white text-center">{t.wizard.step4.title}</h2>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.wizard.step4.savings}</label>
            <span className="text-indigo-400 font-bold text-xl">${formData.savings.toLocaleString()}</span>
          </div>
          <input 
            type="range" min="0" max="2000000" step="10000" value={formData.savings}
            onChange={(e) => setFormData({ ...formData, savings: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.wizard.step4.assets}</label>
          <div className="grid grid-cols-2 gap-3">
            {t.wizard.step4.assetOptions.map(asset => (
              <button
                key={asset} onClick={() => toggleAsset(asset)}
                className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center gap-3 transition-all ${
                  formData.assets.includes(asset) 
                    ? 'bg-white/10 border-indigo-500 text-white' 
                    : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/20'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${formData.assets.includes(asset) ? 'bg-indigo-400 shadow-[0_0_8px_#818cf8]' : 'bg-slate-700'}`}></div>
                {asset}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-white text-center">{t.wizard.step5.title}</h2>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.wizard.step5.aiExp}</label>
          <div className="flex flex-wrap gap-2">
            {t.wizard.step5.aiOptions.map(opt => (
              <button
                key={opt} onClick={() => setFormData({ ...formData, aiExp: opt })}
                className={`flex-1 py-3 rounded-xl border text-[11px] font-bold transition-all ${
                  formData.aiExp === opt 
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg glow-emerald' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.wizard.step5.risk}</label>
          <div className="flex flex-wrap gap-2">
            {t.wizard.step5.riskOptions.map(opt => (
              <button
                key={opt} onClick={() => setFormData({ ...formData, risk: opt })}
                className={`flex-1 py-3 rounded-xl border text-[11px] font-bold transition-all ${
                  formData.risk === opt 
                    ? 'bg-rose-600 border-rose-400 text-white shadow-lg' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="py-12 space-y-8 flex flex-col items-center justify-center animate-in zoom-in-95 duration-1000">
      <div className="relative">
        <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
        <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 relative z-10">
          <CheckCircle2 size={48} />
        </div>
      </div>
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-white">{t.wizard.success.title}</h2>
        <p className="text-slate-400 max-w-sm mx-auto leading-relaxed">
          {t.wizard.success.sub}
        </p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-[#0a0a0c]/90 backdrop-blur-2xl transition-all duration-500">
      <div className="w-full max-w-2xl glass rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
        
        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500 bg-[length:200%_100%] animate-gradient transition-all duration-700 ease-out shadow-[0_0_20px_rgba(99,102,241,0.5)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Wizard Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <span className="text-base font-black text-white tracking-tighter">SMARTFINANCE AI</span>
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500">
            {t.wizard.stepOf.replace('{current}', Math.min(step, 5).toString())/*.replace('6', '5') hacky but ok for now */} / 5
          </span>
        </div>

        {/* Content */}
        <div className="min-h-[420px]">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
          {step === 6 && renderSuccess()}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-rose-300 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/5">
          {step < 6 ? (
            <>
              {step > 1 && (
                <button 
                  onClick={prevStep}
                  className="flex items-center gap-2 text-slate-400 hover:text-white font-bold text-sm transition-colors px-4 py-2"
                  disabled={loading}
                >
                  <ChevronLeft size={18} />
                  {t.wizard.back}
                </button>
              )}
              {step === 1 && <div></div>}
              <button 
                onClick={nextStep}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-10 rounded-2xl flex items-center gap-2 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.wizard.next}
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          ) : (
            <button 
              onClick={onComplete}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-emerald-600/20 active:scale-95 text-lg"
            >
              {t.wizard.finish}
              <ArrowRight size={22} />
            </button>
          )}
        </div>
      </div>
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/5 blur-[150px] -z-10 rounded-full pointer-events-none"></div>
    </div>
  );
};

export default RegistrationWizard;
