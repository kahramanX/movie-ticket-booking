"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/languageContext";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated login - gerçek projede API çağrısı olacak
    console.log("Login attempt:", { email, password });

    // Basit validation (gerçek projede API'den gelecek)
    if (email && password) {
      // Simulated login delay
      setTimeout(() => {
        // Auth token'ı cookie'ye set et (gerçek projede JWT token olacak)
        document.cookie = "auth-token=valid-token; path=/; max-age=86400"; // 24 saat

        setIsLoading(false);

        // Panel sayfasına yönlendir
        router.push("/panel");
      }, 1000);
    } else {
      setIsLoading(false);
      alert("E-posta ve şifre gerekli!");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">{t("Login")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="space-y-2">
            <Label htmlFor="email">{t("Email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@sinema.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("Password")}</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t("Logging in") : t("Login")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
