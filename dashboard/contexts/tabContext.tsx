"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

// Tab tipi tanımlaması
export interface Tab {
  id: string;
  title: string;
  path: string;
  content: React.ComponentType;
  closable: boolean;
}

// Tab state tipi
interface TabState {
  tabs: Tab[];
  activeTabId: string | null;
}

// Tab action tipleri
type TabAction =
  | { type: "ADD_TAB"; payload: Tab }
  | { type: "REMOVE_TAB"; payload: string }
  | { type: "SET_ACTIVE_TAB"; payload: string }
  | { type: "CLEAR_ALL_TABS" };

// Context tipi
interface TabContextType {
  state: TabState;
  dispatch: React.Dispatch<TabAction>;
  addTab: (tab: Omit<Tab, "id">) => void;
  removeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  clearAllTabs: () => void;
}

// Initial state
const initialState: TabState = {
  tabs: [],
  activeTabId: null,
};

// Reducer
const tabReducer = (state: TabState, action: TabAction): TabState => {
  switch (action.type) {
    case "ADD_TAB": {
      const existingTab = state.tabs.find(
        (tab) => tab.path === action.payload.path,
      );

      if (existingTab) {
        // Tab zaten varsa sadece aktif yap
        return {
          ...state,
          activeTabId: existingTab.id,
        };
      }

      // Yeni tab ekle
      const newTab = {
        ...action.payload,
        id: `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };

      return {
        ...state,
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    }

    case "REMOVE_TAB": {
      const tabIndex = state.tabs.findIndex((tab) => tab.id === action.payload);
      const newTabs = state.tabs.filter((tab) => tab.id !== action.payload);

      let newActiveTabId = state.activeTabId;

      // Kapatılan tab aktifse, yeni aktif tab belirle
      if (state.activeTabId === action.payload) {
        if (newTabs.length === 0) {
          newActiveTabId = null;
        } else if (tabIndex > 0) {
          // Önceki tab'ı aktif yap
          newActiveTabId = newTabs[tabIndex - 1].id;
        } else {
          // Sonraki tab'ı aktif yap
          newActiveTabId = newTabs[0].id;
        }
      }

      return {
        ...state,
        tabs: newTabs,
        activeTabId: newActiveTabId,
      };
    }

    case "SET_ACTIVE_TAB":
      return {
        ...state,
        activeTabId: action.payload,
      };

    case "CLEAR_ALL_TABS":
      return {
        ...state,
        tabs: [],
        activeTabId: null,
      };

    default:
      return state;
  }
};

// Context oluştur
const TabContext = createContext<TabContextType | undefined>(undefined);

// Provider component
export const TabProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(tabReducer, initialState);
  const router = useRouter();
  const pathname = usePathname();

  // Helper functions
  const addTab = (tab: Omit<Tab, "id">) => {
    dispatch({ type: "ADD_TAB", payload: tab as Tab });
  };

  const removeTab = (tabId: string) => {
    dispatch({ type: "REMOVE_TAB", payload: tabId });
  };

  const setActiveTab = (tabId: string) => {
    dispatch({ type: "SET_ACTIVE_TAB", payload: tabId });
  };

  const clearAllTabs = () => {
    dispatch({ type: "CLEAR_ALL_TABS" });
  };

  // URL senkronizasyonu - aktif tab değiştiğinde URL'i güncelle
  useEffect(() => {
    if (!state.activeTabId) return;

    const activeTab = state.tabs.find((tab) => tab.id === state.activeTabId);

    if (activeTab && pathname !== activeTab.path) {
      router.replace(activeTab.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeTabId, state.tabs]); // Sadece activeTabId veya tabs değiştiğinde çalış

  // Pathname değiştiğinde aktif tab'ı güncelle - sadece manuel URL değişikliklerinde
  useEffect(() => {
    // Eğer pathname panel ile başlamıyorsa işlem yapma
    if (!pathname.startsWith("/panel/")) return;

    const matchingTab = state.tabs.find((tab) => tab.path === pathname);

    // Sadece farklı bir tab varsa ve şu anki aktif tab farklıysa değiştir
    if (matchingTab && state.activeTabId !== matchingTab.id) {
      dispatch({ type: "SET_ACTIVE_TAB", payload: matchingTab.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // Sadece pathname değiştiğinde çalış

  return (
    <TabContext.Provider
      value={{
        state,
        dispatch,
        addTab,
        removeTab,
        setActiveTab,
        clearAllTabs,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

// Hook
export const useTab = () => {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
};

export default TabContext;
