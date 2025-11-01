"use client";

import { useTab } from "@/contexts/tabContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const TabBar = () => {
  const { state, removeTab, setActiveTab } = useTab();

  if (state.tabs.length === 0) {
    return null;
  }

  return (
    <div className="border-b bg-background">
      <div className="flex items-center px-4 py-2 gap-1 overflow-x-auto">
        {state.tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-t-md border-b-2 transition-colors min-w-0 max-w-48",
              tab.id === state.activeTabId
                ? "bg-primary/10 border-primary text-primary"
                : "bg-muted/50 border-transparent hover:bg-muted",
            )}
          >
            <button
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 text-left text-sm font-medium truncate hover:text-current"
            >
              {tab.title}
            </button>

            {tab.closable && (
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-destructive/20 hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
