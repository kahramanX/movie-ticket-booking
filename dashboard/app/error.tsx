"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/languageContext";
import { RefreshCw, Home, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    // Hata loglama (production'da external service'e gönderilebilir)
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">500</CardTitle>
          <p className="text-muted-foreground text-lg">
            {t("Internal Server Error")}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {t("Something went wrong on our end")}
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="text-left bg-muted p-3 rounded-md text-sm">
              <p className="font-semibold text-destructive mb-2">Debug Info:</p>
              <p className="text-muted-foreground break-all">{error.message}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={reset} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              {t("Try Again")}
            </Button>

            <Button asChild variant="outline">
              <Link href="/panel" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                {t("Go to Dashboard")}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
