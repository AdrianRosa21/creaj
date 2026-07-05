"use client"

import { motion } from "framer-motion"
import { ArrowDown, Factory, Filter, Droplets, ArrowRight } from "lucide-react"

export function ProcessAnimation() {
  return (
    <div className="relative w-full aspect-square bg-white rounded-2xl shadow-sm border p-8 flex flex-col items-center justify-between">
      {/* 1. Alimentación */}
      <motion.div 
        className="flex flex-col items-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="h-14 w-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2">
          <Factory className="h-7 w-7" />
        </div>
        <span className="text-sm font-medium">Alimentación</span>
      </motion.div>

      {/* Arrow Down */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-muted-foreground"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.div>

      <div className="flex w-full justify-between items-center px-4">
        {/* 2. Extracción */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="h-16 w-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-2 relative overflow-hidden">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-2 border-4 border-dashed border-orange-300 rounded-full"
            />
            <Factory className="h-8 w-8 relative z-10" />
          </div>
          <span className="text-sm font-medium">Extracción</span>
        </motion.div>

        {/* Arrow Right */}
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
          className="text-muted-foreground"
        >
          <ArrowRight className="h-6 w-6" />
        </motion.div>

        {/* 4. Salida (Bagazo) */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="h-14 w-14 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mb-2">
            <Factory className="h-7 w-7" />
          </div>
          <span className="text-sm font-medium">Salida (Bagazo)</span>
        </motion.div>
      </div>

      {/* Arrow Down from Extracción */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}
        className="text-muted-foreground absolute bottom-32 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.div>

      {/* 3. Filtrado */}
      <motion.div 
        className="flex flex-col items-center mt-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <div className="h-16 w-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2 relative">
          <Filter className="h-8 w-8" />
          <motion.div
            animate={{ y: [0, 10], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute -bottom-4 text-blue-400"
          >
            <Droplets className="h-5 w-5" />
          </motion.div>
        </div>
        <span className="text-sm font-medium">Filtrado (Jugo)</span>
      </motion.div>
    </div>
  )
}
