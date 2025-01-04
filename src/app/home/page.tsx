"use client";

import React from "react";
import StudentHeader from "@/components/pages/homepage/StudentHeader";
import SubjectCard from "@/components/pages/homepage/SubjectCard";
import {
  BookOpen,
  Globe,
  Building2,
  FlaskConical,
  BookOpen as EnglishIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

// Define subjects data with appropriate icons and descriptions
const subjects = [
  {
    name: "History",
    description:
      "Explore the past through engaging stories of civilizations, events, and cultural developments that shaped our world. Learn about ancient civilizations, world wars, and major historical milestones.",
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    grade: "6th",
    imageUrl: "/api/placeholder/400/300",
  },
  {
    name: "Geography",
    description:
      "Discover the world's physical features, climates, populations, and cultures. Study maps, landforms, and the interaction between humans and their environment.",
    icon: <Globe className="h-6 w-6 text-primary" />,
    grade: "6th",
    imageUrl: "/api/placeholder/400/300",
  },
  {
    name: "Civics",
    description:
      "Learn about citizenship, government systems, rights and responsibilities, and how society functions. Understand democracy, civic duties, and political processes.",
    icon: <Building2 className="h-6 w-6 text-primary" />,
    grade: "7th",
    imageUrl: "/api/placeholder/400/300",
  },
  {
    name: "Science",
    description:
      "Explore the natural world through physics, chemistry, and biology. Conduct experiments, understand scientific principles, and discover how things work.",
    icon: <FlaskConical className="h-6 w-6 text-primary" />,
    grade: "7th",
    imageUrl: "/api/placeholder/400/300",
  },
  {
    name: "English",
    description:
      "Develop language skills through reading, writing, speaking, and listening. Study literature, grammar, vocabulary, and effective communication.",
    icon: <EnglishIcon className="h-6 w-6 text-primary" />,
    grade: "8th",
    imageUrl: "/api/placeholder/400/300",
  },
];

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background w-full">
      <StudentHeader name="Sohan" />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Welcome to Your Learning Journey
            </h1>
            <p className="text-muted-foreground">
              Select your grade and explore your subjects
            </p>
          </div>

          {/* Grade Selection Tabs */}
          <Tabs defaultValue="6th" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="6th">6th Grade</TabsTrigger>
              <TabsTrigger value="7th">7th Grade</TabsTrigger>
              <TabsTrigger value="8th">8th Grade</TabsTrigger>
            </TabsList>

            {["6th", "7th", "8th"].map((grade) => (
              <TabsContent
                key={grade}
                value={grade}
                className="mt-6 animate-in slide-in-from-bottom-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {subjects
                    .filter((subject) => subject.grade === grade)
                    .map((subject, index) => (
                      <SubjectCard
                        key={index}
                        name={subject.name}
                        description={subject.description}
                        icon={subject.icon}
                        grade={subject.grade}
                        imageUrl={subject.imageUrl}
                        status="Start Learning"
                        onClick={() => router.push("/chat")}
                      />
                    ))}
                </div>
                {subjects.filter((subject) => subject.grade === grade)
                  .length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No subjects available for this grade yet.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}
