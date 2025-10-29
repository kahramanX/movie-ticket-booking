"use client";

import { useLanguage, Language } from "../contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { state, dispatch } = useLanguage();

  const handleLanguageChange = (language: Language) => {
    dispatch({ type: "SET_LANGUAGE", payload: language });
  };

  const languages: { code: Language; name: string }[] = [
    { code: "tr", name: "TR" },
    { code: "en", name: "EN" },
  ];

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            state.currentLanguage === lang.code
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
}
