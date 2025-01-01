"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, LineChart } from "lucide-react";
import { Role } from "@/types";

const RoleSelection = () => {
  const handleRoleSelect = (role: Role): void => {
    window.location.href = `/login?role=${role}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-blue-900 flex items-center justify-center">
      <div className="container px-6 py-8 mx-auto max-w-7xl">
        <div className="relative z-10 text-center space-y-8   mb-16 md:mb-64">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-950 dark:text-white">
              Welcome to
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent ml-3">
                RevisionMaster
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-blue-950/80 dark:text-blue-100">
              Your personalized learning companion
            </p>
            <p className="text-lg text-blue-800 dark:text-blue-200 max-w-2xl mx-auto">
              Choose your role to begin the journey
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-64 gap-y-8 max-w-5xl mx-auto">
          {/* Student Card */}
          <Button
            variant="outline"
            className="group h-auto p-8 md:p-12 transition-all duration-300 border-2 rounded-xl 
                     hover:scale-105 hover:shadow-xl border-blue-200 dark:border-blue-700
                     hover:border-blue-400 dark:hover:border-blue-500 bg-white/50 dark:bg-blue-900/50
                     backdrop-blur-sm"
            onClick={() => handleRoleSelect(Role.Student)}
          >
            <Card className="w-full space-y-8 bg-transparent border-0 shadow-none">
              <div
                className="mx-auto w-24 h-24 md:w-32 md:h-32 flex items-center justify-center 
              bg-blue-100 dark:bg-blue-800/50 rounded-full 
              transition-transform duration-300 group-hover:rotate-6"
              >
                <GraduationCap className="w-12 h-12 md:w-16 md:h-16 text-blue-600 dark:text-blue-400" />
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-300">
                  I&apos;m a Student
                </h2>
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3 text-blue-800 dark:text-blue-200">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-lg">Access study materials</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-800 dark:text-blue-200">
                    <LineChart className="w-5 h-5" />
                    <span className="text-lg">Track your progress</span>
                  </div>
                </div>
              </div>
            </Card>
          </Button>

          {/* Parent Card */}
          <Button
            variant="outline"
            className="group h-auto p-8 md:p-12 transition-all duration-300 border-2 rounded-xl 
                     hover:scale-105 hover:shadow-xl border-blue-200 dark:border-blue-700
                     hover:border-blue-400 dark:hover:border-blue-500 bg-white/50 dark:bg-blue-900/50
                     backdrop-blur-sm"
            onClick={() => handleRoleSelect(Role.Parent)}
          >
            <Card className="w-full space-y-8 bg-transparent border-0 shadow-none">
              <div
                className="mx-auto w-24 h-24 md:w-32 md:h-32 flex items-center justify-center 
                            bg-blue-100 dark:bg-blue-800/50 rounded-full 
                            transition-transform duration-300 group-hover:rotate-6"
              >
                <Users className="w-12 h-12 md:w-16 md:h-16 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-300">
                  I&apos;m a Parent
                </h2>
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3 text-blue-800 dark:text-blue-200">
                    <LineChart className="w-5 h-5" />
                    <span className="text-lg">Monitor progress</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-800 dark:text-blue-200">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-lg">View study history</span>
                  </div>
                </div>
              </div>
            </Card>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
