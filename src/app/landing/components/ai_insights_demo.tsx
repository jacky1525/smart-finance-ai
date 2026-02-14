
"use client";

import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, Bot, Loader2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/language_context';

const AIInsightsDemo: React.FC = () => {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getAIAdvice = async () => {
    if (!prompt.trim()) return;
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      setResponse("API Key missing. Please configure NEXT_PUBLIC_GEMINI_API_KEY.");
      return;
    }

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        systemInstruction: t.ai.systemInstruction,
      });

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
        }
      });

      const responseText = result.response.text();
      setResponse(responseText || t.ai.error);
    } catch (error) {
      console.error(error);
      setResponse(t.ai.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <div className="inline-flex px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold mb-4">
           {t.ai.badge}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t.ai.title}</h2>
        <p className="text-slate-400">{t.ai.sub}</p>
      </div>

      <div className="glass rounded-[32px] p-6 md:p-10 border border-white/10 shadow-2xl">
        <div className="space-y-6 min-h-[300px] flex flex-col">
          {response ? (
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                  <Bot size={18} />
                </div>
                <div className="flex-1 bg-white/5 border border-white/10 p-5 rounded-2xl text-slate-200 leading-relaxed prose prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: response.replace(/\n/g, '<br/>') }} />
                </div>
              </div>
              <button 
                onClick={() => { setResponse(null); setPrompt(''); }}
                className="text-indigo-400 font-bold text-sm hover:underline"
              >
                {t.ai.another}
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-40">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                <Sparkles size={32} />
              </div>
              <p className="font-medium text-slate-300">{t.ai.magic}</p>
            </div>
          )}

          <div className="relative mt-auto">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && getAIAdvice()}
              placeholder={t.ai.placeholder}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white placeholder-slate-500 transition-all"
            />
            <button 
              onClick={getAIAdvice}
              disabled={loading || !prompt.trim()}
              className="absolute right-3 top-3 bottom-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white rounded-xl transition-all flex items-center justify-center"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {t.ai.tags.map((tag, i) => (
          <button 
            key={i} 
            onClick={() => setPrompt(tag)}
            className="px-4 py-2 rounded-full border border-white/5 bg-white/5 text-slate-400 text-xs font-bold hover:bg-white/10 hover:text-white transition-all"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIInsightsDemo;
