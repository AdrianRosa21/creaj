"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"
import Image from "next/image"

export function MachineVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full max-w-3xl mx-auto aspect-video rounded-xl bg-muted/30 border overflow-hidden shadow-sm", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-10 pointer-events-none" />
      
      {/* Prototype Image */}
      <Image 
        src="/brand/Machine.jpeg" 
        alt="Prototipo de máquina de extracción de sacarosa" 
        fill
        className="object-cover opacity-90 mix-blend-multiply" 
      />

      {/* Disclaimer / Prototype Badge */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 bg-background/95 backdrop-blur-md border rounded-2xl p-4 shadow-lg max-w-sm w-[90%] flex items-start gap-3">
        <div className="h-6 w-6 rounded-full border-2 border-primary/50 text-primary flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="text-sm">
          <p className="font-semibold text-foreground mb-1">Prototipo Visual</p>
          <p className="text-muted-foreground leading-relaxed">
            Esta imagen es una representación visual (prototipo) de cómo será la máquina. Aún faltan ajustes de diseño e integración real.
          </p>
        </div>
      </div>
    </div>
  )
}
