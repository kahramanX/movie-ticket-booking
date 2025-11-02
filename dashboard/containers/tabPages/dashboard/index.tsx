"use client";

import { useLanguage } from "@/contexts/languageContext";

export const Dashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{t("Home")}</h1>
      </div>
    </div>
  );
};

export default Dashboard;
