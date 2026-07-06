"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Leaf, Shield, CheckCircle2, Zap, Play, Filter, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"
import { MachineVisual } from "./machine-visual"
import { MOCK_REWARDS } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { ProcessAnimation } from "./process-animation"
import { getActiveRewards } from "@/lib/services/rewards"
import { Reward } from "@/types/domain"

export function HeroSection() {
  const machineFeatures = [
    {
      title: "Motor Eléctrico",
      desc: "Genera la fuerza necesaria para triturar la caña con alta eficiencia.",
      icon: <Zap className="h-6 w-6" />
    },
    {
      title: "Rodillos Metálicos",
      desc: "Comprimen la caña a alta presión para extraer el máximo de sacarosa.",
      icon: <Play className="h-6 w-6" />
    },
    {
      title: "Canal de Recolección",
      desc: "Conduce el jugo extraído hacia el recipiente de forma higiénica.",
      icon: <Filter className="h-6 w-6" />
    },
    {
      title: "Paro de Emergencia",
      desc: "Sistema de seguridad industrial para detener la máquina al instante.",
      icon: <AlertTriangle className="h-6 w-6 text-destructive" />
    }
  ]

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <Container className="relative">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          
          <div className="flex-1 text-center lg:text-left flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                De la caña al valor.
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Una experiencia que conecta ingeniería, aprovechamiento agroindustrial y un sistema interactivo de recompensas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/proyecto">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Explorar el proyecto <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/crear-cuenta">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Crear mi cuenta
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-muted/50 border rounded-2xl p-5 shadow-sm flex items-start gap-4 text-left"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-foreground text-base mb-1">Prototipo Visual</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Esta imagen es una representación visual (prototipo) de cómo será la máquina. Aún faltan ajustes de diseño e integración real.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left"
            >
              {machineFeatures.map((feature, idx) => (
                <div key={idx} className="flex gap-4 p-5 border rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center shrink-0 text-foreground">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-base mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex-1 w-full max-w-xl lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full"
            >
              <MachineVisual />
            </motion.div>
          </div>
          
        </div>
      </Container>
    </section>
  )
}

export function ProblemSection() {
  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <SectionHeader 
          title="El Problema Artesanal" 
          description="Por qué necesitamos mejorar los procesos de extracción."
          className="text-center mb-12 items-center"
        />
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-background border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Baja Seguridad</h3>
              <p className="text-sm text-muted-foreground">Los trapiches tradicionales a menudo carecen de guardas y botones de paro, causando accidentes graves.</p>
            </CardContent>
          </Card>
          <Card className="bg-background border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Desperdicio</h3>
              <p className="text-sm text-muted-foreground">La extracción manual deja mucha sacarosa en la caña, desaprovechando recursos valiosos.</p>
            </CardContent>
          </Card>
          <Card className="bg-background border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Ineficiencia</h3>
              <p className="text-sm text-muted-foreground">Procesos lentos y poco estandarizados que impiden el control de calidad adecuado.</p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}

export function HowItWorksSection() {
  const steps = [
    { title: "Alimentación", desc: "La caña se introduce de forma segura en la tolva de entrada." },
    { title: "Extracción", desc: "Los rodillos metálicos accionados comprimen el tallo." },
    { title: "Filtrado", desc: "El jugo se canaliza de forma higiénica a su contenedor." },
    { title: "Salida", desc: "El bagazo seco se expulsa para su futuro aprovechamiento." },
  ]
  return (
    <section className="py-20 bg-background">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <SectionHeader 
              title="Cómo Funciona" 
              description="Un proceso automatizado y seguro en 4 pasos."
              className="mb-8"
            />
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{step.title}</h4>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full max-w-md">
            <ProcessAnimation />
          </div>
        </div>
      </Container>
    </section>
  )
}


export function RewardsPreviewSection() {
  const [rewards, setRewards] = useState<Reward[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getActiveRewards().then(res => {
      setRewards(res)
      setLoading(false)
    })
  }, [])

  const steps = [
    { number: "1", title: "Entrega tu caña", desc: "Acércate al módulo del trapiche con tus cañas de azúcar." },
    { number: "2", title: "Acumula Puntos", desc: "Un administrador registrará tu entrega y se te sumarán 10 pts por caña a tu saldo." },
    { number: "3", title: "Canjea Premios", desc: "Elige una recompensa del catálogo, solicítala y recíbela al instante." },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <SectionHeader 
          title="Sistema de Puntos y Premios" 
          description="Participa en nuestra demostración interactiva diseñada para motivar y recompensar la participación."
          className="text-center mb-12 items-center"
        />
        
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto text-center">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold mb-4 text-lg">
                {step.number}
              </div>
              <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {loading ? (
            <div className="col-span-full text-center py-10 text-muted-foreground">Cargando catálogo...</div>
          ) : rewards.length === 0 ? (
            <div className="col-span-full text-center py-10 text-muted-foreground">Próximamente más premios disponibles.</div>
          ) : (
            rewards.slice(0, 4).map(reward => (
              <Card key={reward.id} className="overflow-hidden border-none shadow-sm">
                <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                  {reward.imageUrl ? (
                    <img src={reward.imageUrl} alt={reward.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl">🎁</span>
                  )}
                </div>
                <CardContent className="p-4 text-center">
                  <h4 className="font-semibold">{reward.name}</h4>
                  <p className="text-sm font-medium text-primary mt-1">{reward.costPoints} pts</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <div className="text-center">
          <Link href="/recompensas">
            <Button variant="outline">Ver catálogo completo</Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}
