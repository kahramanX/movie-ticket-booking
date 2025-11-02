"use client";

import { useState, useRef, useEffect } from "react";
import { useTab } from "@/contexts/tabContext";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export const TabBar = () => {
  const { state, removeTab, setActiveTab } = useTab();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollability);
    window.addEventListener("resize", checkScrollability);

    // MutationObserver ile tab değişikliklerini dinle
    const observer = new MutationObserver(checkScrollability);
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      container.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
      observer.disconnect();
    };
  }, [state.tabs]);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200; // Her scroll'da 200px kaydır
    const currentScroll = container.scrollLeft;
    const newScroll =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    container.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    removeTab(tabId);
  };

  if (state.tabs.length === 0) {
    return null;
  }

  return (
    <div className="border-b-2 bg-background relative">
      {/* Sol scroll ikonu */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 flex items-center bg-background/20 backdrop-blur-sm z-10 px-1 rounded-full">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-muted"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Tab container */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-1 overflow-x-auto scroll-smooth px-2 md:px-4 py-1 hide-scrollbar"
      >
        {state.tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-t-md transition-colors flex-shrink-0 min-w-fit",
              tab.id === state.activeTabId
                ? "bg-primary/30 border-primary text-primary"
                : "bg-muted/50 border-transparent hover:bg-muted",
            )}
          >
            <button
              onClick={() => handleTabClick(tab.id)}
              className="text-left text-xs md:text-sm font-medium truncate flex items-center gap-1"
            >
              {tab.path === "/panel" && (
                <Home className="h-4 w-4 flex-shrink-0" />
              )}
              {tab.title}
            </button>

            {tab.closable && (
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 flex-shrink-0 hover:bg-destructive/20 hover:text-white"
                onClick={(e) => handleTabClose(e, tab.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Sağ scroll ikonu */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center bg-background/20 backdrop-blur-sm z-10 px-1 rounded-full">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-muted"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TabBar;
