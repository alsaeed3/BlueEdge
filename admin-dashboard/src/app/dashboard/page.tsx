"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Building, Building2, DollarSign, Home, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample data for charts
const propertyPerformanceData = [
  { name: "Jan", revenue: 4000, expenses: 2400 },
  { name: "Feb", revenue: 3000, expenses: 1398 },
  { name: "Mar", revenue: 2000, expenses: 9800 },
  { name: "Apr", revenue: 2780, expenses: 3908 },
  { name: "May", revenue: 1890, expenses: 4800 },
  { name: "Jun", revenue: 2390, expenses: 3800 },
  { name: "Jul", revenue: 3490, expenses: 4300 },
];

const occupancyTrendData = [
  { name: "Jan", occupancy: 75 },
  { name: "Feb", occupancy: 78 },
  { name: "Mar", occupancy: 82 },
  { name: "Apr", occupancy: 80 },
  { name: "May", occupancy: 85 },
  { name: "Jun", occupancy: 82 },
  { name: "Jul", occupancy: 89 },
];

// Sample data for properties
const recentProperties = [
  {
    id: 1,
    name: "Marina Waterfront Tower",
    location: "Dubai Marina",
    price: 2500000,
    status: "Active",
    units: 45,
    occupiedUnits: 38,
  },
  {
    id: 2,
    name: "Palm Residence Villa",
    location: "Palm Jumeirah",
    price: 8500000,
    status: "Active",
    units: 1,
    occupiedUnits: 1,
  },
  {
    id: 3,
    name: "Downtown Heights",
    location: "Downtown Dubai",
    price: 4200000,
    status: "Under Maintenance",
    units: 80,
    occupiedUnits: 65,
  },
  {
    id: 4,
    name: "Bluewater Apartments",
    location: "Bluewaters Island",
    price: 3400000,
    status: "Active",
    units: 25,
    occupiedUnits: 18,
  },
];

// Sample data for recent activities
const recentActivities = [
  {
    id: 1,
    activity: "New lease agreement signed",
    property: "Marina Waterfront Tower",
    user: "Ahmed Hassan",
    time: "10 minutes ago",
    // Removed avatar reference to prevent 404 errors
    avatar: "",
  },
  {
    id: 2,
    activity: "Maintenance request resolved",
    property: "Downtown Heights",
    user: "Sarah Johnson",
    time: "2 hours ago",
    // Removed avatar reference to prevent 404 errors
    avatar: "",
  },
  {
    id: 3,
    activity: "Rent payment received",
    property: "Palm Residence Villa",
    user: "Mohammed Al Maktoum",
    time: "4 hours ago",
    // Removed avatar reference to prevent 404 errors
    avatar: "",
  },
  {
    id: 4,
    activity: "Property inspection completed",
    property: "Bluewater Apartments",
    user: "Lisa Wong",
    time: "Yesterday",
    // Removed avatar reference to prevent 404 errors
    avatar: "",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button>
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,500</div>
            <p className="text-xs text-neutral-500">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
            <Users className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,400</div>
            <p className="text-xs text-neutral-500">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Home className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-neutral-500">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +5% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AED 5.2M</div>
            <p className="text-xs text-neutral-500">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +18% from last month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Property Performance</CardTitle>
            <CardDescription>
              Monthly revenue vs expenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={propertyPerformanceData}>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Occupancy Trend</CardTitle>
            <CardDescription>
              Monthly occupancy rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={occupancyTrendData}>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[70, 90]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Properties and Activities */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* Recent Properties */}
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Properties</CardTitle>
              <CardDescription>
                Latest properties added to your portfolio
              </CardDescription>
            </div>
            <Link href="/properties" passHref>
              <Button variant="outline" size="sm" className="h-8">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center">
                      <Building2 className="mr-2 h-5 w-5 text-neutral-500" />
                      <div>
                        <p className="font-medium">{property.name}</p>
                        <p className="text-sm text-neutral-500">
                          {property.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={property.status === "Active" ? "default" : "secondary"}>
                        {property.status}
                      </Badge>
                      <span className="text-sm text-neutral-500">
                        {property.occupiedUnits}/{property.units} Units Occupied
                      </span>
                    </div>
                    <Progress 
                      value={(property.occupiedUnits / property.units) * 100}
                      className="h-1 w-48 mt-1"
                    />
                  </div>
                  <div className="text-right">
                    <p className="font-medium">AED {property.price.toLocaleString()}</p>
                    <p className="text-sm text-neutral-500">
                      {Math.round((property.occupiedUnits / property.units) * 100)}% Occupancy
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activities */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest actions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <Avatar className="h-9 w-9">
                    {/* Using fallback instead of missing avatar image to prevent 404 errors */}
                    <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.activity}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {activity.property} • {activity.user}
                    </p>
                    <p className="text-xs text-neutral-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
