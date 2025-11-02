"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/languageContext";
import { Loader2 } from "lucide-react";

export default function Loading() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground text-center">
            {t("Loading")}
          </p>{" "}
        </CardContent>
      </Card>
    </div>
  );
}
