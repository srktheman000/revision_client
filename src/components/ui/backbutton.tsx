"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface BackButtonProps {
  onBack?: () => Promise<void>;
  fallbackPath?: string;
}

const BackButton = ({ onBack, fallbackPath }: BackButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleBack = async () => {
    try {
      if (onBack) {
        await onBack();
      }

      startTransition(() => {
        if (fallbackPath) {
          router.push(fallbackPath);
        } else {
          router.back();
        }
      });
    } catch (error) {
      console.log("Error during back navigation:", error);
      router.back();
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute left-4 top-4 h-8 w-8 text-muted-foreground hover:text-foreground disabled:opacity-50"
      onClick={handleBack}
      disabled={isPending}
      aria-label="Go back"
    >
      <ArrowLeft className={`h-5 w-5 ${isPending ? "opacity-50" : ""}`} />
    </Button>
  );
};

export default BackButton;
