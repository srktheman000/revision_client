// components/ChatMessage.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import TimelineCard from "./TimeLineCard";
import InteractiveList from "./InteractiveList";
import KnowledgeTest from "./KnowledgeTest";
import SummaryCard from "./SummaryCard";

interface ChatMessageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any;
  onQuizAnswer?: (messageId: string, answerId: string) => void;
  onSummaryPointToggle?: (messageId: string, pointId: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onQuizAnswer,
  onSummaryPointToggle,
}) => {
  const messageAlignment = message.isUser ? "justify-end" : "justify-start";

  const renderMessageContent = () => {
    switch (message.type) {
      case "timeline":
        return <TimelineCard events={message.content.events} />;

      case "list":
        return <InteractiveList items={message.content.items} />;

      case "quiz":
        return (
          <KnowledgeTest
            question={message.content}
            onAnswer={
              onQuizAnswer
                ? (answerId) => onQuizAnswer(message.id, answerId)
                : undefined
            }
            isAnswered={message.isAnswered}
          />
        );

      case "summary":
        return (
          <SummaryCard
            content={message.content}
            onToggle={
              onSummaryPointToggle
                ? (pointId) => onSummaryPointToggle(message.id, pointId)
                : undefined
            }
          />
        );

      case "text":
      default:
        return (
          <Card
            className={`max-w-[80%] ${
              message.isUser ? "bg-none" : "bg-muted"
            } hover:bg-secondary/90 transition-colors`}
          >
            <CardContent className="p-3">
              <p className="text-foreground">{message.content}</p>
              {message.timestamp && (
                <span className="text-xs text-muted-foreground mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              )}
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div
      className={`flex ${messageAlignment} mb-4 mx-4 ${
        message.type !== "text" ? "w-full" : ""
      }`}
    >
      {renderMessageContent()}
    </div>
  );
};

export default ChatMessage;
