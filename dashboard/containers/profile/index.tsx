"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/languageContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Building,
} from "lucide-react";

export const ProfilePage = () => {
  const { t } = useLanguage();

  // Admin bilgileri (dummy data)
  const adminData = {
    name: "Timur Kahraman",
    email: "timur.kahraman@sinema.com",
    phone: "+90 532 123 45 67",
    role: t("System Administrator"),
    department: t("Information Technology"),
    location: t("Istanbul Turkey"),
    joinDate: t("January 15 2023"),
    employeeId: "ADM-2023-001",
    permissions: [
      t("All Permissions"),
      t("User Management"),
      t("System Settings"),
      t("Reporting"),
    ],
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {t("Profile Information")}
          </h1>
          <p className="text-muted-foreground">
            {t("You can view your account information")}
          </p>
        </div>

        {/* Profile Card */}
        <Card className="mb-6">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">{adminData.name}</CardTitle>
            <div className="flex justify-center gap-2 mt-2">
              <Badge variant="secondary">{adminData.role}</Badge>
              <Badge variant="outline">{adminData.department}</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Kişisel Bilgiler */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {t("Personal Information")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("Email")}</p>
                  <p className="font-medium">{adminData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("Phone")}</p>
                  <p className="font-medium">{adminData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("Location")}
                  </p>
                  <p className="font-medium">{adminData.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* İş Bilgileri */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                {t("Work Information")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("Employee ID")}
                  </p>
                  <p className="font-medium">{adminData.employeeId}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("Start Date")}
                  </p>
                  <p className="font-medium">{adminData.joinDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("Department")}
                  </p>
                  <p className="font-medium">{adminData.department}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Yetkiler */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {t("System Permissions")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {adminData.permissions.map((permission, index) => (
                <Badge key={index} variant="secondary">
                  {permission}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
