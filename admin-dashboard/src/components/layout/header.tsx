"use client"

import { useEffect, useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';

export function Header() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 justify-between">
        <div className="flex items-center gap-x-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute top-3 left-3 text-neutral-500" />
            <input
              placeholder="Search..."
              className="pl-9 pr-4 py-2 rounded-md border border-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  3
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  You have 3 unread notifications
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-4 rounded-lg bg-neutral-50 p-3">
                  <div>
                    <h4 className="font-semibold">Maintenance Request</h4>
                    <p className="text-sm">New maintenance request for Property #1234</p>
                    <p className="mt-1 text-xs text-neutral-500">10 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg bg-neutral-50 p-3">
                  <div>
                    <h4 className="font-semibold">Payment Received</h4>
                    <p className="text-sm">Tenant John Doe has paid their monthly rent</p>
                    <p className="mt-1 text-xs text-neutral-500">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg bg-neutral-50 p-3">
                  <div>
                    <h4 className="font-semibold">Lease Expiring</h4>
                    <p className="text-sm">Lease for Property #5678 is expiring in 30 days</p>
                    <p className="mt-1 text-xs text-neutral-500">2 hours ago</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  {/* Removed image to prevent 404 errors */}
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex md:flex-col md:items-start">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-neutral-500">admin@Escoutly.com</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
