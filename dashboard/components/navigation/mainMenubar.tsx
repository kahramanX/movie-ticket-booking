"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MenuContent } from "./menuContent";
import { useLanguage } from "@/contexts/languageContext";
import { menuConfig } from "@/config/menuConfig";
import { Home, Menu } from "lucide-react";

export const MainMenubar = () => {
  const { t } = useLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Config'den menü verilerini al ve çevir
  const menuSections = menuConfig.map((section) => ({
    title: t(section.title),
    items: section.items.map((item) => ({
      label: t(item.label),
      href: item.href,
      onClick: item.onClick,
    })),
  }));

  return (
    <>
      {/* Desktop Menubar - md ve üzeri ekranlar için */}
      <div className="hidden md:block">
        <Menubar>
          <MenubarMenu>
            <Link className="cursor-pointer" href="/panel">
              <MenubarTrigger className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                {menuSections[0].title}
              </MenubarTrigger>
            </Link>
          </MenubarMenu>

          {/* Diğer menü bölümleri */}
          {menuSections.slice(1).map((section, sectionIndex) => (
            <MenubarMenu key={sectionIndex}>
              <MenubarTrigger>{section.title}</MenubarTrigger>
              <MenubarContent>
                {section.items.map((item, itemIndex) => (
                  <MenubarItem key={itemIndex} asChild>
                    {item.href ? (
                      <Link href={item.href}>{item.label}</Link>
                    ) : (
                      <div onClick={item.onClick}>{item.label}</div>
                    )}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          ))}
        </Menubar>
      </div>

      {/* Mobile Drawer - md altı ekranlar için */}
      <div className="md:hidden">
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <Menu className="h-4 w-4" />
              <span>{t("Menu")}</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent side="bottom" className="h-[80vh]">
            <div className="px-4 pb-4 overflow-y-auto max-h-full">
              <MenuContent onItemClick={() => setIsDrawerOpen(false)} />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default MainMenubar;
