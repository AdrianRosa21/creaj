"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Info, Zap, Play, Filter, AlertTriangle } from "lucide-react"
import Image from "next/image"

export function MachineVisual({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-[500px] lg:h-[700px] relative mx-auto", className)}>
      <Image 
        src="/brand/Machine.jpeg" 
        alt="Prototipo de máquina de extracción de sacarosa" 
        fill
        className="object-contain rounded-3xl drop-shadow-2xl" 
        priority
      />
    </div>
  )
}
