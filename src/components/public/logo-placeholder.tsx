import { cn } from "@/lib/utils"
import Image from "next/image"

export function LogoPlaceholder({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-heading font-bold text-xl text-primary", className)}>
      <div className="relative h-10 w-10 overflow-hidden rounded-md">
        <Image 
          src="/brand/logo.jpeg" 
          alt="UEDS Logo" 
          fill
          className="object-contain"
        />
      </div>
      <span>UEDS</span>
    </div>
  )
}
