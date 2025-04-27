"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpCircle } from "lucide-react";
import apiClient from "@/lib/apiClient";
import type { ChatMessageType } from "./chatMessages";
import { ChatMessages } from "./chatMessages";

export function ChatSection() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const pageSize = 20;

  // Fetch messages (infinite scroll)
  const fetchMessages = useCallback(
    async (pageNum: number) => {
      if (!sessionId) return;
      setIsLoading(true);
      try {
        const res = await apiClient.get(`/session/get`, {
          params: { sessionId, page: pageNum, pageSize },
        });
        const data = res.data;
        if (data.success && data.data && Array.isArray(data.data.messages)) {
          if (pageNum === 1) {
            setMessages(data.data.messages.reverse()); // latest at bottom
          } else {
            setMessages((prev) => [...data.data.messages.reverse(), ...prev]);
          }
          setHasMore(data.data.pagination?.hasMore === true);
        } else {
          setHasMore(false);
        }
      } catch {
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId]
  );

  useEffect(() => {
    if (!sessionId) return;
    setPage(1);
    fetchMessages(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // Load more messages (older)
  const handleLoadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMessages(nextPage);
  }, [isLoading, hasMore, page, fetchMessages]);

  // Send new message
  const handleSend = async () => {
    if (!input.trim() || !sessionId) return;
    const newMsg: ChatMessageType = {
      id: Date.now(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      await apiClient.post("/session/updatemessage", {
        sessionId,
        role: "user",
        content: input,
      });
      // Optionally, refetch or update with assistant's response
    } catch {
      // Optionally handle error
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <ChatMessages
          messages={messages}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          isLoading={isLoading}
        />
      </div>
      <div className="p-4 border-t flex items-center gap-4">
        <Textarea
          placeholder="Type your message..."
          className="flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSend}
          disabled={!input.trim()}
        >
          <ArrowUpCircle className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
