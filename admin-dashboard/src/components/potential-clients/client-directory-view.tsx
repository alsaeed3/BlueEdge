"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { potentialClients } from '@/lib/potential-clients-data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Spinner } from '@/components/ui/spinner';
import { Progress } from '@/components/ui/progress';

const ClientDirectoryView = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Filter out featured client for special display
  const featuredClient = potentialClients.find(client => client.isFeatured);
  const regularClients = potentialClients.filter(client => !client.isFeatured);

  // Function to determine which concentric circle a client should be in based on score
  const getClientCircle = (score: number) => {
    if (score >= 85) return 0; // Inner circle
    if (score >= 75) return 1; // Middle circle
    return 2; // Outer circle
  };

  // Group clients by their circle
  const clientsByCircle = regularClients.reduce<{ [key: number]: typeof regularClients }>(
    (acc, client) => {
      const circle = getClientCircle(client.potentialScore);
      if (!acc[circle]) acc[circle] = [];
      acc[circle].push(client);
      return acc;
    },
    {}
  );

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

  // Function to calculate size based on score (for non-featured clients)
  const getClientSize = (score: number) => {
    if (score >= 85) return 'size-24';
    if (score >= 75) return 'size-20';
    return 'size-16';
  };

  return (
    <div className="container flex flex-col items-center mx-auto">
      <h1 className="text-3xl font-bold mb-2">Potential Client Directory</h1>
      <p className="text-gray-500 mb-8 text-center max-w-2xl">
        Browse potential clients based on their priority score. Clients with higher scores are positioned 
        closer to the center, representing higher opportunity value.
      </p>

      {/* Featured client section */}
      {featuredClient && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-center">Featured Client</h2>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card 
              className="flex flex-col items-center p-6 cursor-pointer border-2 border-emerald-500 bg-gradient-to-b from-emerald-50 to-white relative"
              onClick={() => handleClientClick(featuredClient.id)}
            >
              <Badge variant="default" className="absolute top-4 right-4 bg-emerald-500">Featured</Badge>

              <div className="relative mb-4">
                <Avatar className="size-32 border-4 border-emerald-500">
                  <AvatarImage src={featuredClient.avatarSrc} alt={featuredClient.name} />
                  <AvatarFallback>{featuredClient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 size-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white bg-emerald-500">
                  {featuredClient.potentialScore}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">{featuredClient.name}</h3>
                <p className="text-gray-500">{featuredClient.position}</p>
                <p className="text-gray-500">{featuredClient.company}</p>
                <div className="mt-4">
                  <Badge variant="outline" className="mr-2">{featuredClient.industry}</Badge>
                  <Badge variant="outline">{featuredClient.location}</Badge>
                </div>
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

      {/* Concentric circles of clients */}
      <div className="relative w-full max-w-4xl aspect-square flex items-center justify-center mb-12">
        {/* Outer circle guidelines (visual only) */}
        <div className="absolute rounded-full border-2 border-gray-100 size-[95%]"></div>
        <div className="absolute rounded-full border-2 border-gray-100 size-[70%]"></div>
        <div className="absolute rounded-full border-2 border-gray-100 size-[45%]"></div>

        {/* Map clients by their circles */}
        {[0, 1, 2].map((circle) => (
          <div 
            key={circle}
            className={`absolute rounded-full flex items-center justify-center
              ${circle === 0 ? 'size-[45%]' : circle === 1 ? 'size-[70%]' : 'size-[95%]'}`}
          >
            {clientsByCircle[circle]?.map((client, index) => {
              // Calculate position around the circle
              const clientCount = clientsByCircle[circle]?.length || 1;
              const angle = (index / clientCount) * 2 * Math.PI;
              const radius = circle === 0 ? '45%' : circle === 1 ? '70%' : '95%';
              const radiusPercent = parseInt(radius) / 2;
              
              // Convert polar coordinates to Cartesian
              const x = `${50 + radiusPercent * Math.cos(angle)}%`;
              const y = `${50 + radiusPercent * Math.sin(angle)}%`;

              return (
                <TooltipProvider key={client.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer"
                        style={{ left: x, top: y }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleClientClick(client.id)}
                      >
                        <div className="relative">
                          <Avatar className={`${getClientSize(client.potentialScore)} border-2 ${getScoreColor(client.potentialScore)} bg-white`}>
                            <AvatarImage src={client.avatarSrc} alt={client.name} className="object-cover" />
                            <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 size-6 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white bg-gray-800">
                            {client.potentialScore}
                          </div>
                        </div>
                        <p className="mt-1 text-xs font-medium max-w-24 text-center truncate">
                          {client.name}
                        </p>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
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
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-6 justify-center">
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
      </div>
    </div>
  );
};

export default ClientDirectoryView;
