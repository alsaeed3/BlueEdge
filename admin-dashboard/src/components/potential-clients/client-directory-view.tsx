"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { potentialClients } from '@/lib/potential-clients-data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Spinner } from '@/components/ui/spinner';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ClientDirectoryView = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("industry");

  // Filter out featured client for special display
  const featuredClient = potentialClients.find(client => client.isFeatured);
  const regularClients = potentialClients.filter(client => !client.isFeatured);

  // Function to get priority level based on score
  const getPriorityLevel = (score: number) => {
    if (score >= 85) return "High";
    if (score >= 75) return "Medium";
    return "Standard";
  };
  
  // Group clients by industry
  const clientsByIndustry = useMemo(() => {
    return regularClients.reduce<{ [key: string]: typeof regularClients }>(
      (acc, client) => {
        if (!acc[client.industry]) acc[client.industry] = [];
        acc[client.industry].push(client);
        return acc;
      },
      {}
    );
  }, [regularClients]);

  // Group clients by location
  const clientsByLocation = useMemo(() => {
    return regularClients.reduce<{ [key: string]: typeof regularClients }>(
      (acc, client) => {
        if (!acc[client.location]) acc[client.location] = [];
        acc[client.location].push(client);
        return acc;
      },
      {}
    );
  }, [regularClients]);
  
  // Group clients by priority level
  const clientsByPriority = useMemo(() => {
    return regularClients.reduce<{ [key: string]: typeof regularClients }>(
      (acc, client) => {
        const priority = getPriorityLevel(client.potentialScore);
        if (!acc[priority]) acc[priority] = [];
        acc[priority].push(client);
        return acc;
      },
      {}
    );
  }, [regularClients]);

  // Transition to client scenario
  const handleClientClick = (clientId: string) => {
    if (clientId !== 'simeon-wansi') {
      // For non-featured clients, show a toast or message that they're coming soon
      alert("Detailed scenario for this client coming soon!");
      return;
    }

    // Start loading animation for featured client
    setLoading(clientId);
    
    // Simulate progress for the thinking animation
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 3;
      setProgress(Math.min(currentProgress, 100));
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        // Navigate to client scenario page after animation completes
        setTimeout(() => {
          router.push(`/potential-clients/${clientId}`);
        }, 500);
      }
    }, 150);
  };

  // Function to get color based on potential score
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-500';
    if (score >= 75) return 'bg-blue-500';
    return 'bg-violet-500';
  };
  
  // Function to get priority badge color
  const getPriorityBadgeColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
    if (score >= 75) return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    return 'bg-violet-100 text-violet-800 hover:bg-violet-200';
  };
  
  // Function to get text for priority level
  const getPriorityText = (score: number) => {
    if (score >= 85) return 'High Priority';
    if (score >= 75) return 'Medium Priority';
    return 'Standard Priority';
  };

  // Calculate counts for different segments
  const industryCount = Object.keys(clientsByIndustry).length;
  const locationCount = Object.keys(clientsByLocation).length;
  const highPriorityCount = (clientsByPriority['High'] || []).length;
  const totalClients = regularClients.length + (featuredClient ? 1 : 0);

  return (
    <div className="container flex flex-col items-center mx-auto">
      <h1 className="text-3xl font-bold mb-2">Customer Data Segmentation</h1>
      <p className="text-gray-500 mb-8 text-center max-w-2xl">
        Explore our potential customer base through different segmentation approaches. 
        Analyze by industry, location, or priority level to identify key target segments.
      </p>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{totalClients}</CardTitle>
            <CardDescription>Total Potential Clients</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{industryCount}</CardTitle>
            <CardDescription>Industry Segments</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{locationCount}</CardTitle>
            <CardDescription>Geographic Regions</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{highPriorityCount}</CardTitle>
            <CardDescription>High Priority Clients</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Featured client section */}
      {featuredClient && (
        <div className="mb-8 w-full">
          <h2 className="text-xl font-semibold mb-4">Featured Client</h2>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card 
              className="flex flex-col items-center cursor-pointer border-2 border-emerald-500 bg-gradient-to-b from-emerald-50 to-white relative"
              onClick={() => handleClientClick(featuredClient.id)}
            >
              <Badge variant="default" className="absolute top-4 right-4 bg-emerald-500">Featured</Badge>

              <CardContent className="flex flex-col sm:flex-row items-center gap-6 py-6">
                <div className="relative">
                  <Avatar className="size-32 border-4 border-emerald-500">
                    <AvatarImage src={featuredClient.avatarSrc} alt={featuredClient.name} />
                    <AvatarFallback>{featuredClient.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 size-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white bg-emerald-500">
                    {featuredClient.potentialScore}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold">{featuredClient.name}</h3>
                  <p className="text-gray-500">{featuredClient.position}</p>
                  <p className="text-gray-500">{featuredClient.company}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline" className="mr-2">{featuredClient.industry}</Badge>
                    <Badge variant="outline">{featuredClient.location}</Badge>
                    <Badge className={getPriorityBadgeColor(featuredClient.potentialScore)}>
                      {getPriorityText(featuredClient.potentialScore)}
                    </Badge>
                  </div>
                </div>

                <div className="ml-auto bg-emerald-50 p-4 rounded-lg hidden md:block">
                  <p className="text-sm text-gray-600 mb-2">Client Profile Highlights:</p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-1">
                      <span className="inline-block size-1.5 rounded-full bg-emerald-500"></span>
                      Recent appointment as CTO at Dubai Technologies
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="inline-block size-1.5 rounded-full bg-emerald-500"></span>
                      New to UAE, seeking permanent residence
                    </li>
                    <li className="flex items-center gap-1">
                      <span className="inline-block size-1.5 rounded-full bg-emerald-500"></span>
                      High potential value across all business units
                    </li>
                  </ul>
                </div>
              </CardContent>
              
              <div className="w-full bg-green-100 p-3 border-t border-green-200 text-center text-green-800 font-medium">
                Click to view detailed client journey scenario
              </div>
            </Card>

            {/* Thinking animation overlay */}
            {loading === featuredClient.id && (
              <motion.div 
                className="absolute inset-0 bg-black/70 rounded-lg flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Spinner size="lg" className="text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Thinking<span className="animate-pulse">...</span></h3>
                <p className="text-gray-300 text-sm mb-4">Analyzing client data and scenario options</p>
                <div className="w-64 mb-2">
                  <Progress value={progress} className="h-2" />
                </div>
                <p className="text-xs text-gray-400">{progress}% complete</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}

      {/* Segmentation tabs */}
      <div className="w-full">
        <Tabs 
          defaultValue="industry" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="industry">By Industry</TabsTrigger>
            <TabsTrigger value="location">By Location</TabsTrigger>
            <TabsTrigger value="priority">By Priority</TabsTrigger>
          </TabsList>

          {/* Industry segmentation */}
          <TabsContent value="industry" className="w-full">
            <h2 className="text-xl font-semibold mb-4">Industry Segmentation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Object.entries(clientsByIndustry).map(([industry, clients]) => (
                <Card key={industry}>
                  <CardHeader className="pb-3">
                    <CardTitle>{industry}</CardTitle>
                    <CardDescription>{clients.length} potential clients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {clients.map((client) => (
                        <TooltipProvider key={client.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div 
                                className="relative cursor-pointer"
                                onClick={() => handleClientClick(client.id)}
                              >
                                <Avatar className={`border-2 size-12 ${getScoreColor(client.potentialScore)} bg-white`}>
                                  <AvatarImage src={client.avatarSrc} alt={client.name} />
                                  <AvatarFallback>{client.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 size-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white bg-gray-800">
                                  {client.potentialScore}
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <div className="flex flex-col">
                                <span className="font-bold">{client.name}</span>
                                <span>{client.position}</span>
                                <span>{client.company}</span>
                                <Badge variant="outline" className="mt-1 text-xs">{client.location}</Badge>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Location segmentation */}
          <TabsContent value="location" className="w-full">
            <h2 className="text-xl font-semibold mb-4">Geographic Segmentation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {Object.entries(clientsByLocation).map(([location, clients]) => (
                <Card key={location}>
                  <CardHeader className="pb-3">
                    <CardTitle>{location}</CardTitle>
                    <CardDescription>{clients.length} potential clients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {clients.map((client) => (
                        <TooltipProvider key={client.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div 
                                className="relative cursor-pointer"
                                onClick={() => handleClientClick(client.id)}
                              >
                                <Avatar className={`border-2 size-12 ${getScoreColor(client.potentialScore)} bg-white`}>
                                  <AvatarImage src={client.avatarSrc} alt={client.name} />
                                  <AvatarFallback>{client.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 size-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white bg-gray-800">
                                  {client.potentialScore}
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <div className="flex flex-col">
                                <span className="font-bold">{client.name}</span>
                                <span>{client.position}</span>
                                <span>{client.company}</span>
                                <Badge variant="outline" className="mt-1 text-xs">{client.industry}</Badge>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Priority segmentation */}
          <TabsContent value="priority" className="w-full">
            <h2 className="text-xl font-semibold mb-4">Priority Segmentation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {['High', 'Medium', 'Standard'].map((priority) => {
                const clients = clientsByPriority[priority] || [];
                const bgColor = priority === 'High' ? 'bg-emerald-50' : 
                               priority === 'Medium' ? 'bg-blue-50' : 'bg-violet-50';
                const borderColor = priority === 'High' ? 'border-emerald-200' : 
                                  priority === 'Medium' ? 'border-blue-200' : 'border-violet-200';
                
                return (
                  <Card key={priority} className={`${bgColor} border ${borderColor}`}>
                    <CardHeader className="pb-3">
                      <CardTitle>
                        {priority} Priority
                        <span className="text-sm font-normal ml-2">
                          ({priority === 'High' ? '85-100' : priority === 'Medium' ? '75-84' : '65-74'})
                        </span>
                      </CardTitle>
                      <CardDescription>{clients.length} potential clients</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {clients.map((client) => (
                          <TooltipProvider key={client.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div 
                                  className="relative cursor-pointer"
                                  onClick={() => handleClientClick(client.id)}
                                >
                                  <Avatar className={`border-2 size-12 ${getScoreColor(client.potentialScore)} bg-white`}>
                                    <AvatarImage src={client.avatarSrc} alt={client.name} />
                                    <AvatarFallback>{client.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <div className="absolute -bottom-1 -right-1 size-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white bg-gray-800">
                                    {client.potentialScore}
                                  </div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                <div className="flex flex-col">
                                  <span className="font-bold">{client.name}</span>
                                  <span>{client.position}</span>
                                  <span>{client.company}</span>
                                  <div className="flex gap-1 mt-1">
                                    <Badge variant="outline" className="text-xs">{client.industry}</Badge>
                                    <Badge variant="outline" className="text-xs">{client.location}</Badge>
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 justify-center mt-4">
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-full bg-emerald-500"></div>
          <span className="text-sm">High Priority (85-100)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-full bg-blue-500"></div>
          <span className="text-sm">Medium Priority (75-84)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-full bg-violet-500"></div>
          <span className="text-sm">Standard Priority (65-74)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-5 font-bold text-xs flex items-center justify-center text-white bg-gray-800 rounded-full">95</div>
          <span className="text-sm">Client Score</span>
        </div>
      </div>
    </div>
  );
};

export default ClientDirectoryView;
