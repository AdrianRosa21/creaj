"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Info, Zap, Play, Filter, AlertTriangle } from "lucide-react"
import Image from "next/image"

export function MachineVisual({ className }: { className?: string }) {
  return (
    <div className={cn("w-full max-w-md lg:max-w-xl mx-auto relative", className)}>
      <img 
        src="/brand/Machine.jpeg" 
        alt="Prototipo de máquina de extracción de sacarosa" 
        className="w-full h-auto rounded-3xl drop-shadow-2xl border" 
      />
    </div>
  )
}
