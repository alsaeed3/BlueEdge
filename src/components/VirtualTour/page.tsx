'use client';

import React from 'react';
import VirtualTour from './VirtualTour';

export default function VirtualTourPage() {
  // Define your scenes without hotspots, just using titles and images for navigation
  const scenes = {
    livingRoom: {
      title: 'Living Room',
      image: '/living.jpg',
    },
    kitchen: {
      title: 'Kitchen',
      image: '/kitchen.jpg',
    },
    // You can add more scenes here as needed
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <VirtualTour scenes={scenes} />
    </div>
  );
}