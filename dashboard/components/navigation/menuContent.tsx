"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/languageContext";
import { useTab } from "@/contexts/tabContext";
import { menuConfig } from "@/config/menuConfig";
import { pageComponents } from "@/config/pageComponents";
import { Home } from "lucide-react";

interface MenuItemProps {
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

interface MenuSectionProps {
  title: string;
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    openInTab?: boolean;
    tabTitle?: string;
  }>;
  onItemClick?: () => void;
  onMenuClick?: (
    item: { label: string; href?: string; onClick?: () => void },
    originalItem: { label: string; href?: string; onClick?: () => void },
  ) => void;
}

export const MenuItem = ({
  href,
  onClick,
  icon,
  children,
  className = "",
}: MenuItemProps) => {
  const baseClasses =
    "flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer";

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${className}`}
        onClick={onClick}
      >
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`} onClick={onClick}>
      {icon}
      {children}
    </div>
  );
};

export const MenuSection = ({
  title,
  items,
  onItemClick,
  onMenuClick,
}: MenuSectionProps) => {
  return (
    <div className="space-y-1">
      <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
        {title}
      </div>
      {items.map((item, index) => (
        <MenuItem
          key={index}
          href={item.openInTab ? undefined : item.href}
          onClick={() => {
            if (item.openInTab && onMenuClick) {
              onMenuClick(item, item);
            } else {
              item.onClick?.();
              onItemClick?.();
            }
          }}
        >
          {item.label}
        </MenuItem>
      ))}
    </div>
  );
};

export const MenuContent = ({ onItemClick }: { onItemClick?: () => void }) => {
  const { t } = useLanguage();
  const { addTab } = useTab();

  interface MenuItemType {
    label: string;
    href?: string;
    onClick?: () => void;
    openInTab?: boolean;
    tabTitle?: string;
  }

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
    } else if (item.onClick) {
      item.onClick();
    }

    // Drawer'ı kapat
    onItemClick?.();
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
    <div className="space-y-6">
      {/* Dashboard Link - Öne çıkarılmış */}
      <div className="text-center">
        <MenuItem
          icon={<Home className="h-5 w-5" />}
          className="font-medium text-lg justify-center bg-primary/10 hover:bg-primary/20 py-3"
          onClick={() => {
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
            onItemClick?.(); // Drawer'ı kapat
          }}
        >
          {""}
        </MenuItem>
      </div>

      {/* Grid Layout - Mobile için 2 sütun */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {menuSections.slice(1).map((section, sectionIndex) => {
          const originalSection = menuConfig[sectionIndex + 1];

          return (
            <MenuSection
              key={sectionIndex}
              title={section.title}
              items={section.items}
              onItemClick={onItemClick}
              onMenuClick={(item, originalItem) => {
                // Original item'ı config'den al
                const itemIndex = section.items.findIndex(
                  (sectionItem) => sectionItem.label === item.label,
                );
                const configItem = originalSection.items[itemIndex];
                handleMenuClick(item, configItem);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MenuContent;
