"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useTab } from "@/contexts/tabContext";
import { menuConfig } from "@/config/menuConfig";
import { pageComponents } from "@/config/pageComponents";
import { Home, Menu } from "lucide-react";

export const MainMenubar = () => {
  const { t } = useLanguage();
  const { addTab } = useTab();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  interface MenuItemType {
    label: string;
    href?: string;
    onClick?: () => void;
    openInTab?: boolean;
    tabTitle?: string;
  }

  const handleHomeClick = () => {
    // /panel için tab aç
    const pageConfig = pageComponents[""];
    if (pageConfig) {
      addTab({
        title: pageConfig.title,
        path: "/panel",
        content: pageConfig.component,
        closable: true,
      });
    }
  };

  // Menu item click handler
  const handleMenuClick = (
    item: MenuItemType,
    originalItem: MenuItemType,
  ) => {
    if (originalItem.openInTab && item.href) {
      // URL'den slug'ı çıkar
      const slug = item.href.replace("/panel/", "");
      const pageConfig = pageComponents[slug];

      if (pageConfig) {
        addTab({
          title: originalItem.tabTitle || pageConfig.title,
          path: item.href,
          content: pageConfig.component,
          closable: true,
        });
      }
    }
  };

  // Config'den menü verilerini al ve çevir
  const menuSections = menuConfig.map((section) => ({
    title: t(section.title),
    items: section.items.map((item) => ({
      label: t(item.label),
      href: item.href,
      onClick: item.onClick,
      openInTab: item.openInTab,
      tabTitle: item.tabTitle,
    })),
  }));

  return (
    <>
      {/* Desktop Menubar - md ve üzeri ekranlar için */}
      <div className="hidden md:block">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleHomeClick}
            >
              <Home className="h-4 w-4" />
              {menuSections[0].title}
            </MenubarTrigger>
          </MenubarMenu>

          {/* Diğer menü bölümleri */}
          {menuSections.slice(1).map((section, sectionIndex) => (
            <MenubarMenu key={sectionIndex}>
              <MenubarTrigger>{section.title}</MenubarTrigger>
              <MenubarContent>
                {section.items.map((item, itemIndex) => {
                  const originalItem =
                    menuConfig[sectionIndex + 1].items[itemIndex];

                  return (
                    <MenubarItem key={itemIndex}>
                      {item.openInTab ? (
                        <div
                          className="cursor-pointer w-full"
                          onClick={() => handleMenuClick(item, originalItem)}
                        >
                          {item.label}
                        </div>
                      ) : item.href ? (
                        <Link href={item.href}>{item.label}</Link>
                      ) : (
                        <div onClick={item.onClick}>{item.label}</div>
                      )}
                    </MenubarItem>
                  );
                })}
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
