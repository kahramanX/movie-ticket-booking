"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import trTranslations from "../locales/tr.json";
import enTranslations from "../locales/en.json";

// Dil tipleri
export type Language = "tr" | "en";

// Çeviri tipini tanımla
type Translations = typeof trTranslations;

// State tipi
interface LanguageState {
  currentLanguage: Language;
  translations: Translations;
}

// Action tipleri
type LanguageAction = { type: "SET_LANGUAGE"; payload: Language };

// Context tipi
interface LanguageContextType {
  state: LanguageState;
  dispatch: React.Dispatch<LanguageAction>;
  t: (key: string) => string;
}

// Cookie helper fonksiyonları
const getCookieLanguage = (): Language => {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";");
    const langCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("language="),
    );
    if (langCookie) {
      const lang = langCookie.split("=")[1] as Language;
      return lang === "en" || lang === "tr" ? lang : "en";
    }
  }
  return "en"; // Varsayılan İngilizce
};

const setCookieLanguage = (language: Language) => {
  if (typeof document !== "undefined") {
    document.cookie = `language=${language}; path=/; max-age=31536000`; // 1 yıl
  }
};

// Çevirileri getir
const getTranslations = (language: Language): Translations => {
  switch (language) {
    case "tr":
      return trTranslations;
    case "en":
      return enTranslations;
    default:
      return enTranslations; // Varsayılan İngilizce
  }
};

// Reducer
const languageReducer = (
  state: LanguageState,
  action: LanguageAction,
): LanguageState => {
  switch (action.type) {
    case "SET_LANGUAGE":
      setCookieLanguage(action.payload); // Cookie'ye kaydet
      return {
        ...state,
        currentLanguage: action.payload,
        translations: getTranslations(action.payload),
      };
    default:
      return state;
  }
};

// Initial state - cookie'den oku, yoksa İngilizce
const getInitialState = (): LanguageState => {
  const savedLanguage = getCookieLanguage();
  return {
    currentLanguage: savedLanguage,
    translations: getTranslations(savedLanguage),
  };
};

// Context oluştur
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(languageReducer, getInitialState());

  // İlk yüklemede cookie'yi set et
  useEffect(() => {
    setCookieLanguage(state.currentLanguage);
  }, []);

  // Çeviri fonksiyonu - flat structure için
  const t = (key: string): string => {
    return (state.translations as Record<string, string>)[key] || key; // Eğer çeviri bulunamazsa key'i döndür
  };

  return (
    <LanguageContext.Provider value={{ state, dispatch, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
