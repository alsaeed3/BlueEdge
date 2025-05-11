"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen overflow-hidden">
      <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <div className="md:pl-72 h-full">
        <Header />
        <main className="h-[calc(100%-4rem)] overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
