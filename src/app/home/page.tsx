"use client";

import React, { useState, useEffect } from "react";
import StudentHeader from "@/components/pages/homepage/StudentHeader";
import SubjectCard from "@/components/pages/homepage/SubjectCard";
import { BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAPI from "@/hooks/useAPI";
import { fetchUserData } from "@/utils/fetchUserData";
import { fetchSubjectsByGrade } from "@/utils/fetchSubjectsByGrade";
import { SubjectDocument } from "@/types/schemaTypes";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [selectedGrade, setSelectedGrade] = useState<number>(6);
  const [selectedSubject, setSelectedSubject] =
    useState<SubjectDocument | null>(null);
  const router = useRouter();

  // Fetch user using useAPI
  const [userState, fetchUser] = useAPI(fetchUserData);
  const { data: user, loading: userLoading, error: userError } = userState;

  // Fetch subjects for selected grade using useAPI
  const [subjectsState, fetchSubjects] = useAPI((...args: unknown[]) =>
    fetchSubjectsByGrade(args[0] as number)
  );
  const {
    data: gradeSubjects,
    loading: subjectsLoading,
    error: subjectsError,
  } = subjectsState;

  // Fetch user on mount
  useEffect(() => {
    fetchUser();
    fetchSubjects(selectedGrade);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-background w-full">
      <StudentHeader name={user?.name || ""} />
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
          <Tabs
            value={selectedGrade.toString()}
            onValueChange={(val) => {
              const grade = Number(val);
              setSelectedGrade(grade);
              fetchSubjects(grade); // Call API when tab is clicked
            }}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="6">6th Grade</TabsTrigger>
              <TabsTrigger value="7">7th Grade</TabsTrigger>
              <TabsTrigger value="8">8th Grade</TabsTrigger>
            </TabsList>

            {[6, 7, 8].map((grade) => (
              <TabsContent
                key={grade}
                value={grade.toString()}
                className="mt-6 animate-in slide-in-from-bottom-4"
              >
                {userLoading || subjectsLoading ? (
                  <div className="text-center py-12">Loading...</div>
                ) : userError ? (
                  <div className="text-center py-12 text-red-500">
                    {userError}
                  </div>
                ) : subjectsError ? (
                  <div className="text-center py-12 text-red-500">
                    {subjectsError}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gradeSubjects && gradeSubjects.length > 0 ? (
                      gradeSubjects.map(
                        (subject: SubjectDocument, index: number) => (
                          <SubjectCard
                            key={index}
                            subject={subject}
                            icon={<BookOpen className="h-6 w-6 text-primary" />}
                            status="Start Learning"
                            onClick={() => router.push(`/chat/${subject._id}`)}
                          />
                        )
                      )
                    ) : (
                      <div className="text-center py-12 col-span-3">
                        <p className="text-muted-foreground">
                          No subjects available for this grade yet.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {/* Subject details section */}
                {selectedSubject && (
                  <div className="mt-8 p-6 border rounded bg-muted">
                    <h2 className="text-xl font-bold mb-2">
                      {selectedSubject.name}
                    </h2>
                    <p>{selectedSubject.description}</p>
                    {/* Add more details as needed */}
                    <button
                      className="mt-4 text-primary underline"
                      onClick={() => setSelectedSubject(null)}
                    >
                      Close
                    </button>
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
