// /app/chat/[subjectid]/components/Layout.tsx
"use client";

import { ChatHeader } from "@/components/pages/chat/ChatHeader";
import { Sidebar } from "@/components/pages/chat/Sidebar";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <ChatHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Inject Chat Section here */}
        <div className="flex-1 overflow-hidden h-full">{children}</div>
      </div>
    </div>
  );
}
