import { cn } from "@/lib/utils";

interface SectionChipProps {
  section: string;
  isActive: boolean;
  onClick: () => void;
}

const SectionChip: React.FC<SectionChipProps> = ({
  section,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-md text-sm transition-all text-left",
      "border border-zinc-800 hover:border-zinc-700",
      "bg-zinc-900/50 hover:bg-zinc-900",
      isActive && "border-zinc-700 bg-zinc-900 ring-1 ring-zinc-700"
    )}
  >
    <span className="line-clamp-2">{section}</span>
  </button>
);

export default SectionChip;
