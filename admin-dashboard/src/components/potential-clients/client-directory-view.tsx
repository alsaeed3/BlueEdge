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
  const [activeTab, setActiveTab] = useState<string>("segmentation");

  // All clients for display
  const allClients = potentialClients;

  // Function to get priority level based on score
  const getPriorityLevel = (score: number) => {
    if (score >= 85) return "High";
    if (score >= 75) return "Medium";
    return "Standard";
  };
  
  // Group clients by industry
  const clientsByIndustry = useMemo(() => {
    return allClients.reduce<{ [key: string]: typeof allClients }>(
      (acc, client) => {
        if (!acc[client.industry]) acc[client.industry] = [];
        acc[client.industry].push(client);
        return acc;
      },
      {}
    );
  }, [allClients]);

  // Group clients by location
  const clientsByLocation = useMemo(() => {
    return allClients.reduce<{ [key: string]: typeof allClients }>(
      (acc, client) => {
        if (!acc[client.location]) acc[client.location] = [];
        acc[client.location].push(client);
        return acc;
      },
      {}
    );
  }, [allClients]);
  
  // Group clients by priority level
  const clientsByPriority = useMemo(() => {
    return allClients.reduce<{ [key: string]: typeof allClients }>(
      (acc, client) => {
        const priority = getPriorityLevel(client.potentialScore);
        if (!acc[priority]) acc[priority] = [];
        acc[priority].push(client);
        return acc;
      },
      {}
    );
  }, [allClients]);
  
  // Group clients by segmentation (for tier chart)
  const clientsBySegment = useMemo(() => {
    // Tier 1: Simeon plus 4 more high-potential clients (reduced from 6)
    // Tier 2: Medium priority clients with good potential + duplicated clients to double size
    // Tier 3: Standard priority clients + duplicated clients to double size
    
    // Ensure Simeon is in Tier 1
    const simeonClient = allClients.find(client => client.id === 'simeon-wansi');
    
    // Get top clients by potential score (excluding Simeon) - REDUCED TO 4 (from 6)
    const otherHighValueClients = allClients
      .filter(client => client.id !== 'simeon-wansi')
      .sort((a, b) => b.potentialScore - a.potentialScore)
      .slice(0, 4);
    
    // Create Tier 1 with Simeon and 4 other clients
    const tier1 = simeonClient ? [simeonClient, ...otherHighValueClients] : otherHighValueClients;
    
    // Rest of clients for Tier 2 and 3
    const remainingClients = allClients.filter(
      client => !tier1.some(t1Client => t1Client.id === client.id)
    );
    
    // Get clients for tier 2 based on score
    const originalTier2 = remainingClients.filter(client => client.potentialScore >= 75);
    const tier3Clients = remainingClients.filter(client => client.potentialScore < 75);
    
    // ENHANCED DUPLICATION: Create duplicates to double the size of Tier 2
    
    // First round of duplicates: tier 1 clients (except Simeon)
    const tier1DuplicatesForTier2 = tier1
      .filter(client => client.id !== 'simeon-wansi')
      .map(client => ({...client, id: `${client.id}-duplicate-t2-1`}));
      
    // Second round of duplicates: original tier 2 clients 
    const tier2DuplicatesForTier2 = originalTier2
      .map(client => ({...client, id: `${client.id}-duplicate-t2-2`}));
    
    // Third round of duplicates: some tier 3 clients
    const tier3DuplicatesForTier2 = tier3Clients
      .slice(0, originalTier2.length)
      .map(client => ({...client, id: `${client.id}-duplicate-t2-3`}));
    
    // Combine original tier 2 with duplicates to double the size
    const tier2 = [
      ...originalTier2, 
      ...tier1DuplicatesForTier2,
      ...tier2DuplicatesForTier2,
      ...tier3DuplicatesForTier2
    ];
    
    // Create duplicates to double the size of Tier 3
    const tier3Duplicates = tier3Clients.map(client => ({
      ...client, 
      id: `${client.id}-duplicate-t3`
    }));
    
    // Double the size of Tier 3
    const expandedTier3 = [...tier3Clients, ...tier3Duplicates];
    
    return {
      "Tier 1": tier1,
      "Tier 2": tier2,
      "Tier 3": expandedTier3
    };
  }, [allClients]);

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
  const totalClients = allClients.length;

  return (
    <div className="container flex flex-col items-center mx-auto">
      <h1 className="text-3xl font-bold mb-2">Customer Tiering</h1>
      <p className="text-gray-500 mb-8 text-center max-w-2xl">
        Explore our potential customer base through our three-tier prioritization system.
        Visualize customers by different dimensions to identify key target clients.
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

      {/* Segmentation tabs */}
      <div className="w-full">
        <Tabs 
          defaultValue="segmentation" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="segmentation">Customer Tiers</TabsTrigger>
            <TabsTrigger value="industry">By Industry</TabsTrigger>
            <TabsTrigger value="location">By Location</TabsTrigger>
            <TabsTrigger value="priority">By Priority</TabsTrigger>
          </TabsList>

          {/* Customer Segmentation - Tiers Chart */}
          <TabsContent value="segmentation" className="w-full">
            <h2 className="text-xl font-semibold mb-4">Customer Tiering Analysis</h2>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <h3 className="font-medium text-emerald-800">Tier 1: High Priority</h3>
                <p className="text-sm text-gray-600">Top-tier potential clients with highest value potential or strategic importance, scoring 90-100.</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800">Tier 2: Medium Priority</h3>
                <p className="text-sm text-gray-600">Important potential clients with good revenue potential, scoring 75-89.</p>
              </div>
              <div className="p-3 bg-violet-50 rounded-lg border border-violet-200">
                <h3 className="font-medium text-violet-800">Tier 3: Standard Priority</h3>
                <p className="text-sm text-gray-600">Regular potential clients that require standard engagement approach, scoring below 75.</p>
              </div>
            </div>
            <div className="relative w-full h-[600px] border border-gray-200 rounded-lg bg-gradient-to-b from-teal-900/90 to-indigo-900/90 mb-8">
              {/* Chart axes labels */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 text-white font-medium">
                Business Value
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-medium">
                Client Tiers
              </div>
              
              {/* Tier layout - vertical sections */}
              <div className="absolute inset-0 flex flex-col items-center">
                {/* Tier 1 - Top */}
                <div className="w-full flex-1 flex items-center justify-center border-b border-white/20">
                  <div className="text-center">
                    <div className="text-white mb-2 bg-emerald-600 inline-block px-3 py-1 rounded-md">
                      Tier 1: High Priority
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {clientsBySegment["Tier 1"].map((client) => (
                        <TooltipProvider key={client.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div 
                                className="relative cursor-pointer"
                                onClick={() => handleClientClick(client.id)}
                              >
                                <Avatar className={`border-2 size-12 ${
                                  client.id === 'simeon-wansi' 
                                    ? 'border-4 border-emerald-400 ring-2 ring-emerald-300' 
                                    : 'border-emerald-400'
                                } bg-white`}>
                                  <AvatarImage src={client.avatarSrc} alt={client.name} />
                                  <AvatarFallback>{client.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 size-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white bg-gray-800">
                                  {client.potentialScore}
                                </div>
                                {client.id === 'simeon-wansi' && (
                                  <div className="absolute -top-2 -right-2 size-6 flex items-center justify-center text-white text-xs font-bold rounded-full bg-emerald-500 border-2 border-white">
                                    ★
                                  </div>
                                )}
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
                                {client.id === 'simeon-wansi' && (
                                  <Badge className="mt-1.5 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                                    Click to view detailed scenario
                                  </Badge>
                                )}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Tier 2 - Middle */}
                <div className="w-full flex-1 flex items-center justify-center border-b border-white/20">
                  <div className="text-center">
                    <div className="text-white mb-2 bg-blue-600 inline-block px-3 py-1 rounded-md">
                      Tier 2: Medium Priority
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {clientsBySegment["Tier 2"].map((client) => (
                        <TooltipProvider key={client.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div 
                                className="relative cursor-pointer"
                                onClick={() => handleClientClick(client.id)}
                              >
                                <Avatar className="border-2 border-blue-400 size-12 bg-white">
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
                  </div>
                </div>
                
                {/* Tier 3 - Bottom */}
                <div className="w-full flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white mb-2 bg-violet-600 inline-block px-3 py-1 rounded-md">
                      Tier 3: Standard Priority
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {clientsBySegment["Tier 3"].map((client) => (
                        <TooltipProvider key={client.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div 
                                className="relative cursor-pointer"
                                onClick={() => handleClientClick(client.id)}
                              >
                                <Avatar className="border-2 border-violet-400 size-12 bg-white">
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
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
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
    </div>
  );
};

export default ClientDirectoryView;
