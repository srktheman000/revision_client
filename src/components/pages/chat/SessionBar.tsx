import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";

const SessionBar = React.memo(
  ({
    session,
    onClick,
    onDelete,
  }: {
    session: { sessionId: string; title: string };
    onClick: () => void;
    onDelete: () => void;
  }) => {
    // Function to handle click on the session bar

    return (
      <div
        className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
        onClick={onClick}
      >
        <span>{session.title}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    );
  }
);

SessionBar.displayName = "SessionBar";

export default SessionBar;
