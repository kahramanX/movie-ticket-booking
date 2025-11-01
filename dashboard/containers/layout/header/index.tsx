"use client";

import { MainMenubar, UserDropdown } from "@/components/navigation";

export const Header = () => {
  return (
    <header className="border-b bg-background shadow-sm">
      <div className="mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Menubar - Sol taraf */}
          <MainMenubar />

          {/* Kullanıcı Dropdown - Sağ taraf */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
