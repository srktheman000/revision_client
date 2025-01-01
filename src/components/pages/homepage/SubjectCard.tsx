"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SubjectCardProps {
  name: string;
  description?: string;
  icon: React.ReactNode;
  grade: string;
  imageUrl?: string;
  status?: "Start" | string;
  onClick?: () => void;
}

const defaultDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

const SubjectCard = ({
  name,
  description = defaultDescription,
  icon,
  grade,
  imageUrl,
  status = "Start",
  onClick,
}: SubjectCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden max-w-sm">
      <CardContent className="p-0">
        {/* Header Section */}
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                {icon}
              </div>
              <h3 className="font-semibold text-lg">{name}</h3>
            </div>
            <Badge variant="outline" className="text-xs font-medium">
              {grade}
            </Badge>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-48 bg-secondary">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${name} cover`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
              <div className="text-center px-4">
                <span className="block text-3xl mb-2">📚</span>
                <span className="text-sm text-muted-foreground">
                  Preview not available
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Description and Button Section */}
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {description}
            </p>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs py-2">
                12 Chapters
              </Badge>
            </div>
          </div>
          <Button
            onClick={onClick}
            className="w-full bg-primary hover:bg-primary/90 transition-colors"
          >
            {status}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
