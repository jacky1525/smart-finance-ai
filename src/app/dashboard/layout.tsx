"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { LanguageProvider } from "./context/language_context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-screen w-full bg-[#060608] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/api/auth/signin");
  }

  return (
    <LanguageProvider>
      <div className="flex h-screen bg-[#060608] text-slate-200 overflow-hidden font-inter">
        <Sidebar userName={session?.user?.name} />
        
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <Topbar />
          
          <main className="flex-1 overflow-y-auto p-0 scroll-smooth">
            {children}
          </main>
        </div>

        {/* Floating Background Effects */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-indigo-500/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[120px] rounded-full"></div>
        </div>
      </div>
    </LanguageProvider>
  );
}