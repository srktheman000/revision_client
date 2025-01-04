import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  title: string;
  grade?: string;
  onBackClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ title, grade, onBackClick }) => (
  <div className="flex justify-between items-center p-4 bg-zinc-900 border-b border-zinc-800">
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        className="text-zinc-200 hover:bg-zinc-800"
        onClick={onBackClick}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2">
        <span className="text-lg font-medium text-zinc-200">{title}</span>
        {grade && <span className="text-sm text-zinc-400">{grade}</span>}
      </div>
    </div>
  </div>
);

export default TopBar;
