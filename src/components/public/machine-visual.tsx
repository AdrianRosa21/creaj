"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Info, Zap, Play, Filter, AlertTriangle } from "lucide-react"
import Image from "next/image"

export function MachineVisual({ className }: { className?: string }) {
  const machineFeatures = [
    {
      title: "Motor Eléctrico",
      desc: "Genera la fuerza necesaria para triturar la caña con alta eficiencia.",
      icon: <Zap className="h-5 w-5" />
    },
    {
      title: "Rodillos Metálicos",
      desc: "Comprimen la caña a alta presión para extraer el máximo de sacarosa.",
      icon: <Play className="h-5 w-5" />
    },
    {
      title: "Canal de Recolección",
      desc: "Conduce el jugo extraído hacia el recipiente de forma higiénica.",
      icon: <Filter className="h-5 w-5" />
    },
    {
      title: "Paro de Emergencia",
      desc: "Sistema de seguridad industrial para detener la máquina al instante.",
      icon: <AlertTriangle className="h-5 w-5 text-destructive" />
    }
  ]

  return (
    <div className={cn("w-full max-w-3xl mx-auto flex flex-col gap-6", className)}>
      {/* 1. Disclaimer / Prototype Badge (Arriba y separado) */}
      <div className="bg-muted/50 border rounded-2xl p-5 shadow-sm flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-foreground text-base mb-1">Prototipo Visual</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Esta imagen es una representación visual (prototipo) de cómo será la máquina. Aún faltan ajustes de diseño e integración real.
          </p>
        </div>
      </div>

      {/* 2. Image (En medio) */}
      <div className="relative w-full aspect-video rounded-xl bg-muted/30 border overflow-hidden shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-10 pointer-events-none" />
        <Image 
          src="/brand/Machine.jpeg" 
          alt="Prototipo de máquina de extracción de sacarosa" 
          fill
          className="object-cover opacity-90 mix-blend-multiply" 
        />
      </div>

      {/* 3. Funcionalidades (Abajo) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {machineFeatures.map((feature, idx) => (
          <div key={idx} className="flex gap-4 p-4 border rounded-xl bg-card">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0 text-foreground">
              {feature.icon}
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
