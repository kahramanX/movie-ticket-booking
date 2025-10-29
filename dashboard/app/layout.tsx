import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "../contexts/LanguageContext";
import DynamicHtml from "../components/DynamicHtml";
import "./globals.css";

const interFont = Inter({
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
    <html lang="tr">
      <body className={`${interFont.variable} antialiased`}>
        <LanguageProvider>
          <DynamicHtml>{children}</DynamicHtml>
        </LanguageProvider>
      </body>
    </html>
  );
}
