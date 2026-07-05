"use client"

import * as React from "react"
import { useAuth } from "@/components/auth-provider"
import { getUserRedemptions } from "@/lib/services/transactions"
import { cancelPendingRedemption } from "@/lib/services/rewards"
import { getUserProfile } from "@/lib/services/user"
import { Redemption } from "@/types/domain"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { toast } from "sonner"

export default function CanjesPage() {
  const { user } = useAuth()
  const [redemptions, setRedemptions] = React.useState<Redemption[]>([])
  const [loading, setLoading] = React.useState(true)
  const [cancellingId, setCancellingId] = React.useState<string | null>(null)

  const loadData = React.useCallback(() => {
    if (!user) return
    Promise.all([
      getUserRedemptions(user.uid),
      getUserProfile(user.uid)
    ]).then(([r]) => {
      setRedemptions(r)
    }).catch(() => {
      // empty fallback
    }).finally(() => setLoading(false))
  }, [user])

  React.useEffect(() => {
    loadData()
  }, [loadData])

  const handleCancel = async (id: string) => {
    if (!user) return
    try {
      setCancellingId(id)
      await cancelPendingRedemption(id, user.uid)
      toast.success("Canje cancelado. Se devolvieron tus puntos.")
      loadData()
    } catch (e: unknown) {
      toast.error((e as Error).message || "Error al cancelar")
    } finally {
      setCancellingId(null)
    }
  }

  const pendingRedemptions = redemptions.filter(r => r.status === 'pending')
  const historyRedemptions = redemptions.filter(r => r.status !== 'pending')

  return (
    <Container className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-6">Pases de Canje Activos</h1>
        
        {loading ? (
          <div className="flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
        ) : pendingRedemptions.length === 0 ? (
          <div className="text-center p-8 bg-background border rounded-lg">
            <p className="text-muted-foreground">No tienes canjes pendientes.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingRedemptions.map(r => (
              <Card key={r.id} className="border-primary bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 text-primary font-medium mb-2">
                        <AlertCircle className="h-4 w-4" /> Pendiente de entrega
                      </div>
                      <h3 className="text-xl font-bold">{r.rewardSnapshot.name}</h3>
                      <p className="text-muted-foreground mt-1">Costo: {r.costPoints} pts</p>
                    </div>
                    
                    <div className="bg-background border-2 border-dashed border-primary/50 rounded-xl p-4 text-center min-w-[200px]">
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Código de Canje</p>
                      <div className="text-3xl font-mono font-bold tracking-widest text-primary">{r.verificationCode}</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t flex justify-end">
                    <Button 
                      variant="outline" 
                      className="text-destructive hover:bg-destructive/10"
                      disabled={!!cancellingId}
                      onClick={() => handleCancel(r.id)}
                    >
                      {cancellingId === r.id ? <Loader2 className="animate-spin mr-2" /> : null}
                      Cancelar Canje
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Historial de Canjes</h2>
        
        {loading ? null : historyRedemptions.length === 0 ? (
          <p className="text-muted-foreground text-sm">El historial está vacío.</p>
        ) : (
          <div className="space-y-3">
            {historyRedemptions.map(r => (
              <div key={r.id} className="flex items-center justify-between p-4 bg-background border rounded-lg">
                <div className="flex items-center gap-3">
                  {r.status === 'completed' ? (
                    <CheckCircle2 className="text-primary h-5 w-5" />
                  ) : (
                    <XCircle className="text-destructive h-5 w-5" />
                  )}
                  <div>
                    <p className="font-medium">{r.rewardSnapshot.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' }).format(r.createdAt.toDate())}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold block">{r.costPoints} pts</span>
                  <span className="text-[10px] uppercase text-muted-foreground">
                    {r.status === 'completed' ? 'Entregado' : 'Cancelado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}