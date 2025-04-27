// /app/chat/[subjectid]/components/ChatMessages.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";

export interface ChatMessageType {
  id: string | number;
  role: "user" | "assistant";
  content: string;
}

interface ChatMessagesProps {
  messages: ChatMessageType[];
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export function ChatMessages({
  messages,
  onLoadMore,
  hasMore,
  isLoading,
}: ChatMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Infinite scroll: load more when scrolled to top
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (container.scrollTop === 0 && hasMore && !isLoading) {
        onLoadMore();
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading, onLoadMore]);

  // Scroll to bottom on new messages
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={containerRef} className="space-y-4 h-full overflow-y-auto">
      {isLoading && (
        <div className="text-center text-xs text-gray-400">Loading...</div>
      )}
      {messages.length > 0 ? (
        messages.map((msg, idx) => (
          <ChatMessage
            key={msg.id ?? idx}
            role={msg.role}
            content={msg.content}
          />
        ))
      ) : (
        <div className="text-center text-xs text-gray-400">No messages yet</div>
      )}
    </div>
  );
}
