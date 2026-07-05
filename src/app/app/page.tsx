"use client"

import * as React from "react"
import { useAuth } from "@/components/auth-provider"
import { getUserProfile } from "@/lib/services/user"
import { UserProfile } from "@/types/domain"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_USER } from "@/lib/mock-data"
import { Loader2, Coins, Lock, CheckCircle2 } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const [profile, setProfile] = React.useState<UserProfile | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!user) return
    getUserProfile(user.uid).then(p => {
      setProfile(p || MOCK_USER)
    }).catch(() => {
      setProfile(MOCK_USER)
    }).finally(() => setLoading(false))
  }, [user])

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
  }

  if (!profile) return null

  const available = profile.pointsBalance - profile.pointsReserved

  return (
    <Container className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Hola, {profile.displayName}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-primary text-primary-foreground border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Disponible
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{available} pts</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <Lock className="h-4 w-4" /> Reservado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile.pointsReserved} pts</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <Coins className="h-4 w-4" /> Total Acumulado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile.pointsBalance} pts</div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-background border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Código de Identificación</h2>
        <div className="flex flex-col items-center justify-center py-6 bg-muted/30 rounded-lg border-2 border-dashed">
          <p className="text-sm text-muted-foreground mb-2">Muestra este código en el stand para entregar cañas</p>
          <div className="text-4xl font-mono font-bold tracking-widest text-primary">{profile.publicCode}</div>
        </div>
      </div>
    </Container>
  )
}