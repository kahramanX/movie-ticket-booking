import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "../contexts/LanguageContext";
import "./globals.css";

const interFont = Geist({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for the client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="tr">
        <body className={`${interFont.variable} antialiased`}>{children}</body>
      </html>
    </LanguageProvider>
  );
}
