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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AtSign, Lock, Users } from "lucide-react";
import BackButton from "@/components/ui/backbutton";
import Link from "next/link";

const ParentLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
  };

  return (
    <Card className="w-full max-w-2xl relative bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <BackButton fallbackPath={"/"} />
      <CardHeader className="space-y-6 text-center">
        <div className="mx-auto w-20 h-20 flex items-center justify-center bg-blue-500/10 rounded-full">
          <Users className="w-10 h-10 text-blue-500" />
        </div>
        <div className="space-y-3">
          <CardTitle className="text-3xl font-bold">Parent Login</CardTitle>
          <CardDescription className="text-xl">
            Welcome! Please enter your credentials to access your child&apos;s
            information.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
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
                  placeholder="parent@example.com"
                  className="pl-12 h-12 text-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

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
                  placeholder="Enter your password"
                  className="pl-12 h-12 text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox id="remember" className="h-5 w-5" />
              <Label
                htmlFor="remember"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </Label>
            </div>
            <Button
              variant="link"
              className="text-blue-500 hover:text-blue-400 p-0 text-base"
            >
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 h-12 text-lg"
          >
            Sign in
          </Button>

          <div className="text-center text-base text-muted-foreground">
            New parent account?{" "}
            <Button
              asChild
              variant="link"
              className="text-blue-500 hover:text-blue-400 p-0 text-base"
            >
              <Link href="/signup">Register here</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ParentLoginForm;
