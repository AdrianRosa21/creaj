"use client"

import * as React from "react"
import { useAuth } from "@/components/auth-provider"
import { getUserDeliveries } from "@/lib/services/transactions"
import { Delivery } from "@/types/domain"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { MOCK_DELIVERIES } from "@/lib/mock-data"
import { Loader2, Package } from "lucide-react"

export default function EntregasPage() {
  const { user } = useAuth()
  const [deliveries, setDeliveries] = React.useState<Delivery[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!user) return
    getUserDeliveries(user.uid).then(res => {
      setDeliveries(res.length ? res : MOCK_DELIVERIES)
    }).catch(() => {
      setDeliveries(MOCK_DELIVERIES)
    }).finally(() => setLoading(false))
  }, [user])

  return (
    <Container className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Historial de Entregas</h1>
      
      {loading ? (
        <div className="flex h-32 items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>
      ) : deliveries.length === 0 ? (
        <div className="text-center p-8 bg-background border rounded-lg">
          <p className="text-muted-foreground">No tienes entregas registradas aún.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {deliveries.map(delivery => (
            <Card key={delivery.id}>
              <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{delivery.quantityCanes} cañas procesadas</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' }).format(delivery.createdAt.toDate())}
                    </p>
                  </div>
                </div>
                <div className="text-right mt-2 sm:mt-0">
                  <div className="font-bold text-lg text-primary">+{delivery.totalPoints} pts</div>
                  <div className="text-xs text-muted-foreground">{delivery.status === 'confirmed' ? 'Confirmado' : 'Anulado'}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Container>
  )
}