"use client";

import { useLanguage, Language } from "@/contexts/languageContext";
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = () => {
  const { state, dispatch } = useLanguage();

  const handleLanguageChange = (language: Language) => {
    dispatch({ type: "SET_LANGUAGE", payload: language });
  };

  const languages: { code: Language; name: string }[] = [
    { code: "tr", name: "TR" },
    { code: "en", name: "EN" },
  ];

  return (
    <div className="flex gap-1">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          variant={state.currentLanguage === lang.code ? "default" : "outline"}
          size="sm"
        >
          {lang.name}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
