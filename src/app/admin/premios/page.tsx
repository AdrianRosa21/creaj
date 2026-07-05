"use client"

import * as React from "react"
import { collection, getDocs, doc, writeBatch } from "firebase/firestore"
import { db } from "@/lib/firebase/client"
import { Reward } from "@/types/domain"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Database, Plus } from "lucide-react"
import { toast } from "sonner"

const SEED_DATA: Partial<Reward>[] = [
  { name: "Chicle", description: "Sabor menta o fresa.", costPoints: 20, stock: 30, imageUrl: "https://images.unsplash.com/photo-1598424160408-db2c91834226?w=400&q=80", active: true },
  { name: "Paleta", description: "Paleta de caramelo macizo.", costPoints: 30, stock: 25, imageUrl: "https://images.unsplash.com/photo-1575224300306-1b8da36134ec?w=400&q=80", active: true },
  { name: "Gomitas mini", description: "Bolsita de gomitas de osito.", costPoints: 40, stock: 25, imageUrl: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&q=80", active: true },
  { name: "Sticker UEDS", description: "Sticker oficial de la unidad.", costPoints: 50, stock: 40, imageUrl: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=400&q=80", active: true },
  { name: "Pulsera UEDS", description: "Pulsera de silicona conmemorativa.", costPoints: 70, stock: 20, imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80", active: true },
  { name: "Combo dulce", description: "Un surtido de los mejores dulces.", costPoints: 90, stock: 15, imageUrl: "https://images.unsplash.com/photo-1499540633125-484965b60031?w=400&q=80", active: true },
  { name: "Premio sorpresa", description: "¡No sabrás qué es hasta que lo abras!", costPoints: 120, stock: 8, imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80", active: true },
]

export default function PremiosAdminPage() {
  const [rewards, setRewards] = React.useState<Reward[]>([])
  const [loading, setLoading] = React.useState(true)
  const [isSeeding, setIsSeeding] = React.useState(false)

  const loadRewards = async () => {
    setLoading(true)
    try {
      const snap = await getDocs(collection(db, "rewards"))
      setRewards(snap.docs.map(d => ({ id: d.id, ...d.data() } as Reward)))
    } catch {
      toast.error("Error al cargar premios")
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadRewards()
  }, [])

  const handleSeed = async () => {
    if (!confirm("Esto agregará los datos semilla. ¿Continuar?")) return
    setIsSeeding(true)
    try {
      const batch = writeBatch(db)
      SEED_DATA.forEach(reward => {
        const ref = doc(collection(db, "rewards"))
        batch.set(ref, {
          ...reward,
          id: ref.id,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      })
      await batch.commit()
      toast.success("Catálogo inyectado correctamente")
      loadRewards()
    } catch {
      toast.error("Error al inyectar catálogo")
    } finally {
      setIsSeeding(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black font-heading tracking-tight">Catálogo de Premios</h1>
          <p className="text-muted-foreground">Administra el inventario disponible.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSeed} disabled={isSeeding}>
            {isSeeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
            Cargar Datos Semilla
          </Button>
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Premio
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin" /></div>
      ) : rewards.length === 0 ? (
        <div className="text-center p-12 bg-muted/30 rounded-lg border-2 border-dashed">
          <h3 className="font-bold text-lg">Catálogo vacío</h3>
          <p className="text-muted-foreground mb-4">No hay premios registrados en la base de datos.</p>
          <Button onClick={handleSeed} disabled={isSeeding}>
             Cargar Datos Semilla
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rewards.map(reward => (
            <Card key={reward.id} className={!reward.active ? "opacity-60 grayscale" : ""}>
              <div 
                className="h-32 bg-cover bg-center rounded-t-lg" 
                style={{ backgroundImage: `url(${reward.imageUrl})` }}
              />
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{reward.name}</h3>
                  <span className="bg-primary/10 text-primary font-bold px-2 py-0.5 rounded text-sm">
                    {reward.costPoints} pts
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Stock:</span>
                  <span className={`font-bold ${reward.stock <= 10 ? 'text-destructive' : ''}`}>
                    {reward.stock} uds
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}