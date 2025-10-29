"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
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

// Çevirileri getir
const getTranslations = (language: Language): Translations => {
  switch (language) {
    case "tr":
      return trTranslations;
    case "en":
      return enTranslations;
    default:
      return trTranslations;
  }
};

// Reducer
const languageReducer = (
  state: LanguageState,
  action: LanguageAction,
): LanguageState => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return {
        ...state,
        currentLanguage: action.payload,
        translations: getTranslations(action.payload),
      };
    default:
      return state;
  }
};

// Initial state - default olarak Türkçe
const initialState: LanguageState = {
  currentLanguage: "tr",
  translations: trTranslations,
};

// Context oluştur
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(languageReducer, initialState);

  // Çeviri fonksiyonu - nested key'leri destekler (örn: "dashboard.title")
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = state.translations;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key; // Eğer çeviri bulunamazsa key'i döndür
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
