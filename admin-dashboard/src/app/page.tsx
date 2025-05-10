"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, BarChart3, Users, BrainCircuit } from "lucide-react";

export default function Home() {
  const router = useRouter();

  // Automatically redirect to the dashboard after a short delay
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(redirectTimer);
  }, [router]);

  // Immediate redirect function
  const handleEnterDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 text-white p-6">
      <main className="max-w-4xl w-full flex flex-col items-center text-center">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Gargash Group</h1>
          <p className="text-xl text-neutral-300">
            Real Estate Admin Dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-12">
          <Card className="bg-neutral-800 border-neutral-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Properties</CardTitle>
              <Building2 className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">124</p>
              <p className="text-sm text-neutral-400">
                Manage your properties portfolio
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-neutral-800 border-neutral-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Analytics</CardTitle>
              <BarChart3 className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">84%</p>
              <p className="text-sm text-neutral-400">
                Current occupancy rate
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-neutral-800 border-neutral-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Tenants</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">842</p>
              <p className="text-sm text-neutral-400">
                Active tenant relationships
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-neutral-800 border-neutral-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">AI Insights</CardTitle>
              <BrainCircuit className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3</p>
              <p className="text-sm text-neutral-400">
                New insights detected today
              </p>
            </CardContent>
          </Card>
        </div>

        <p className="mb-8 text-neutral-300">
          Redirecting to dashboard in a few seconds...
        </p>

        <Button 
          size="lg" 
          className="px-8 py-6 text-lg"
          onClick={handleEnterDashboard}
        >
          Enter Dashboard Now
        </Button>
      </main>

      <footer className="mt-auto pt-12 pb-6 text-sm text-neutral-400">
        <p>© 2025 Gargash Group. All rights reserved.</p>
      </footer>
    </div>
  );
}
