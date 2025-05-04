// /app/chat/[subjectid]/components/ChatMessages.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { getComponent } from "@/lib/ai/config/components-mapping";

export type FunctionCallStatus = "in_progress" | "completed" | "error";

export interface FunctionCall {
  type: "function_call";
  status: FunctionCallStatus;
  id: string;
  name: string;
  arguments: string;
  parsedArguments: any;
  output: string | null;
}

export interface ChatMessageType {
  id: string | number;
  role: "user" | "assistant";
  content: string | Record<string, any>;
  isLoadingMessage?: boolean;
  messageType?: "generate_ui" | "text" | "error";
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
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      )}
      {messages.map((message, idx) => {
        console.log("Rendering message:", message.messageType);
        if (message.messageType === "generate_ui") {
          const component = (message.content as any).component;
          // Show loading spinner if component is not yet parsed (streaming) or getComponent returns null
          const renderedComponent = component ? getComponent(component) : null;
          if (!component || !renderedComponent) {
            return (
              <div
                key={message.id || `msg-${idx}`}
                className="rounded-md px-2 py-1 max-w-[90%] bg-[#000028]/[0.1] border flex items-center gap-2"
              >
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary inline-block mr-2"></span>
                <span className="text-xs text-muted-foreground">
                  Loading component...
                </span>
              </div>
            );
          }
          return (
            <div
              key={message.id || `msg-${idx}`}
              className="rounded-md px-2 py-1 max-w-[90%] bg-[#000028]/[0.1] border"
            >
              {renderedComponent}
            </div>
          );
        }
        return (
          <ChatMessage
            key={message.id || `msg-${idx}`}
            role={message.role}
            content={
              typeof message.content === "string"
                ? message.content
                : JSON.stringify(message.content)
            }
          />
        );
      })}
    </div>
  );
}
