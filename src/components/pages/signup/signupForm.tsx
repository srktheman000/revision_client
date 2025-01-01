"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AtSign, Lock, User, Users, School } from "lucide-react";
import BackButton from "@/components/ui/backbutton";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Signup attempted with:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  return (
    <Card className="w-full max-w-2xl relative bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <BackButton fallbackPath={"/"} />
      <CardHeader className="space-y-6 text-center">
        <div className="mx-auto w-20 h-20 flex items-center justify-center bg-blue-500/10 rounded-full">
          <User className="w-10 h-10 text-blue-500" />
        </div>
        <div className="space-y-3">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-xl">
            Join us today! Please fill in your details below.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label htmlFor="role" className="text-lg">
                I am a
              </Label>
              <Select onValueChange={handleRoleChange}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">
                    <div className="flex items-center space-x-2">
                      <School className="w-5 h-5" />
                      <span>Student</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="parent">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Parent</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Full Name */}
            <div className="space-y-3">
              <Label htmlFor="fullName" className="text-lg">
                Full Name
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-12 h-12 text-lg"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-lg">
                Email Address
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <AtSign className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-12 h-12 text-lg"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-3">
              <Label htmlFor="password" className="text-lg">
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="pl-12 h-12 text-lg"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-3">
              <Label htmlFor="confirmPassword" className="text-lg">
                Confirm Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="pl-12 h-12 text-lg"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 h-12 text-lg"
          >
            Create Account
          </Button>

          <div className="text-center text-base text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              className="text-blue-500 hover:text-blue-400 p-0 text-base"
            >
              Sign in
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
