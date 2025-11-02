"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/themeContext";
import { useLanguage } from "@/contexts/languageContext";
import { useTab } from "@/contexts/tabContext";
import { pageComponents } from "@/config/pageComponents";
import { User, Settings, LogOut, Sun, Moon, Languages } from "lucide-react";

export const UserDropdown = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { state, dispatch, t } = useLanguage();
  const { addTab } = useTab();

  const handleProfileClick = () => {
    // Profile tab'ını aç
    const pageConfig = pageComponents["profile"];
    if (pageConfig) {
      addTab({
        title: pageConfig.title,
        path: "/panel/profile",
        content: pageConfig.component,
        closable: true,
      });
    }
  };

  const handleLogout = () => {
    // Cookie'yi sil
    document.cookie = "auth-token=; path=/; max-age=0";

    // Login sayfasına yönlendir
    router.push("/login");
  };

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "light" : "dark");
  };

  const handleLanguageChange = (lang: "tr" | "en") => {
    dispatch({ type: "SET_LANGUAGE", payload: lang });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Timur Kahraman</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleProfileClick}
        >
          <div className="flex items-center gap-2">
            <Settings className="mr-2 h-4 w-4" />
            <span>{t("Profile")}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* Dil Seçimi */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer">
            <Languages className="mr-2 h-4 w-4" />
            <span>{t("Language")}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleLanguageChange("tr")}
            >
              🇹🇷 {t("Turkish")} {state.currentLanguage === "tr" && "✓"}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleLanguageChange("en")}
            >
              🇺🇸 {t("English")} {state.currentLanguage === "en" && "✓"}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <div className="flex items-center justify-start px-2 py-2">
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
          </div>
          <Switch
            checked={theme === "light"}
            onCheckedChange={handleThemeToggle}
            className="mx-4"
          />
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("Logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
