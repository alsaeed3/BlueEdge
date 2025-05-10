import * as React from "react"
import { cn } from "@/lib/utils"

const Timeline = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative ml-4 pl-8 pb-8 space-y-6 border-l border-neutral-200", className)}
    {...props}
  />
))
Timeline.displayName = "Timeline"

const TimelineItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative", className)}
    {...props}
  />
))
TimelineItem.displayName = "TimelineItem"

const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute -left-10 top-2 w-4 h-0.5 bg-neutral-200", className)}
    {...props}
  />
))
TimelineConnector.displayName = "TimelineConnector"

const TimelineIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { icon: React.ElementType }
>(({ className, icon: Icon, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute -left-14 flex items-center justify-center w-7 h-7 rounded-full bg-white border border-neutral-200", className)}
    {...props}
  >
    <Icon className="w-4 h-4 text-neutral-600" />
  </div>
))
TimelineIcon.displayName = "TimelineIcon"

const TimelineHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center text-sm font-semibold mb-1", className)}
    {...props}
  />
))
TimelineHeader.displayName = "TimelineHeader"

const TimelineBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-neutral-600", className)}
    {...props}
  />
))
TimelineBody.displayName = "TimelineBody"

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  TimelineHeader,
  TimelineBody,
}
