"use client";

import { useEffect } from "react";
import { useTab } from "@/contexts/tabContext";
import { pageComponents } from "@/config/pageComponents";

interface DynamicPageProps {
  params: {
    slug: string[];
  };
}

export default function DynamicPage({ params }: DynamicPageProps) {
  const { addTab } = useTab();
  const slug = params.slug.join("/");

  useEffect(() => {
    // URL'e göre component ve tab bilgilerini al
    const pageConfig = pageComponents[slug];

    if (pageConfig) {
      // Tab'ı ekle
      addTab({
        title: pageConfig.title,
        path: `/panel/${slug}`,
        content: pageConfig.component,
        closable: true,
      });
    }
  }, [slug, addTab]);

  // Bu component aslında render edilmez, sadece tab ekleme için kullanılır
  // TabContent component'i gerçek içeriği render eder
  return null;
}
