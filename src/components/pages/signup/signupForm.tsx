// components/ParentRegistrationForm.tsx
"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AtSign,
  Lock,
  User,
  Plus,
  Trash2,
  UserPlus,
  School,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import generateRandomPassword from "@/lib/generateRandomPassword";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, EyeOff, RefreshCw } from "lucide-react";

interface Student {
  id: string;
  username: string;
  fullName: string;
  grade: string;
  password: string;
  showPassword: boolean;
}

interface ParentFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  students: Student[];
}

const ParentRegistrationForm = () => {
  const [formData, setFormData] = useState<ParentFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    students: [],
  });

  const handleParentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleAddStudent = () => {
    const newStudent: Student = {
      id: Date.now().toString(),
      username: "",
      fullName: "",
      grade: "",
      password: generateRandomPassword(),
      showPassword: false,
    };
    setFormData({
      ...formData,
      students: [...formData.students, newStudent],
    });
  };

  const handleStudentChange = (
    studentId: string,
    field: keyof Student,
    value: boolean | string
  ) => {
    setFormData({
      ...formData,
      students: formData.students.map((student) =>
        student.id === studentId ? { ...student, [field]: value } : student
      ),
    });
  };

  const regeneratePassword = (studentId: string) => {
    const newPassword = generateRandomPassword();
    handleStudentChange(studentId, "password", newPassword);
  };

  const togglePasswordVisibility = (studentId: string) => {
    const student = formData.students.find((s) => s.id === studentId);
    if (student) {
      handleStudentChange(studentId, "showPassword", !student.showPassword);
    }
  };

  const handleRemoveStudent = (studentId: string) => {
    setFormData({
      ...formData,
      students: formData.students.filter((student) => student.id !== studentId),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Registration attempted with:", formData);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-8 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader className="space-y-6 text-center">
        <div className="mx-auto w-20 h-20 flex items-center justify-center bg-secondary rounded-full">
          <UserPlus className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-3">
          <CardTitle className="text-2xl md:text-3xl font-bold">
            Parent Registration
          </CardTitle>
          <CardDescription className="text-base md:text-xl">
            Register as a parent and add your children (Grades 6-8)
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Parent Details Section */}
          <div className="space-y-6">
            <div className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-border">
              <User className="h-5 w-5" />
              <span>Parent Details</span>
            </div>

            {/* Parent Full Name */}
            <div className="space-y-3">
              <Label htmlFor="fullName" className="text-sm md:text-base">
                Full Name
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-10 h-11"
                  value={formData.fullName}
                  onChange={handleParentInputChange}
                  required
                />
              </div>
            </div>

            {/* Parent Email */}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm md:text-base">
                Email Address
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <AtSign className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-11"
                  value={formData.email}
                  onChange={handleParentInputChange}
                  required
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm md:text-base">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create password"
                    className="pl-10 h-11"
                    value={formData.password}
                    onChange={handleParentInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm md:text-base"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    className="pl-10 h-11"
                    value={formData.confirmPassword}
                    onChange={handleParentInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Students Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="text-xl font-semibold flex items-center gap-2">
                <School className="h-5 w-5" />
                <span>Student Details</span>
              </div>
              <Button
                type="button"
                onClick={handleAddStudent}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Student
              </Button>
            </div>

            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-6">
                {formData.students.map((student) => (
                  <Card key={student.id} className="p-4 bg-secondary">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm md:text-base font-semibold">
                          Student {formData.students.indexOf(student) + 1}
                        </Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveStudent(student.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm">Username</Label>
                          <Input
                            placeholder="Create username"
                            value={student.username}
                            onChange={(e) =>
                              handleStudentChange(
                                student.id,
                                "username",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm">Full Name</Label>
                          <Input
                            placeholder="Enter full name"
                            value={student.fullName}
                            onChange={(e) =>
                              handleStudentChange(
                                student.id,
                                "fullName",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Password</Label>
                        <div className="relative">
                          <Input
                            type={student.showPassword ? "text" : "password"}
                            value={student.password}
                            onChange={(e) =>
                              handleStudentChange(
                                student.id,
                                "password",
                                e.target.value
                              )
                            }
                            className="pr-20"
                            required
                          />
                          <div className="absolute right-0 top-0 h-full flex items-center space-x-1 pr-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      regeneratePassword(student.id)
                                    }
                                  >
                                    <RefreshCw className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Generate new password</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      togglePasswordVisibility(student.id)
                                    }
                                  >
                                    {student.showPassword ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {student.showPassword ? "Hide" : "Show"}{" "}
                                    password
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Grade</Label>
                        <Select
                          value={student.grade}
                          onValueChange={(value) =>
                            handleStudentChange(student.id, "grade", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">Grade 6</SelectItem>
                            <SelectItem value="7">Grade 7</SelectItem>
                            <SelectItem value="8">Grade 8</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>
                ))}

                {formData.students.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    Click &quot;Add Student&quot; to register your children
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-base"
            disabled={formData.students.length === 0}
          >
            Complete Registration
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              className="text-primary hover:text-primary/90 p-0"
            >
              Sign in
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ParentRegistrationForm;
