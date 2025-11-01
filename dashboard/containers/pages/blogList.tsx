"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/languageContext";
import { FileText, Calendar, User } from "lucide-react";

export const BlogListPage = () => {
  const { t } = useLanguage();

  // Dummy blog data
  const blogs = [
    {
      id: 1,
      title: "Yeni Film Gösterimleri",
      excerpt: "Bu hafta vizyona giren yeni filmler hakkında detaylı bilgiler...",
      author: "Admin",
      date: "2024-01-15",
      category: "Filmler",
      status: "published"
    },
    {
      id: 2,
      title: "Sinema Salonu Yenileme Çalışmaları",
      excerpt: "1. salon ses sistemi ve koltuk yenileme çalışmaları tamamlandı...",
      author: "Teknik Ekip",
      date: "2024-01-12",
      category: "Haberler",
      status: "published"
    },
    {
      id: 3,
      title: "Özel Gösterim Etkinlikleri",
      excerpt: "Klasik film gösterimleri ve özel etkinlik programları...",
      author: "Etkinlik Koordinatörü",
      date: "2024-01-10",
      category: "Etkinlikler",
      status: "draft"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Listesi</h1>
          <p className="text-muted-foreground">Tüm blog yazılarını yönetin</p>
        </div>
      </div>

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <Card key={blog.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {blog.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">{blog.excerpt}</p>
                </div>
                <Badge variant={blog.status === 'published' ? 'default' : 'secondary'}>
                  {blog.status === 'published' ? 'Yayında' : 'Taslak'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {blog.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {blog.date}
                </div>
                <Badge variant="outline" className="text-xs">
                  {blog.category}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogListPage;
