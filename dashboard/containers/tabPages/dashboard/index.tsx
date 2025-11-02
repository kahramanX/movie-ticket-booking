"use client";

import { useLanguage } from "@/contexts/languageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Film,
  Users,
  Calendar,
  DollarSign,
  Database,
  Server,
  CheckCircle2,
  AlertCircle,
  Monitor,
  HardDrive,
  Cpu,
  Activity,
  Clock,
  Globe,
} from "lucide-react";

export const Dashboard = () => {
  const { t } = useLanguage();

  // Statik veriler - API entegrasyonu sonra yapılacak
  const stats = [
    {
      title: "Vizyondaki Filmler",
      value: "12",
      icon: Film,
    },
    {
      title: "Toplam Üye",
      value: "2,543",
      icon: Users,
    },
    {
      title: "Bugünkü Rezervasyonlar",
      value: "48",
      icon: Calendar,
    },
    {
      title: "Bu Ay Gelir",
      value: "₺45,230",
      icon: DollarSign,
    },
  ];

  const moviesInVision = [
    { id: 1, title: "The Matrix Reloaded", releaseDate: "2024-01-15" },
    { id: 2, title: "Inception", releaseDate: "2024-01-20" },
    { id: 3, title: "Interstellar", releaseDate: "2024-02-01" },
    { id: 4, title: "The Dark Knight", releaseDate: "2024-02-10" },
  ];

  const systemStatus = [
    // Client (Dashboard) Durumu
    {
      name: "Dashboard",
      category: "Client",
      status: "online" as const,
      icon: Monitor,
      value: "v1.0.0",
    },
    {
      name: "API Bağlantısı",
      category: "Client",
      status: "online" as const,
      icon: Globe,
      value: "Bağlı",
    },
    {
      name: "Build Version",
      category: "Client",
      status: "v1.0.0",
      icon: Activity,
      value: "v1.0.0",
    },
    // Server Durumu
    {
      name: "API Status",
      category: "Server",
      status: "online" as const,
      icon: Server,
      value: "Çalışıyor",
    },
    {
      name: "Response Time",
      category: "Server",
      status: "120ms",
      icon: Activity,
      value: "120ms",
    },
    {
      name: "Error Rate",
      category: "Server",
      status: "0.2%",
      icon: AlertCircle,
      value: "0.2%",
    },
    {
      name: "Uptime",
      category: "Server",
      status: "12 gün",
      icon: Clock,
      value: "12 gün",
    },
    // Database Durumu
    {
      name: "Database Connection",
      category: "Database",
      status: "online" as const,
      icon: Database,
      value: "Bağlı",
    },
    {
      name: "Query Performance",
      category: "Database",
      status: "45ms",
      icon: Activity,
      value: "45ms",
    },
    {
      name: "Connection Pool",
      category: "Database",
      status: "15/20",
      icon: Database,
      value: "15/20",
    },
    // Genel Sistem
    {
      name: "CPU Usage",
      category: "System",
      status: "32%",
      icon: Cpu,
      value: "32%",
    },
    {
      name: "Memory Usage",
      category: "System",
      status: "58%",
      icon: HardDrive,
      value: "58%",
    },
    {
      name: "Disk Usage",
      category: "System",
      status: "42%",
      icon: HardDrive,
      value: "42%",
    },
    {
      name: "Son Backup",
      category: "System",
      status: "2 saat önce",
      icon: Database,
      value: "2 saat önce",
    },
  ];

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6">
      {/* Başlık */}
      <div>
        <h1 className="text-3xl font-bold">{t("Home")}</h1>
        <p className="text-muted-foreground mt-1">
          Dashboard özeti ve istatistikler
        </p>
      </div>

      {/* 1. Özet İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 3. Vizyondaki Filmler ve 7. Sistem Durumu */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vizyondaki Filmler */}
        <Card>
          <CardHeader>
            <CardTitle>Vizyondaki Filmler</CardTitle>
            <CardDescription>Şu anda gösterimde olan filmler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moviesInVision.length > 0 ? (
                moviesInVision.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{movie.title}</p>
                      {movie.releaseDate && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(movie.releaseDate).toLocaleDateString(
                            "tr-TR",
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Vizyonda film bulunmuyor
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sistem Durumu */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Sistem Durumu</CardTitle>
            <CardDescription>Altyapı ve servis durumu</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <div className="h-[400px] overflow-y-auto pr-2 space-y-4 hide-scrollbar">
              {systemStatus.map((item, index) => {
                const Icon = item.icon;
                const isOnline = item.status === "online";
                const isStatusString =
                  typeof item.status === "string" &&
                  item.status !== "online" &&
                  item.status !== "offline";

                // Kategori başlıkları için gruplama
                const isNewCategory =
                  index === 0 ||
                  systemStatus[index - 1].category !== item.category;

                return (
                  <div key={index}>
                    {isNewCategory && (
                      <div className="mb-3 mt-2 first:mt-0">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          {item.category}
                        </p>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{item.name}</p>
                          {(isStatusString || item.value) && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                      {!isStatusString &&
                        (isOnline ? (
                          <Badge
                            variant="default"
                            className="bg-green-500 flex-shrink-0"
                          >
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Online
                          </Badge>
                        ) : (
                          <Badge
                            variant="destructive"
                            className="flex-shrink-0"
                          >
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Offline
                          </Badge>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Grafikler */}
      <Card>
        <CardHeader>
          <CardTitle>Rezervasyon İstatistikleri</CardTitle>
          <CardDescription>Son 7 günlük rezervasyon trendi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            {/* Chart component buraya eklenecek */}
            <p>Grafik buraya eklenecek (Recharts/Chart.js)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
