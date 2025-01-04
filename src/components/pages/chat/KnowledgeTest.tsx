import { KnowledgeTestProps, QuizQuestion } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";

const KnowledgeTest: React.FC<KnowledgeTestProps> = ({ question }) => {
  const defaultQuestion: QuizQuestion = {
    text: "What's the most common way jellyfish use bioluminescence?",
    options: ["Defense against predators", "Attracting mates"],
  };

  const currentQuestion = question || defaultQuestion;

  return (
    <Card className="w-full bg-background border-border">
      <CardHeader className="flex flex-row items-center space-x-2">
        <BrainCircuit className="w-5 h-5 text-foreground" />
        <CardTitle className="text-foreground text-lg">
          Test Your Knowledge
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-foreground text-lg font-medium">
            {currentQuestion.text}
          </p>
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto py-4 px-6 bg-muted hover:bg-secondary border-border text-foreground"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KnowledgeTest;
