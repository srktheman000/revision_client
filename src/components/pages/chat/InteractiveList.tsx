import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveListProps, ListItem } from "@/types";
import { BookOpen, ChevronRight } from "lucide-react";

const InteractiveList: React.FC<InteractiveListProps> = ({ items }) => {
  const defaultItems: ListItem[] = [
    {
      title: "Ancient Murals",
      description:
        "A mural from the Tang Dynasty depicts a servant carrying a potted landscape.",
      image: "/api/placeholder/100/80",
    },
    {
      title: "Literary References",
      description:
        'Chinese literature includes references to "pun-sai", the practice of growing dwarf trees.',
      image: "/api/placeholder/100/80",
    },
  ];

  const listItems = items || defaultItems;

  return (
    <Card className="w-full bg-background border-border">
      <CardHeader className="flex flex-row items-center space-x-2">
        <BookOpen className="w-5 h-5 text-foreground" />
        <CardTitle className="text-foreground text-lg">
          Interactive List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {listItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 rounded-lg bg-muted hover:bg-secondary transition-colors"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-16 rounded object-cover bg-muted"
              />
              <div className="flex-1">
                <h4 className="text-foreground font-medium mb-1">
                  {item.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground self-center" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveList;
