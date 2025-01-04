import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import { TimelineCardProps, TimelineEvent } from "@/types";

const TimelineCard: React.FC<TimelineCardProps> = ({ events }) => {
  const defaultEvents: TimelineEvent[] = [
    {
      year: "600 AD",
      title: "Early Chinese Bonsai",
      image: "/api/placeholder/100/80",
    },
    {
      year: "1192 AD",
      title: "Bonsai in Japan",
      image: "/api/placeholder/100/80",
    },
    {
      year: "1800s",
      title: "Bonsai Spreads West",
      image: "/api/placeholder/100/80",
    },
    {
      year: "Present",
      title: "Global Art Form",
      image: "/api/placeholder/100/80",
    },
  ];

  const timelineEvents = events || defaultEvents;

  return (
    <Card className="w-full bg-background border-border">
      <CardHeader className="flex flex-row items-center space-x-2">
        <Clock className="w-5 h-5 text-foreground" />
        <CardTitle className="text-foreground text-lg">
          Interactive Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="min-w-[80px] text-sm font-medium text-muted-foreground">
                  {event.year}
                </div>
                <div className="relative flex-1">
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary" />
                  <div className="pl-6 border-l border-border">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="mb-2 rounded-lg w-full h-24 object-cover bg-muted"
                    />
                    <h4 className="text-foreground font-medium">
                      {event.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TimelineCard;
