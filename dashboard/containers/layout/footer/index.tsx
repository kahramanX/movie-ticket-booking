"use client";

import { useLanguage } from "@/contexts/languageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-background shadow-sm mt-auto">
      <div className="container mx-auto px-2 py-2">
        <div className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            {t("Cinema Admin Panel")} - {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
