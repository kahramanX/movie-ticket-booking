"use client";

import { useTab } from "@/contexts/tabContext";

export const TabContent = () => {
  const { state } = useTab();

  const activeTab = state.tabs.find((tab) => tab.id === state.activeTabId);

  if (!activeTab) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium">Hoş Geldiniz</p>
          <p className="text-sm">Menüden bir sayfa seçerek başlayın</p>
        </div>
      </div>
    );
  }

  const ContentComponent = activeTab.content;

  return (
    <div className="flex-1 overflow-auto">
      <ContentComponent />
    </div>
  );
};

export default TabContent;
