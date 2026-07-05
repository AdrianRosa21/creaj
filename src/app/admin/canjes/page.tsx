"use client"

import * as React from "react"
import { useAuth } from "@/components/auth-provider"
import { searchRedemptionByCode } from "@/lib/services/admin"
import { completeRedemption, cancelRedemption } from "@/app/admin/actions"
import { Redemption } from "@/types/domain"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Search, CheckCircle, XCircle } from "lucide-react"
import { toast } from "sonner"

export default function CanjesAdminPage() {
  const { user } = useAuth()
  const [code, setCode] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [redemption, setRedemption] = React.useState<Redemption | null>(null)
  const [isProcessing, setIsProcessing] = React.useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return
    setLoading(true)
    setRedemption(null)
    try {
      const result = await searchRedemptionByCode(code.trim())
      if (!result) {
        toast.error("Código no encontrado")
      } else {
        setRedemption(result)
      }
    } catch {
      toast.error("Error al buscar canje")
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async () => {
    if (!user || !redemption) return
    setIsProcessing(true)
    try {
      const token = await user.getIdToken()
      await completeRedemption(token, redemption.id!)
      toast.success("Canje completado exitosamente. Entregar premio al usuario.")
      setRedemption({ ...redemption, status: "completed" })
    } catch (error: unknown) {
      toast.error((error as Error).message || "Error al completar canje")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCancel = async () => {
    if (!user || !redemption) return
    setIsProcessing(true)
    try {
      const token = await user.getIdToken()
      await cancelRedemption(token, redemption.id!)
      toast.success("Canje cancelado. Se devolvieron los puntos al usuario.")
      setRedemption({ ...redemption, status: "cancelled" })
    } catch (error: unknown) {
      toast.error((error as Error).message || "Error al cancelar canje")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-black font-heading tracking-tight">Validar Canje</h1>
        <p className="text-muted-foreground">Ingresa el código que te muestra el usuario en su Pase de Canje.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <Input 
          placeholder="Ej: ABC-123" 
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="text-lg font-mono uppercase"
        />
        <Button type="submit" disabled={loading} size="lg">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
        </Button>
      </form>

      {redemption && (
        <Card className={`border-2 ${redemption.status === 'pending' ? 'border-primary' : 'border-muted'}`}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{redemption.rewardSnapshot?.name || 'Premio'}</span>
              <span className={`text-sm px-2 py-1 rounded-full ${
                redemption.status === 'pending' ? 'bg-primary/10 text-primary' : 
                redemption.status === 'completed' ? 'bg-green-100 text-green-700' : 
                'bg-red-100 text-red-700'
              }`}>
                {redemption.status === 'pending' ? 'Pendiente' : 
                 redemption.status === 'completed' ? 'Entregado' : 'Cancelado'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Costo</div>
              <div className="text-xl font-bold">{redemption.costPoints} pts</div>
            </div>

            {redemption.status === "pending" && (
              <div className="flex gap-4">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white" 
                  size="lg"
                  onClick={handleComplete}
                  disabled={isProcessing}
                >
                  {isProcessing ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <CheckCircle className="h-5 w-5 mr-2" />}
                  Confirmar Entrega
                </Button>
                <Button 
                  variant="destructive" 
                  size="lg"
                  onClick={handleCancel}
                  disabled={isProcessing}
                >
                  <XCircle className="h-5 w-5 mr-2" />
                  Rechazar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}