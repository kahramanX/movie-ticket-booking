"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/languageContext";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  const { t } = useLanguage();
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/panel");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">404</CardTitle>
          <p className="text-muted-foreground text-lg">{t("Page Not Found")}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {t("The page you are looking for does not exist")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="default">
              <Link href="/panel" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                {t("Go to Dashboard")}
              </Link>
            </Button>

            <Button
              variant="outline"
              onClick={handleGoBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("Go Back")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
