"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase/client"
import { ensureUserProfile } from "@/lib/services/auth"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      await ensureUserProfile(result.user)
      toast.success("Sesión iniciada correctamente")
      if (result.user.email === 'rivas2020rodrigo@gmail.com') {
        router.push("/admin")
      } else {
        router.push("/app")
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    
    if (!email || !password) return
    
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Sesión iniciada correctamente")
      if (email === 'rivas2020rodrigo@gmail.com') {
        router.push("/admin")
      } else {
        router.push("/app")
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "Credenciales inválidas")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20">
      <Container className="max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa a tu cuenta para ver tus puntos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" size="lg" onClick={handleGoogleSignIn} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Continuar con Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">O</span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" name="email" type="email" placeholder="correo@ejemplo.com" required disabled={loading} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link href="/iniciar-sesion" className="text-xs text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required disabled={loading} />
              </div>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Iniciar sesión
              </Button>
            </form>
            <div className="text-center text-sm mt-6">
              ¿No tienes cuenta? <Link href="/crear-cuenta" className="text-primary hover:underline">Regístrate aquí</Link>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}