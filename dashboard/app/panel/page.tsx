"use client";

import { useEffect } from "react";
import { useTab } from "@/contexts/tabContext";
import { pageComponents } from "@/config/pageComponents";

export default function PanelPage() {
  const { addTab } = useTab();

  useEffect(() => {
    const pageConfig = pageComponents[""];

    if (pageConfig) {
      addTab({
        title: pageConfig.title,
        path: "/panel",
        content: pageConfig.component,
        closable: true,
      });
    }
  }, [addTab]);

  // Tab eklendikten sonra TabContent içeriği gösterilecek
  return null;
}
