"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Users, Gift, Package, AlertTriangle } from "lucide-react"
import { Reward } from "@/types/domain"

interface AdminStats {
  users: number;
  pendingRedemptions: number;
  deliveries: number;
  lowStockRewards: Reward[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = React.useState<AdminStats | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    import("@/lib/services/admin").then((m) => {
      m.getAdminDashboardStats().then(setStats).finally(() => setLoading(false))
    })
  }, [])

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black font-heading tracking-tight">Resumen</h1>
        <p className="text-muted-foreground">Estado general del sistema.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Registrados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.users || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entregas de Caña</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.deliveries || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Canjes Pendientes</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pendingRedemptions || 0}</div>
          </CardContent>
        </Card>
      </div>

      {stats?.lowStockRewards && stats.lowStockRewards.length > 0 && (
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Premios con bajo stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.lowStockRewards.map((reward) => (
                <div key={reward.id} className="flex items-center justify-between">
                  <span className="font-medium">{reward.name}</span>
                  <span className="text-destructive font-bold">{reward.stock} restantes</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}