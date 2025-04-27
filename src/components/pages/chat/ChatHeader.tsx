// /app/chat/[subjectid]/components/ChatHeader.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface ChatHeaderProps {
  toggleSidebar: () => void;
}

export function ChatHeader({ toggleSidebar }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="md:hidden"
      >
        <Menu className="w-6 h-6" />
      </Button>
      <h1 className="text-lg font-semibold">Chat with Assistant</h1>
      <div className="w-6" /> {/* Spacer */}
    </div>
  );
}
