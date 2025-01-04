import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, CheckCircle } from "lucide-react";
import { SummaryMessage } from "@/types";

const SummaryCard: React.FC<{
  content: SummaryMessage["content"];
  onToggle?: (pointId: string) => void;
}> = ({ content }) => {
  return (
    <Card className="w-full bg-background border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="text-foreground font-medium">{content.title}</h3>
        </div>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-3">
            {content.points.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted"
              >
                <div className="mt-1">
                  {point.isComplete ? (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-foreground font-medium mb-1">
                    {point.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
