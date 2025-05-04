"use client";
import React from "react";
import { componentsMap } from "./components";

// Use a flexible type that allows any properties
type ComponentProps = {
  name: string;
  children: React.ReactNode;
  [key: string]: any;
};

export const getComponent = (component: ComponentProps) => {
  if (!component || !component.name) return null;

  // Get the appropriate component from the map
  const ComponentToRender = componentsMap[component.name];
  if (!ComponentToRender) return null;

  // Pass all props except possibly transforming some for type compatibility
  return <ComponentToRender {...component} />;
};
