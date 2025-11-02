"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTab } from "@/contexts/tabContext";
import { pageComponents } from "@/config/pageComponents";

export default function BlogCategoryListPage() {
  const { addTab, state } = useTab();
  const pathname = usePathname();

  useEffect(() => {
    // Sadece pathname bu sayfaya aitse çalış
    if (pathname !== "/panel/blog-category-list") return;

    const pageConfig = pageComponents["blog-category-list"];
    const currentPath = "/panel/blog-category-list";

    // Eğer bu path'te zaten bir tab varsa, tekrar ekleme
    const existingTab = state.tabs.find((tab) => tab.path === currentPath);
    if (existingTab) {
      return;
    }

    // Eğer aktif tab farklı bir path'e aitse, URL güncelleniyor olabilir, tab ekleme
    const activeTab = state.tabs.find((tab) => tab.id === state.activeTabId);
    if (activeTab && activeTab.path !== currentPath) {
      return;
    }

    if (pageConfig) {
      addTab({
        title: pageConfig.title,
        path: currentPath,
        content: pageConfig.component,
        closable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // Sadece pathname değiştiğinde çalış

  // Tab eklendikten sonra TabContent içeriği gösterilecek
  return null;
}
