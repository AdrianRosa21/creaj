"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Zap, Play, Filter, AlertTriangle, Info } from "lucide-react"
import Image from "next/image"

interface HotspotProps {
  id: string
  x: number
  y: number
  label: string
  description: string
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
}

function Hotspot({ x, y, label, description, icon, isActive, onClick }: HotspotProps) {
  return (
    <div 
      className="absolute z-20 flex flex-col items-center"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
      <button
        onClick={onClick}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-lg transition-all hover:scale-110",
          isActive ? "ring-2 ring-primary scale-110" : "ring-1 ring-border"
        )}
      >
        <div className={cn("text-muted-foreground", isActive && "text-primary")}>
          {icon}
        </div>
        {isActive && (
          <span className="absolute -inset-2 animate-ping rounded-full bg-primary/20" />
        )}
      </button>
      
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-12 w-48 rounded-lg border bg-background p-3 shadow-xl text-center"
          >
            <h4 className="font-semibold text-sm">{label}</h4>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function MachineVisual({ className }: { className?: string }) {
  const [activeSpot, setActiveSpot] = React.useState<string | null>(null)

  const hotspots = [
    {
      id: "motor",
      x: 20,
      y: 40,
      label: "Motor Eléctrico",
      description: "Genera la fuerza necesaria para triturar la caña con alta eficiencia.",
      icon: <Zap className="h-5 w-5" />
    },
    {
      id: "rodillos",
      x: 50,
      y: 35,
      label: "Rodillos Metálicos",
      description: "Comprimen la caña a alta presión para extraer el máximo de sacarosa.",
      icon: <Play className="h-5 w-5" />
    },
    {
      id: "canal",
      x: 75,
      y: 70,
      label: "Canal de Recolección",
      description: "Conduce el jugo extraído hacia el recipiente de forma higiénica.",
      icon: <Filter className="h-5 w-5" />
    },
    {
      id: "emergencia",
      x: 85,
      y: 20,
      label: "Paro de Emergencia",
      description: "Sistema de seguridad industrial para detener la máquina al instante.",
      icon: <AlertTriangle className="h-5 w-5 text-destructive" />
    }
  ]

  return (
    <div className={cn("relative w-full max-w-3xl mx-auto aspect-video rounded-xl bg-muted/30 border overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-10 pointer-events-none" />
      
      {/* Prototype Image */}
      <Image 
        src="/brand/Machine.jpeg" 
        alt="Prototipo de máquina de extracción de sacarosa" 
        fill
        className="object-cover opacity-80 mix-blend-multiply" 
      />

      {/* Disclaimer / Prototype Badge */}
      <div className="absolute top-4 left-4 z-30 bg-background/80 backdrop-blur-sm border rounded-lg p-3 shadow-sm max-w-xs flex items-start gap-3">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-semibold mb-1">Prototipo Visual</p>
          <p className="text-muted-foreground">Esta imagen es una representación visual (prototipo) de cómo será la máquina. Aún faltan ajustes de diseño e integración real.</p>
        </div>
      </div>
      
      {hotspots.map((spot) => (
        <Hotspot
          key={spot.id}
          {...spot}
          isActive={activeSpot === spot.id}
          onClick={() => setActiveSpot(activeSpot === spot.id ? null : spot.id)}
        />
      ))}
      
      {activeSpot && (
        <div 
          className="absolute inset-0 z-10" 
          onClick={() => setActiveSpot(null)}
        />
      )}
    </div>
  )
}
