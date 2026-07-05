"use client"

import * as React from "react"
import { useAuth } from "@/components/auth-provider"
import { searchUsers } from "@/lib/services/admin"
import { confirmDelivery } from "@/app/admin/actions"
import { UserProfile } from "@/types/domain"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Loader2, Search, User as UserIcon } from "lucide-react"
import { toast } from "sonner"

export default function UsuariosPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [users, setUsers] = React.useState<UserProfile[]>([])
  
  const [selectedUser, setSelectedUser] = React.useState<UserProfile | null>(null)
  const [canes, setCanes] = React.useState<number | "">("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    setLoading(true)
    try {
      const results = await searchUsers(searchTerm.trim())
      setUsers(results)
      if (results.length === 0) toast.error("No se encontraron usuarios")
    } catch {
      toast.error("Error al buscar usuarios")
    } finally {
      setLoading(false)
    }
  }

  const basePoints = typeof canes === "number" ? canes * 10 : 0
  let bonus = 0
  if (typeof canes === "number") {
    if (canes >= 10) bonus = 25
    else if (canes >= 5) bonus = 10
  }
  const totalPoints = basePoints + bonus

  const handleSubmitDelivery = async () => {
    if (!user || !selectedUser || typeof canes !== "number" || canes <= 0) return
    setIsSubmitting(true)
    try {
      const token = await user.getIdToken()
      const points = await confirmDelivery(token, selectedUser.id, canes)
      toast.success(`Entrega confirmada. Se otorgaron ${points} puntos.`)
      setCanes("")
      setSelectedUser(null)
      // Refresh current search
      handleSearch({ preventDefault: () => {} } as React.FormEvent)
    } catch (error: unknown) {
      toast.error((error as Error).message || "Error al confirmar entrega")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black font-heading tracking-tight">Buscar Usuarios</h1>
        <p className="text-muted-foreground">Registra entregas de caña buscando por código, correo o nombre.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
        <Input 
          placeholder="Código, email o nombre..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map(u => (
          <Card key={u.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => setSelectedUser(u)}>
            <CardContent className="p-4 flex items-start gap-4">
              <div className="bg-muted p-2 rounded-full">
                <UserIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">{u.displayName || "Usuario sin nombre"}</h3>
                <p className="text-sm text-muted-foreground">{u.email}</p>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="font-mono bg-muted px-1.5 py-0.5 rounded">{u.publicCode}</span>
                  <span className="font-medium text-primary">{u.pointsBalance} pts</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Registrar Entrega</SheetTitle>
            <SheetDescription>
              {selectedUser?.displayName} ({selectedUser?.publicCode})
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6 space-y-6">
            <div className="bg-muted p-4 rounded-lg flex justify-between items-center">
              <span>Saldo actual:</span>
              <span className="font-bold text-xl">{selectedUser?.pointsBalance} pts</span>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Cantidad de cañas entregadas</label>
              <Input 
                type="number" 
                min={1} 
                value={canes} 
                onChange={(e) => setCanes(e.target.value ? parseInt(e.target.value) : "")}
              />
              
              {typeof canes === "number" && canes > 0 && (
                <div className="bg-primary/10 p-4 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base ({canes} x 10):</span>
                    <span>{basePoints} pts</span>
                  </div>
                  {bonus > 0 && (
                    <div className="flex justify-between text-primary font-medium">
                      <span>Bono:</span>
                      <span>+{bonus} pts</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg border-t border-primary/20 pt-2 mt-2">
                    <span>Total a otorgar:</span>
                    <span>{totalPoints} pts</span>
                  </div>
                </div>
              )}
              
              <Button 
                className="w-full" 
                onClick={handleSubmitDelivery} 
                disabled={isSubmitting || typeof canes !== "number" || canes <= 0}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirmar y Otorgar Puntos
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}