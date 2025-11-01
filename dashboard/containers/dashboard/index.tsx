"use client";

import { useLanguage } from "@/contexts/languageContext";

export const DashboardPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t("Homepage")}</h1>
        <p className="text-xl text-muted-foreground">
          {t("Cinema Admin Panel - Dashboard")}
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
