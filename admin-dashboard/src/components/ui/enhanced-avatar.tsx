"use client";

import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface EnhancedAvatarProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export const EnhancedAvatar = ({ 
  src, 
  alt, 
  className = "", 
  fallbackClassName = ""
}: EnhancedAvatarProps) => {
  const [hasError, setHasError] = useState(false);
  const initials = alt.split(' ').map(n => n[0]).join('');

  return (
    <Avatar className={className}>
      {src && !hasError ? (
        <AvatarImage 
          src={src} 
          alt={alt} 
          onError={() => setHasError(true)} 
          loading="lazy"
        />
      ) : null}
      <AvatarFallback delayMs={src ? 600 : 0} className={fallbackClassName}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default EnhancedAvatar;
