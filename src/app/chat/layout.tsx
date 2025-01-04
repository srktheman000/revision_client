import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="flex h-screen bg-zinc-900 overflow-hidden border border-zinc-800 w-full">
    {children}
  </div>
);

export default Layout;
