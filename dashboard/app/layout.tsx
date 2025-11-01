import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { LanguageProvider } from "@/contexts/languageContext";
import { ThemeProvider } from "@/contexts/themeContext";
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
    <html lang="tr" className="dark">
      <body className={`${interFont.variable} antialiased`}>
        <NextTopLoader
          color="#00ff00"
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 20px #2563eb, 0 0 15px #3b82f6, 0 0 10px #60a5fa, 0 2px 4px rgba(37, 99, 235, 0.3)"
        />
        <ThemeProvider defaultTheme="dark">
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
