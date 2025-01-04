import { cn } from "@/lib/utils";
import { ChapterData } from "../pages/chat/Sidebar";
import { Badge } from "./badge";

interface ChapterChipProps {
  chapter: ChapterData;
  isActive: boolean;
  onClick: () => void;
}

const ChapterChip: React.FC<ChapterChipProps> = ({
  chapter,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={cn(
      "group relative w-full p-4 rounded-lg transition-all",
      "border border-zinc-800 hover:border-zinc-700",
      "bg-zinc-950 hover:bg-zinc-900",
      isActive && "border-zinc-700 bg-zinc-900 ring-1 ring-zinc-700"
    )}
  >
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-start gap-2">
        <span className="text-sm text-zinc-400">
          Chapter {chapter.chapter_number}
        </span>
        <Badge variant="outline" className="h-5 px-2 text-xs">
          {chapter.section_count} sections
        </Badge>
      </div>
      <h3 className="text-sm font-medium text-zinc-200 text-left line-clamp-2">
        {chapter.chapter_name}
      </h3>
    </div>
  </button>
);

export default ChapterChip;
