"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/languageContext";
import { Folder, Plus, Edit, Trash2 } from "lucide-react";

export const BlogCategoriesPage = () => {
  const { t } = useLanguage();

  // Dummy category data
  const categories = [
    {
      id: 1,
      name: "Filmler",
      description: "Yeni çıkan filmler ve film incelemeleri",
      postCount: 15,
      color: "bg-blue-500",
      createdAt: "2024-01-01"
    },
    {
      id: 2,
      name: "Haberler",
      description: "Sinema ve sektör haberleri",
      postCount: 8,
      color: "bg-green-500",
      createdAt: "2024-01-05"
    },
    {
      id: 3,
      name: "Etkinlikler",
      description: "Özel gösterimler ve etkinlik duyuruları",
      postCount: 12,
      color: "bg-purple-500",
      createdAt: "2024-01-10"
    },
    {
      id: 4,
      name: "Teknoloji",
      description: "Sinema teknolojileri ve yenilikler",
      postCount: 5,
      color: "bg-orange-500",
      createdAt: "2024-01-12"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Kategorileri</h1>
          <p className="text-muted-foreground">Blog kategorilerini yönetin ve düzenleyin</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Yeni Kategori
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${category.color}`} />
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Folder className="h-5 w-5" />
                      {category.name}
                    </CardTitle>
                  </div>
                </div>
                <Badge variant="secondary">
                  {category.postCount} yazı
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                {category.description}
              </p>
              
              <div className="text-xs text-muted-foreground">
                Oluşturulma: {category.createdAt}
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Edit className="h-3 w-3" />
                  Düzenle
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1 text-destructive hover:text-destructive">
                  <Trash2 className="h-3 w-3" />
                  Sil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogCategoriesPage;
