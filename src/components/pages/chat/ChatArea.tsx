"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// import { Textarea } from "@/components/ui/textarea";
import { MessageType } from "@/types";
import sampleChatData from "@/lib/sampleChatData";
import ChatMessage from "./ChatMessage";

interface ChatAreaProps {
  initialMessages?: MessageType[];
  onSendMessage?: (message: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  initialMessages = sampleChatData,
  onSendMessage,
}) => {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = useCallback(() => {
    if (inputValue.trim()) {
      const newMessage = {
        id: (messages.length + 1).toString(),
        type: "text",
        content: inputValue,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);

      // Call external handler if provided
      if (onSendMessage) {
        onSendMessage(inputValue);
      }

      setInputValue("");
    }
  }, [inputValue, messages.length, onSendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="w-full min-h-[600px] h-full flex flex-col m-4 relative bg-zinc-950 border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-zinc-100">Chat</CardTitle>
      </CardHeader>
      <Separator className="bg-zinc-800" />
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="h-[calc(100vh-180px)] overflow-x-hidden">
          <div className="space-y-4 pt-4 px-4 pb-20">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800 bg-zinc-950">
          <div className="flex items-center">
            <div className="flex w-full items-center">
              <div className="flex w-full flex-col gap-1.5 rounded-lg bg-zinc-900 p-1.5 transition-colors">
                <div className="flex items-center gap-1.5 md:gap-2 pl-4">
                  <div className="flex min-w-0 flex-1 flex-col"></div>
                  <Button
                    disabled={!inputValue.trim()}
                    data-testid="send-button"
                    size="icon"
                    variant="secondary"
                    className="size-8 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 disabled:bg-zinc-900 disabled:text-zinc-700"
                    onClick={handleSend}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatArea;
