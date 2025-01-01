"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Settings } from "lucide-react";

interface StudentHeaderProps {
  name: string;
  avatarUrl?: string;
}

const StudentHeader = ({ name, avatarUrl }: StudentHeaderProps) => {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between ">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">Welcome back,</h2>
              <p className="text-xl font-bold">{name}!</p>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <Button variant="ghost" size="icon">
              <Bell className="h-8 w-8" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
