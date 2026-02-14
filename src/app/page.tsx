"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Hero from './landing/components/hero';
import Navbar from './landing/components/navbar';
import Footer from './landing/components/footer';
import AIInsightsDemo from './landing/components/ai_insights_demo';
import LiveStats from './landing/components/live_stats';
import FeatureGrid from './landing/components/feature_grid';
import { useLanguage } from './landing/context/language_context';
import RegistrationWizard from './(auth)/register/registration_wizard';
import AuthModal from './(auth)/components/auth_modal';
import { checkOnboardingStatus } from '@/actions/check-onboarding-action';


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userId, setUserId] = useState("");
  const { t } = useLanguage();

  // OAuth kullanıcıları için: Session var ve onboarding bitmemişse wizard'ı aç
  useEffect(() => {
    const checkAndRedirect = async () => {
      if (status === "authenticated" && session?.user?.id) {
        const hasCompleted = await checkOnboardingStatus(session.user.id);
        
        if (hasCompleted === true) {
          // Onboarding bitmiş -> Dashboard'a yönlendir
          router.push("/dashboard");
        } else if (hasCompleted === false) {
          // Onboarding bitmemiş -> Wizard'ı aç
          setUserId(session.user.id);
          setShowWizard(true);
        }
      }
    };
    
    checkAndRedirect();
  }, [session, status, router]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthSuccess = (id: string) => {
    setUserId(id);
    setShowAuthModal(false);
    setShowWizard(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/10 blur-[120px] rounded-full"></div>
      </div>

      <Navbar isScrolled={scrolled} onRegister={() => setShowAuthModal(true)} />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        initialView="login"
      />

      {showWizard && (
        <RegistrationWizard 
          userId={userId}
          onCancel={() => setShowWizard(false)} 
          onComplete={() => setShowWizard(false)} 
        />
      )}
      
      <main>
        <Hero onRegister={() => setShowAuthModal(true)} />
        
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {t.features.sectionTitle}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              {t.features.sectionSub}
            </p>
          </div>
          <FeatureGrid />
        </section>

        <section id="stats" className="py-24 bg-gradient-to-b from-transparent via-white/5 to-transparent">
          <LiveStats />
        </section>

        <section id="ai-demo" className="py-24 px-6 max-w-7xl mx-auto">
          <AIInsightsDemo />
        </section>
      </main>

      <Footer />
    </div>
  );
}
