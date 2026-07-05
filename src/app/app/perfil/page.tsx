"use client"

import * as React from "react"
import { useAuth } from "@/components/auth-provider"
import { getUserProfile, updateUserProfile } from "@/lib/services/user"
import { UserProfile } from "@/types/domain"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, LogOut } from "lucide-react"
import { toast } from "sonner"
import { auth } from "@/lib/firebase/client"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"

export default function PerfilPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = React.useState<UserProfile | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (!user) return
    getUserProfile(user.uid).then(p => {
      setProfile(p)
    }).finally(() => setLoading(false))
  }, [user])

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user || !profile) return
    
    const formData = new FormData(e.currentTarget)
    const displayName = formData.get("displayName") as string
    const phone = formData.get("phone") as string
    
    try {
      setSaving(true)
      await updateUserProfile(user.uid, { displayName, phone })
      setProfile({ ...profile, displayName, phone })
      toast.success("Perfil actualizado")
    } catch {
      toast.error("Error al actualizar perfil")
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    router.replace("/")
  }

  return (
    <Container className="max-w-md">
      <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>
      
      {loading ? (
        <div className="flex h-32 items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>
      ) : profile ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Datos Personales</CardTitle>
            <CardDescription>Actualiza tu información de contacto.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Nombre Completo</Label>
                <Input id="displayName" name="displayName" defaultValue={profile.displayName} required disabled={saving} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" defaultValue={profile.email || ""} disabled />
                <p className="text-xs text-muted-foreground">El correo no se puede cambiar.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono (Opcional)</Label>
                <Input id="phone" name="phone" type="tel" defaultValue={profile.phone || ""} disabled={saving} placeholder="Ej. +52 123 456 7890" />
                <p className="text-xs text-muted-foreground">Usaremos este número solo en caso de problemas con tus canjes.</p>
              </div>
              
              <Button className="w-full" type="submit" disabled={saving}>
                {saving ? <Loader2 className="animate-spin mr-2" /> : null}
                Guardar Cambios
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center p-8 bg-background border rounded-lg">
          <p className="text-muted-foreground">Error al cargar perfil.</p>
        </div>
      )}

      <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10" onClick={handleLogout}>
        <LogOut className="h-4 w-4 mr-2" />
        Cerrar Sesión
      </Button>
    </Container>
  )
}