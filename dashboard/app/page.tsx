"use client";

import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{t("dashboard.title")}</Badge>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t("common.welcome")}</h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t("dashboard.description")}
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg">{t("common.add")}</Button>
              <Button variant="outline" size="lg">
                {t("common.search")}
              </Button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("movies.title")}</CardTitle>
                <CardDescription>
                  {t("movies.addMovie")} ve {t("movies.editMovie")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">{t("movies.addMovie")}</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("tickets.title")}</CardTitle>
                <CardDescription>
                  {t("tickets.bookTicket")} ve yönetim
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="secondary">
                  {t("tickets.bookTicket")}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("common.filter")}</CardTitle>
                <CardDescription>Gelişmiş arama ve filtreleme</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  {t("common.filter")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
