"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useTab } from "@/contexts/tabContext";

interface TabContentProps {
  children?: ReactNode;
}

export const TabContent = ({ children }: TabContentProps) => {
  const { state } = useTab();
  const pathname = usePathname();

  const activeTab = state.tabs.find((tab) => tab.id === state.activeTabId);

  // Eğer aktif tab varsa VE pathname o tab'ın path'i ile eşleşiyorsa, tab içeriğini göster
  if (activeTab && activeTab.path === pathname) {
    const ContentComponent = activeTab.content;
    return (
      <div className="flex-1 overflow-auto">
        <ContentComponent />
      </div>
    );
  }

  // Normal sayfalar için children göster (profile, vb.)
  if (children) {
    return <div className="flex-1 overflow-auto">{children}</div>;
  }

  // Hiçbiri yoksa welcome mesajı göster
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center text-muted-foreground">
        <p className="text-lg font-medium">Hoş Geldiniz</p>
        <p className="text-sm">Menüden bir sayfa seçerek başlayın</p>
      </div>
    </div>
  );
};

export default TabContent;
