"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
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
import {
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  Home,
  Languages,
} from "lucide-react";

export const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { state, dispatch } = useLanguage();

  const handleLogout = () => {
    // Cookie'yi sil
    document.cookie = "auth-token=; path=/; max-age=0";

    // Login sayfasına yönlendir
    router.push("/login");
  };

  const handleProfile = () => {
    // TODO: Profile sayfasına yönlendirme
    console.log("Profile sayfasına git");
  };

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "light" : "dark");
  };

  const handleLanguageChange = (lang: "tr" | "en") => {
    dispatch({ type: "SET_LANGUAGE", payload: lang });
  };
  return (
    <header className="border-b bg-background shadow-sm">
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Menubar - Sol taraf */}
          <Menubar>
            <MenubarMenu>
              <Link className="cursor-pointer" href="/panel">
                <MenubarTrigger className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                </MenubarTrigger>
              </Link>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Filmler</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Film Listesi</MenubarItem>
                <MenubarItem>Yeni Film Ekle</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Sinemalar</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Sinema Listesi</MenubarItem>
                <MenubarItem>Yeni Sinema Ekle</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Salon Yönetimi</MenubarItem>
                <MenubarItem>Koltuk Düzeni</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Rezervasyonlar</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Rezervasyon Listesi</MenubarItem>
                <MenubarItem>Yeni Rezervasyon</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Kullanıcılar</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Yönetici Listesi</MenubarItem>
                <MenubarItem>Kullanıcı Listesi</MenubarItem>
                <MenubarItem>Yeni Müşteri</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Bloglar</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Blog Listesi</MenubarItem>
                <MenubarItem>Blog Kategoriler</MenubarItem>
                <MenubarItem>Blog Etiketleri</MenubarItem>
                <MenubarItem>Yeni Blog</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          {/* Kullanıcı Dropdown - Sağ taraf */}
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
                onClick={handleProfile}
              >
                <Link href="/panel/profile" className="flex items-center gap-2">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              {/* Dil Seçimi */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="cursor-pointer">
                  <Languages className="mr-2 h-4 w-4" />
                  <span>Dil</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleLanguageChange("tr")}
                  >
                    🇹🇷 Türkçe {state.currentLanguage === "tr" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleLanguageChange("en")}
                  >
                    🇺🇸 English {state.currentLanguage === "en" && "✓"}
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
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Çıkış Yap</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
