"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { 
  Timeline, 
  TimelineItem, 
  TimelineConnector, 
  TimelineHeader, 
  TimelineIcon, 
  TimelineBody 
} from "@/components/ui/timeline";
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import {
  ArrowRight,
  Building2,
  Car,
  Check,
  FileSignature,
  MapPin,
  MessageSquare,
  Search,
  Star,
  ThumbsUp,
  Users,
  X
} from "lucide-react";

// First, let's create the Timeline component since it's not included in shadcn/ui by default
function Timeline({ children }: { children: React.ReactNode }) {
  return <div className="relative ml-4 pl-8 pb-8 space-y-6 border-l border-neutral-200">{children}</div>;
}

function TimelineItem({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}

function TimelineConnector() {
  return <div className="absolute -left-10 top-2 w-4 h-0.5 bg-neutral-200"></div>;
}

function TimelineIcon({ icon: Icon }: { icon: any }) {
  return (
    <div className="absolute -left-14 flex items-center justify-center w-7 h-7 rounded-full bg-white border border-neutral-200">
      <Icon className="w-4 h-4 text-neutral-600" />
    </div>
  );
}

function TimelineHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center text-sm font-semibold mb-1">{children}</div>;
}

function TimelineBody({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-neutral-600">{children}</div>;
}

export default function PotentialClientsPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContract, setShowContract] = useState(false);

  // Function to advance the timeline automatically
  const playTimeline = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    // Set intervals for each step
    const intervals = [1000, 3000, 3000, 3000, 2000, 3000, 2000, 3000, 2000];
    
    let currentInterval = 0;
    let totalDelay = 0;
    
    // Schedule each step with increasing delays
    intervals.forEach((delay, index) => {
      totalDelay += delay;
      setTimeout(() => {
        setCurrentStep(index);
        
        // When reaching the last step, stop playing
        if (index === intervals.length - 1) {
          setTimeout(() => {
            setIsPlaying(false);
          }, 1000);
        }
      }, totalDelay);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Potential Clients</h1>
          <p className="text-neutral-500">
            AI-driven client acquisition and cross-selling
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={isPlaying ? "secondary" : "default"} 
            onClick={playTimeline}
            disabled={isPlaying}
          >
            {isPlaying ? "Simulating..." : "Play Simulation"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AI Agent Interaction Simulation</CardTitle>
              <CardDescription>Real-time intelligence for business opportunities</CardDescription>
            </div>
            <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
              {isPlaying ? "In Progress" : "Ready"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-8 p-4 rounded-lg bg-neutral-50">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarFallback className="bg-primary text-white">AI</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-lg">Gargash AI Agent</h3>
              <p className="text-sm text-neutral-500">Enterprise business assistant • Active 24/7</p>
            </div>
            <div className="ml-auto">
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Online</Badge>
            </div>
          </div>

          <Timeline>
            <TimelineItem className={currentStep >= 0 ? "opacity-100" : "opacity-40"}>
              <TimelineConnector />
              <TimelineIcon icon={MessageSquare} />
              <TimelineHeader>
                <span className="mr-2">Social Media Monitoring</span>
                <Badge variant="outline" className="text-xs">10:23 AM</Badge>
              </TimelineHeader>
              <TimelineBody>
                <Card className="mt-2 border border-blue-100 bg-blue-50/50">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>S</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">Simeon Alexander</p>
                          <Badge variant="outline" className="ml-2 text-xs">LinkedIn</Badge>
                        </div>
                        <p className="text-sm mt-1">
                          Excited to announce that I've accepted the CTO position at Tech Innovations Dubai! 
                          Looking forward to this new chapter in my career and life in the UAE. 
                          #NewBeginnings #Dubai #Tech #Leadership
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
                          <span className="flex items-center"><ThumbsUp className="h-3 w-3 mr-1" /> 243</span>
                          <span>24 comments</span>
                          <span>2 hours ago</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TimelineBody>
            </TimelineItem>

            <TimelineItem className={currentStep >= 1 ? "opacity-100" : "opacity-40"}>
              <TimelineConnector />
              <TimelineIcon icon={Search} />
              <TimelineHeader>
                <span className="mr-2">AI Analysis & Opportunity Detection</span>
                <Badge variant="outline" className="text-xs">10:24 AM</Badge>
              </TimelineHeader>
              <TimelineBody>
                <Card className="mt-2 border border-indigo-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-sm">AI Agent Analysis</h4>
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-600">Processing</Badge>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Collecting profile data</span>
                            <span>Complete</span>
                          </div>
                          <Progress value={100} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Cross-referencing with Gargash offerings</span>
                            <span>Complete</span>
                          </div>
                          <Progress value={100} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Analyzing opportunity fit</span>
                            <span>Complete</span>
                          </div>
                          <Progress value={100} className="h-1" />
                        </div>
                      </div>

                      <div className="text-sm">
                        <p className="mt-2">
                          <span className="font-medium">Client Profile:</span> Simeon Alexander, new CTO at Tech Innovations Dubai, 
                          likely relocating to Dubai, potential for both real estate and automotive needs.
                        </p>
                        <p className="mt-2">
                          <span className="font-medium">Opportunity Score:</span> 87/100
                        </p>
                        <div className="flex items-center gap-1 text-amber-500 mt-1">
                          <Star className="fill-amber-500 h-4 w-4" />
                          <Star className="fill-amber-500 h-4 w-4" />
                          <Star className="fill-amber-500 h-4 w-4" />
                          <Star className="fill-amber-500 h-4 w-4" />
                          <Star className="h-4 w-4 stroke-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TimelineBody>
            </TimelineItem>

            <TimelineItem className={currentStep >= 2 ? "opacity-100" : "opacity-40"}>
              <TimelineConnector />
              <TimelineIcon icon={Building2} />
              <TimelineHeader>
                <span className="mr-2">Real Estate Recommendation</span>
                <Badge variant="outline" className="text-xs">10:26 AM</Badge>
              </TimelineHeader>
              <TimelineBody>
                <Card className="mt-2">
                  <CardContent className="p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2">Suggested Property</h4>
                        <div className="aspect-video relative bg-neutral-100 rounded-md overflow-hidden">
                          <div className="bg-neutral-800 h-full w-full flex items-center justify-center">
                            <Building2 className="h-12 w-12 text-neutral-400" />
                          </div>
                          <Badge
                            className="absolute top-2 right-2"
                            variant="default"
                          >
                            Premium
                          </Badge>
                        </div>
                        <div className="mt-2">
                          <h5 className="font-medium">Downtown Luxury Apartment</h5>
                          <div className="flex items-center text-neutral-500 text-sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            Downtown Dubai, 10 min from Tech Innovations HQ
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">AI Agent Message</h4>
                        <div className="bg-blue-50 p-3 rounded-md text-sm">
                          <p>
                            Hello Simeon, congratulations on your new role as CTO at Tech Innovations Dubai! 
                            As you plan your relocation, I'd like to introduce this exclusive Downtown Dubai 
                            apartment from Gargash Group's premium portfolio.
                          </p>
                          <p className="mt-2">
                            This property is just 10 minutes from your new office with amenities perfectly 
                            suited for tech executives. Would you be interested in a virtual viewing?
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="w-full">Details</Button>
                          <Button size="sm" className="w-full">Schedule Viewing</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TimelineBody>
            </TimelineItem>

            <TimelineItem className={currentStep >= 3 ? "opacity-100" : "opacity-40"}>
              <TimelineConnector />
              <TimelineIcon icon={X} />
              <TimelineHeader>
                <span className="mr-2">Initial Response</span>
                <Badge variant="outline" className="text-xs">10:32 AM</Badge>
              </TimelineHeader>
              <TimelineBody>
                <Card className="mt-2 border border-red-100 bg-red-50/50">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>S</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Simeon Alexander</p>
                        <p className="text-sm mt-1">
                          Thank you for the congratulations! That's a beautiful property, but I've actually 
                          already arranged accommodation through my company. They've provided a company apartment 
                          for the first year while I settle in.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TimelineBody>
            </TimelineItem>

            <TimelineItem className={currentStep >= 4 ? "opacity-100" : "opacity-40"}>
              <TimelineConnector />
              <TimelineIcon icon={Search} />
              <TimelineHeader>
                <span className="mr-2">AI Strategy Adaptation</span>
                <Badge variant="outline" className="text-xs">10:33 AM</Badge>
              </TimelineHeader>
              <TimelineBody>
                <Card className="mt-2 border border-indigo-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-sm">Cross-selling Analysis</h4>
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-600">Adapting</Badge>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Analyzing response</span>
                            <span>Complete</span>
                          </div>
                          <Progress value={100} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Identifying alternative offerings</span>
                            <span>Complete</span>
                          </div>
                          <Progress value={100} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Calculating automotive purchase likelihood</span>
                            <span>Complete</span>
                          </div>
                          <Progress value={100} className="h-1" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-1 text-center text-xs mt-2">
                        <div className="p-2 rounded bg-white border">
                          <p className="font-semibold">Executive Status</p>
                          <p className="text-green-600">High</p>
                        </div>
                        <div className="p-2 rounded bg-white border">
                          <p className="font-semibold">Mobility Needs</p>
                          <p className="text-green-600">Critical</p>
                        </div>
                        <div className="p-2 rounded bg-white border">
                          <p className="font-semibold">Purchase Intent</p>
                          <p className="text-amber-600">Medium</p>
                        </div>
                      </div>

                      <p className="text-sm border-t pt-2">
                        <span className="font-medium">Recommendation:</span> Present premium Mercedes-Benz E53 offer 
                        that aligns with executive status and Dubai lifestyle
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TimelineBody>
            </TimelineItem>

            <TimelineItem className={currentStep >= 5 ? "opacity-100" : "opacity-40"}>
              <TimelineConnector />
              <TimelineIcon icon={Car} />
              <TimelineHeader>
                <span className="mr-2">Automotive Recommendation</span>
                <Badge variant="outline" className="text-xs">10:35 AM</Badge>
              </TimelineHeader>
              <TimelineBody>
                <Card className="mt-2">
                  <CardContent className="p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2">Suggested Vehicle</h4>
                        <div className="aspect-video relative bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-md overflow-hidden">
                          <div className="h-full w-full flex items-center justify-center">
                            <Car className="h-16 w-16 text-neutral-300" />
                          </div>
                          <Badge
                            className="absolute top-2 right-2"
                            variant="secondary"
                          >
                            Premium Class
                          </Badge>
                        </div>
                        <div className="mt-2">
                          <h5 className="font-medium">Mercedes-Benz E53 AMG</h5>
                          <div className="text-neutral-500 text-sm">
                            2023 • Executive Sport Sedan • Available Immediately
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">AI Agent Message</h4>
                        <div className="bg-blue-50 p-3 rounded-md text-sm">
                          <p>
                            I understand you have accommodation arranged. In that case, may I suggest 
                            an exclusive transportation solution perfect for Dubai's executive scene?
                          </p>
                          <p className="mt-2">
                            The Mercedes-Benz E53 AMG offers the perfect balance of luxury, performance, 
                            and status that aligns with your new position. As a CTO in Dubai, reliable 
                            and impressive transportation is essential.
                          </p>
                          <p className="mt-2">
                            Gargash Enterprises can offer a special executive package including priority 
                            service and maintenance.
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="w-full">Car Details</Button>
                          <Button size="sm" className="w-full">Financing Options</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TimelineBody>
            </TimelineItem>

            <TimelineItem className={currentStep >= 6 ? "opacity-100" : "opacity-40"}>
              <TimelineConnector />
              <TimelineIcon icon={Check} />
              <TimelineHeader>
                <span className="mr-2">Client Response</span>
                <Badge variant="outline" className="text-xs">10:42 AM</Badge>
              </TimelineHeader>
              <TimelineBody>
                <Card className="mt-2 border border-green-100 bg-green-50/50">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>S</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Simeon Alexander</p>
                        <p className="text-sm mt-1">
                          Now you're speaking my language! I was actually planning to look for a car 
                          once I arrived. The E53 looks perfect - I've always been a Mercedes fan. 
                          What kind of delivery timeframe and financing options do you have available?
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TimelineBody>
            </TimelineItem>

            <TimelineItem className={currentStep >= 7 ? "opacity-100" : "opacity-40"}>
              <TimelineConnector />
              <TimelineIcon icon={FileSignature} />
              <TimelineHeader>
                <span className="mr-2">Contract Generation</span>
                <Badge variant="outline" className="text-xs">10:45 AM</Badge>
              </TimelineHeader>
              <TimelineBody>
                <Card className="mt-2">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Purchase Agreement Prepared</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600 p-0 h-auto"
                          onClick={() => setShowContract(true)}
                        >
                          View Contract
                        </Button>
                      </div>

                      <div className="border rounded-md p-3 bg-neutral-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileSignature className="h-5 w-5 text-neutral-500 mr-2" />
                            <span className="font-medium">Mercedes-Benz E53 Purchase Contract</span>
                          </div>
                          <Badge>Ready for Signature</Badge>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-dashed grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-neutral-500">Client</p>
                            <p>Simeon Alexander</p>
                          </div>
                          <div>
                            <p className="text-neutral-500">Gargash Representative</p>
                            <p>Ahmed Al Falasi</p>
                          </div>
                          <div>
                            <p className="text-neutral-500">Vehicle</p>
                            <p>2023 Mercedes-Benz E53 AMG</p>
                          </div>
                          <div>
                            <p className="text-neutral-500">Delivery Date</p>
                            <p>May 15, 2025</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-neutral-500" />
                        <span>
                          Contract sent to <span className="font-medium">Ahmed Al Falasi</span> (Sales Manager) and <span className="font-medium">Simeon Alexander</span>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TimelineBody>
            </TimelineItem>

            <TimelineItem className={currentStep >= 8 ? "opacity-100" : "opacity-40"}>
              <TimelineConnector />
              <TimelineIcon icon={Check} />
              <TimelineHeader>
                <span className="mr-2">Transaction Completed</span>
                <Badge variant="outline" className="text-xs">10:58 AM</Badge>
              </TimelineHeader>
              <TimelineBody>
                <Card className="mt-2 border border-green-100 bg-green-50/50">
                  <CardContent className="p-4">
                    <div className="text-center py-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-3">
                        <Check className="h-6 w-6" />
                      </div>
                      <h4 className="font-medium text-lg">Purchase Successfully Completed</h4>
                      <p className="text-neutral-500 mt-1">
                        Simeon Alexander has signed the contract for a Mercedes-Benz E53 AMG
                      </p>
                      
                      <div className="mt-4 border-t pt-4">
                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-left text-sm">
                          <div>
                            <p className="text-neutral-500">Transaction ID</p>
                            <p className="font-medium">GRG-AUTO-29385</p>
                          </div>
                          <div>
                            <p className="text-neutral-500">Date</p>
                            <p className="font-medium">May 10, 2025</p>
                          </div>
                          <div>
                            <p className="text-neutral-500">Revenue</p>
                            <p className="font-medium">AED 450,000</p>
                          </div>
                          <div>
                            <p className="text-neutral-500">Status</p>
                            <Badge variant="outline" className="bg-green-100 text-green-600 border-green-200">
                              Completed
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TimelineBody>
            </TimelineItem>
          </Timeline>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-5">
          <div className="text-sm text-neutral-500">
            <p>AI Agent Activity • Today at 10:23 AM</p>
          </div>
          <div>
            <Button variant="outline" size="sm">
              Export Report
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* The contract dialog */}
      <Dialog open={showContract} onOpenChange={setShowContract}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Purchase Agreement</DialogTitle>
            <DialogDescription>
              Contract details for Mercedes-Benz E53 AMG
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-4 border rounded-md font-mono text-sm">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold">VEHICLE PURCHASE AGREEMENT</h2>
              <p>Gargash Enterprises LLC</p>
              <p>Contract #: GRG-AUTO-29385</p>
            </div>

            <p className="mb-4">This Vehicle Purchase Agreement (the "Agreement") is entered into as of May 10, 2025 by and between:</p>
            
            <p className="mb-2"><strong>SELLER:</strong> Gargash Enterprises LLC, a company registered in the United Arab Emirates with its principal place of business at Sheikh Zayed Road, Dubai, UAE ("Gargash")</p>
            
            <p className="mb-4"><strong>BUYER:</strong> Simeon Alexander, residing at [Address to be provided] ("Buyer")</p>
            
            <h3 className="font-bold mb-2">1. VEHICLE DETAILS</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>Make: Mercedes-Benz</li>
              <li>Model: E53 AMG</li>
              <li>Year: 2023</li>
              <li>Color: Obsidian Black</li>
              <li>VIN: WDD213XXXXXXXX355</li>
              <li>Mileage: 15 km</li>
            </ul>
            
            <h3 className="font-bold mb-2">2. PURCHASE PRICE AND PAYMENT</h3>
            <p className="mb-4">The total purchase price for the Vehicle is AED 450,000 (Four Hundred Fifty Thousand Dirhams), inclusive of VAT.</p>
            
            <h3 className="font-bold mb-2">3. DELIVERY</h3>
            <p className="mb-4">Gargash shall deliver the Vehicle to the Buyer on May 15, 2025 at the Gargash Mercedes-Benz Showroom, Dubai.</p>
            
            {/* More contract terms would go here */}
            
            <div className="mt-8 mb-4">
              <p>IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div>
                <p><strong>SELLER:</strong></p>
                <p>Ahmed Al Falasi</p>
                <p>Sales Manager</p>
                <p>Gargash Enterprises LLC</p>
              </div>
              <div>
                <p><strong>BUYER:</strong></p>
                <p>Simeon Alexander</p>
                <p>CTO, Tech Innovations Dubai</p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button>Download PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Additional statistics and information */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Statistics</CardTitle>
            <CardDescription>AI agent performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Lead Detection</span>
                  <span className="font-medium">324 this month</span>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-neutral-500 mt-1">85% accuracy rate</p>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Initial Contact</span>
                  <span className="font-medium">187 leads</span>
                </div>
                <Progress value={58} className="h-2" />
                <p className="text-xs text-neutral-500 mt-1">58% engagement rate</p>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Offer Acceptance</span>
                  <span className="font-medium">43 conversions</span>
                </div>
                <Progress value={23} className="h-2" />
                <p className="text-xs text-neutral-500 mt-1">23% conversion rate</p>
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-neutral-600">
                  AI agent has generated <span className="font-medium">AED 18.2M</span> in sales 
                  this quarter through proactive opportunity detection.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Opportunities</CardTitle>
            <CardDescription>AI-detected potential clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start justify-between pb-2 border-b">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Maria Kim</p>
                    <p className="text-xs text-neutral-500">New Finance Director at ADCB</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-600">In Progress</Badge>
              </div>
              
              <div className="flex items-start justify-between pb-2 border-b">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>RJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Rajiv Sharma</p>
                    <p className="text-xs text-neutral-500">Relocating to Dubai from London</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-600">New Lead</Badge>
              </div>
              
              <div className="flex items-start justify-between pb-2 border-b">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Simeon Alexander</p>
                    <p className="text-xs text-neutral-500">New CTO at Tech Innovations Dubai</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-600">Converted</Badge>
              </div>
              
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>LM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Laura Martinez</p>
                    <p className="text-xs text-neutral-500">Opening Dubai office for Spanish firm</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-600">New Lead</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Cross-Selling Performance</CardTitle>
            <CardDescription>Real estate to automotive conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monthly">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
              
              <TabsContent value="monthly" className="space-y-4">
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: "Jan", value: 12 },
                      { name: "Feb", value: 18 },
                      { name: "Mar", value: 15 },
                      { name: "Apr", value: 21 },
                      { name: "May", value: 9 },
                    ]}>
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <RechartsTooltip />
                      <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center text-sm">
                  <div className="bg-neutral-50 p-3 rounded-md">
                    <p className="text-neutral-500">Conversion Rate</p>
                    <p className="text-2xl font-bold">22%</p>
                    <p className="text-xs text-green-600">↑ 3.5% from last month</p>
                  </div>
                  <div className="bg-neutral-50 p-3 rounded-md">
                    <p className="text-neutral-500">Avg. Value</p>
                    <p className="text-2xl font-bold">AED 380K</p>
                    <p className="text-xs text-green-600">↑ 12% from last month</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="weekly">
                <div className="flex items-center justify-center h-[180px]">
                  <p className="text-neutral-500">Weekly data visualization would appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="yearly">
                <div className="flex items-center justify-center h-[180px]">
                  <p className="text-neutral-500">Yearly data visualization would appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
