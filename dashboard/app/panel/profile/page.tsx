"use client";

import { useEffect } from "react";
import { useTab } from "@/contexts/tabContext";
import { pageComponents } from "@/config/pageComponents";

export default function Profile() {
  const { addTab } = useTab();

  useEffect(() => {
    const pageConfig = pageComponents["profile"];
    
    if (pageConfig) {
      addTab({
        title: pageConfig.title,
        path: "/panel/profile",
        content: pageConfig.component,
        closable: true,
      });
    }
  }, [addTab]);

  // Tab eklendikten sonra TabContent içeriği gösterilecek
  return null;
}
