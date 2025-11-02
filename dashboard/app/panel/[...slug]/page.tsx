"use client";

import { useEffect, use } from "react";
import { useTab } from "@/contexts/tabContext";
import { pageComponents } from "@/config/pageComponents";

interface DynamicPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default function DynamicPage({ params }: DynamicPageProps) {
  const { addTab } = useTab();

  // Next.js 16: params bir Promise, React.use() ile unwrap et
  const { slug: slugArray } = use(params);
  const slug = slugArray.join("/");

  useEffect(() => {
    // URL'e göre component ve tab bilgilerini al
    const pageConfig = pageComponents[slug];

    if (pageConfig) {
      // Path oluştur: boş slug ise "/panel", değilse "/panel/{slug}"
      const path = slug === "" ? "/panel" : `/panel/${slug}`;

      // Tab'ı ekle - reducer içinde zaten activeTabId ayarlanıyor
      // Tab eklendiğinde URL senkronizasyonu useEffect'i zaten URL'yi güncelleyecek
      addTab({
        title: pageConfig.title,
        path: path,
        content: pageConfig.component,
        closable: true,
      });
    }
  }, [slug, addTab]);

  // Bu component aslında render edilmez, sadece tab ekleme için kullanılır
  // TabContent component'i gerçek içeriği render eder
  return null;
}
