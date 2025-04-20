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

import { AtSign, Lock, User, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

const ParentRegistrationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleParentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Registration failed");
      } else {
        router.push("/login");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-8 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader className="space-y-6 text-center">
        <div className="mx-auto w-20 h-20 flex items-center justify-center bg-secondary rounded-full">
          <UserPlus className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-3">
          <CardTitle className="text-2xl md:text-3xl font-bold">
            Registration
          </CardTitle>
          <CardDescription className="text-base md:text-xl">
            Register as Learner
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="text-xl font-semibold flex items-center gap-2 pb-2 border-b border-border">
              <User className="h-5 w-5" />
              <span> Details</span>
            </div>
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm md:text-base">
                Name
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-10 h-11"
                  value={formData.name}
                  onChange={handleParentInputChange}
                  required
                />
              </div>
            </div>
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
          {error && <div className="text-red-500 text-center">{error}</div>}
          <Button
            type="submit"
            className="w-full h-11 text-base"
            disabled={loading}
          >
            {loading ? "Registering..." : "Complete Registration"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              className="text-primary hover:text-primary/90 p-0"
              onClick={() => router.push("/login")}
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
