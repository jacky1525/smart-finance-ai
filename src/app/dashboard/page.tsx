"use client";

import React from 'react';
import Dashboard from './components/Dashboard';
import { LanguageProvider } from './context/language_context';

export default function DashboardPage() {
  return (
    <LanguageProvider>
      <Dashboard />
    </LanguageProvider>
  );
}