"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/languageContext";
import { menuConfig } from "@/config/menuConfig";
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
  }>;
  onItemClick?: () => void;
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
}: MenuSectionProps) => {
  return (
    <div className="space-y-1">
      <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
        {title}
      </div>
      {items.map((item, index) => (
        <MenuItem
          key={index}
          href={item.href}
          onClick={() => {
            item.onClick?.();
            onItemClick?.();
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
    <div className="space-y-6">
      {/* Dashboard Link - Öne çıkarılmış */}
      <div className="text-center">
        <MenuItem
          href="/panel"
          icon={<Home className="h-5 w-5" />}
          className="font-medium text-lg justify-center bg-primary/10 hover:bg-primary/20 py-3"
          onClick={onItemClick}
        >
          {""}
        </MenuItem>
      </div>

      {/* Grid Layout - Mobile için 2 sütun */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {menuSections.slice(1).map((section, index) => (
          <MenuSection
            key={index}
            title={section.title}
            items={section.items}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuContent;
