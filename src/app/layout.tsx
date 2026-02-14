import type { Metadata } from "next";
import { LanguageProvider } from "./landing/context/language_context";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartFinance AI | Master Your Money",
  description: "An AI-powered personal finance management platform with sleek minimalist design and real-time insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
