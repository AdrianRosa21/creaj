"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-provider"
import { Loader2 } from "lucide-react"

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    if (loading) return
    
    if (!user) {
      router.replace("/iniciar-sesion")
      return
    }

    user.getIdTokenResult().then((idTokenResult) => {
      if (!!idTokenResult.claims.admin) {
        setIsAdmin(true)
      } else {
        router.replace("/app") 
      }
    })
  }, [user, loading, router])

  if (loading || isAdmin === null) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isAdmin === true) {
    return <>{children}</>
  }

  return null
}
