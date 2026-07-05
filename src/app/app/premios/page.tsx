"use client"
/* eslint-disable @next/next/no-img-element */

import * as React from "react"
import { useAuth } from "@/components/auth-provider"
import { getActiveRewards, requestRedemption } from "@/lib/services/rewards"
import { getUserProfile } from "@/lib/services/user"
import { Reward, UserProfile } from "@/types/domain"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MOCK_REWARDS, MOCK_USER } from "@/lib/mock-data"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"

export default function PremiosPage() {
  const { user } = useAuth()
  const [rewards, setRewards] = React.useState<Reward[]>([])
  const [profile, setProfile] = React.useState<UserProfile | null>(null)
  const [loading, setLoading] = React.useState(true)
  
  const [selectedReward, setSelectedReward] = React.useState<Reward | null>(null)
  const [isRequesting, setIsRequesting] = React.useState(false)

  React.useEffect(() => {
    if (!user) return
    Promise.all([
      getActiveRewards(),
      getUserProfile(user.uid)
    ]).then(([r, p]) => {
      setRewards(r.length ? r : MOCK_REWARDS)
      setProfile(p || MOCK_USER)
    }).catch(() => {
      setRewards(MOCK_REWARDS)
      setProfile(MOCK_USER)
    }).finally(() => setLoading(false))
  }, [user])

  const handleRequestRedemption = async () => {
    if (!user || !selectedReward) return
    try {
      setIsRequesting(true)
      await requestRedemption(user.uid, selectedReward)
      toast.success("Canje solicitado. Ve a 'Mis Canjes' para generar el pase.")
      setSelectedReward(null)
      const p = await getUserProfile(user.uid)
      setProfile(p || MOCK_USER)
    } catch (e: unknown) {
      toast.error((e as Error).message || "No se pudo procesar el canje.")
    } finally {
      setIsRequesting(false)
    }
  }

  const availablePoints = profile ? profile.pointsBalance - profile.pointsReserved : 0

  return (
    <Container className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Catálogo de Premios</h1>
        {!loading && (
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold">
            {availablePoints} pts disponibles
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rewards.map(reward => (
            <Card 
              key={reward.id} 
              className="cursor-pointer transition-all hover:ring-2 ring-primary/50"
              onClick={() => setSelectedReward(reward)}
            >
              <div className="aspect-square bg-muted flex items-center justify-center text-5xl">
                {reward.imageUrl ? <img src={reward.imageUrl} alt={reward.name} className="w-full h-full object-cover" /> : "🎁"}
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold line-clamp-1">{reward.name}</h3>
                <p className="text-sm font-bold text-primary mt-1">{reward.costPoints} pts</p>
                {reward.stock <= 0 && <p className="text-xs text-destructive mt-1 font-medium">Agotado</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Sheet open={!!selectedReward} onOpenChange={(open) => !open && setSelectedReward(null)}>
        <SheetContent side="bottom" className="sm:max-w-md sm:mx-auto h-auto rounded-t-xl">
          {selectedReward && (
            <div className="flex flex-col gap-6 pt-4">
              <SheetHeader className="text-center sm:text-left">
                <SheetTitle className="text-2xl">{selectedReward.name}</SheetTitle>
                <SheetDescription>{selectedReward.description}</SheetDescription>
              </SheetHeader>
              
              <div className="bg-muted aspect-video rounded-lg flex items-center justify-center text-6xl">
                {selectedReward.imageUrl ? <img src={selectedReward.imageUrl} alt={selectedReward.name} className="w-full h-full object-cover rounded-lg" /> : "🎁"}
              </div>

              <div className="flex items-center justify-between text-lg">
                <span className="font-medium">Costo:</span>
                <span className="font-bold text-primary">{selectedReward.costPoints} pts</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                <span>Tu saldo disponible:</span>
                <span>{availablePoints} pts</span>
              </div>

              <Button 
                size="lg" 
                className="w-full"
                disabled={isRequesting || selectedReward.stock <= 0 || availablePoints < selectedReward.costPoints}
                onClick={handleRequestRedemption}
              >
                {isRequesting ? <Loader2 className="animate-spin mr-2" /> : null}
                {selectedReward.stock <= 0 ? "Agotado" : 
                 availablePoints < selectedReward.costPoints ? "Puntos insuficientes" : "Solicitar Canje"}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </Container>
  )
}