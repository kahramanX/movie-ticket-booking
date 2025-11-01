"use client";

import { LoginForm } from "@/containers/login";
import { useLanguage } from "@/contexts/languageContext";

export default function LoginPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{t("Member Login")}</h1>
          <p className="text-muted-foreground mt-2">
            {t("Cinema Admin Panel Welcome")}
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
