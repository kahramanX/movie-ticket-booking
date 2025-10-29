"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { ReactNode, useEffect } from "react";

interface DynamicHtmlProps {
  children: ReactNode;
}

export default function DynamicHtml({ children }: DynamicHtmlProps) {
  const { state } = useLanguage();

  // Hidrasyon sonrası DOM'u güncelle - performanslı ve güvenli
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = state.currentLanguage;
      document.documentElement.dir = "ltr";
    }
  }, [state.currentLanguage]);

  // Hidrasyon sorununu önlemek için children'ı döndür
  return <>{children}</>;
}
