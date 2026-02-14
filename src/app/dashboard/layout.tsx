// src/app/(dashboard)/layout.tsx

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Oturum açmamış kullanıcıyı login sayfasına yönlendir (Güvenlik)
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Yan Menü */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold text-blue-600">SmartFinance AI</h2>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <a href="/dashboard" className="block p-2 text-gray-700 hover:bg-blue-50 rounded">Özet</a>
          <a href="/dashboard/expenses" className="block p-2 text-gray-700 hover:bg-blue-50 rounded">Harcamalar</a>
          <a href="/dashboard/budgets" className="block p-2 text-gray-700 hover:bg-blue-50 rounded">Bütçeler</a>
        </nav>
      </aside>

      {/* Ana İçerik Alanı */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Hoş geldin, {session.user?.name} 👋</h1>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
             {/* Kullanıcı baş harfi veya resmi */}
             {session.user?.name?.charAt(0)}
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}