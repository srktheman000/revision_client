"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { GraduationCap, Users } from "lucide-react";
import { Role } from "@/types";

const RoleSelection: React.FC = () => {
  const handleRoleSelect = (role: Role): void => {
    redirect(`/login?role=${role}`);
  };

  return (
    <div>
      <div className="relative w-full max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-blue-400">I am</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button
            variant="outline"
            className="h-auto p-6 transition-all duration-200 border-blue-400/20 
                     hover:border-blue-400 hover:bg-blue-900/40 group"
            onClick={() => handleRoleSelect(Role.Student)}
          >
            <Card className="w-full space-y-4 bg-transparent border-0 shadow-none">
              <div
                className="mx-auto w-16 h-16 flex items-center justify-center bg-blue-500/10 
                          rounded-full transition-colors group-hover:bg-blue-800/50"
              >
                <GraduationCap className="w-8 h-8 text-blue-400 transition-colors group-hover:text-blue-300" />
              </div>
              <h2 className="text-2xl font-semibold text-blue-400 transition-colors group-hover:text-blue-300">
                Student
              </h2>
            </Card>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-6 transition-all duration-200 border-blue-400/20 
                     hover:border-blue-400 hover:bg-blue-900/40 group"
            onClick={() => handleRoleSelect(Role.Parent)}
          >
            <Card className="w-full space-y-4 bg-transparent border-0 shadow-none">
              <div
                className="mx-auto w-16 h-16 flex items-center justify-center bg-blue-500/10 
                          rounded-full transition-colors group-hover:bg-blue-800/50"
              >
                <Users className="w-8 h-8 text-blue-400 transition-colors group-hover:text-blue-300" />
              </div>
              <h2 className="text-2xl font-semibold text-blue-400 transition-colors group-hover:text-blue-300">
                Parent
              </h2>
            </Card>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
