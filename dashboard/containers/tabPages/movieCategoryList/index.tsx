"use client";

import { useLanguage } from "@/contexts/languageContext";

export const MovieCategoryList = () => {
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{t("Movie Category List")}</h1>
      </div>
    </div>
  );
};

export default MovieCategoryList;
