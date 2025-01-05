import React, { useState, useCallback } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ChatMessage from "./ChatMessage";
import sampleChatData from "@/lib/sampleChatData";
import { MessageType } from "@/types";

const ChatArea = () => {
  const [messages, setMessages] = useState<MessageType[]>(sampleChatData);

  const [inputValue, setInputValue] = useState("");
  const handleSend = useCallback(() => {
    if (inputValue.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          type: "text",
          content: inputValue,
          isUser: true,
          timestamp: new Date(),
        },
      ]);
      setInputValue("");
    }
  }, [inputValue]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const handleQuizAnswer = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isAnswered: true } : msg
      )
    );
  };

  //   const handleSummaryPointToggle = (messageId: string, pointId: string) => {
  //     setMessages((prev) =>
  //       prev.map((msg) =>
  //         msg.id === messageId
  //           ? {
  //               ...msg,
  //               content: {
  //                 ...msg.content,
  //                 points: msg.content.points.map(
  //                   (point: { id: string; isToggled: boolean }) =>
  //                     point.id === pointId
  //                       ? { ...point, isToggled: !point.isToggled }
  //                       : point
  //                 ),
  //               },
  //             }
  //           : msg
  //       )
  //     );
  //   };

  const handleSummaryPointToggle = () => {};

  return (
    <Card className="w-full min-h-[600px] h-full flex flex-col m-4 relative">
      <CardHeader className="pb-2">
        <CardTitle className="text-zinc-100">Chat</CardTitle>
      </CardHeader>
      <Separator className="bg-zinc-800" />
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea
          className="h-[calc(100vh-180px)] overflow-x-hidden px-4"
          style={{
            scrollbarWidth: "thin",
          }}
        >
          <div className="p-4 space-y-4 pb-20">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onQuizAnswer={handleQuizAnswer}
                onSummaryPointToggle={handleSummaryPointToggle}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800 bg-zinc-950">
          <div className="flex gap-2 max-w-full justify-center items-center">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-zinc-900 border-zinc-800 text-zinc-100 
                placeholder:text-zinc-500 focus-visible:ring-zinc-700"
              placeholder="Type your message..."
            />
            <Button
              size="icon"
              variant="secondary"
              className="bg-zinc-800 hover:bg-zinc-700 shrink-0 m-4 p-4"
              onClick={handleSend}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatArea;
