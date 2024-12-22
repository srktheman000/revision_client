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

const ParentLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
  };

  return (
    <Card className="w-full max-w-md relative bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto w-16 h-16 flex items-center justify-center bg-blue-500/10 rounded-full">
          <Users className="w-8 h-8 text-blue-500" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold">Parent Login</CardTitle>
          <CardDescription>
            Welcome! Please enter your credentials to access your child&apos;s
            information.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AtSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="parent@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </Label>
            </div>
            <Button
              variant="link"
              className="text-blue-500 hover:text-blue-400 p-0"
            >
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500"
          >
            Sign in
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            New parent account?{" "}
            <Button
              variant="link"
              className="text-blue-500 hover:text-blue-400 p-0"
            >
              Register here
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ParentLoginForm;
