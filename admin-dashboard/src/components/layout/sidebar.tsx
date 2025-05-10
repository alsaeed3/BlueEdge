"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Building2, 
  Users, 
  BarChart3, 
  FileText, 
  Settings, 
  BrainCircuit,
  CalendarDays,
  MessageSquare
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const routes = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
  },
  {
    label: 'Properties',
    icon: Building2,
    href: '/properties',
  },
  {
    label: 'Tenants',
    icon: Users,
    href: '/tenants',
  },
  {
    label: 'Potential Clients',
    icon: Users,
    href: '/potential-clients',
  },
  {
    label: 'Analytics',
    icon: BarChart3,
    href: '/analytics',
  },
  {
    label: 'AI Insights',
    icon: BrainCircuit,
    href: '/ai-insights',
  },
  {
    label: 'Maintenance',
    icon: FileText,
    href: '/maintenance',
  },
  {
    label: 'Calendar',
    icon: CalendarDays,
    href: '/calendar',
  },
  {
    label: 'Messaging',
    icon: MessageSquare,
    href: '/messaging',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  }
]

export function Sidebar() {
  const pathname = usePathname()
  
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-neutral-900 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <h1 className="text-2xl font-bold">G</h1>
          </div>
          <h1 className="text-2xl font-bold">
            Gargash Admin
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              asChild
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === route.href ? "bg-white/10 text-white" : "text-zinc-400"
              )}
            >
              <Link
                href={route.href}
                className="flex items-center"
              >
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
