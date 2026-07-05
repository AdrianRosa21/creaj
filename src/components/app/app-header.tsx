"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoPlaceholder } from "@/components/public/logo-placeholder"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/entregas", label: "Entregas" },
  { href: "/app/premios", label: "Catálogo" },
  { href: "/app/canjes", label: "Mis Canjes" },
  { href: "/app/perfil", label: "Mi Perfil" },
]

export function AppHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background hidden md:block">
      <div className="container flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link href="/app" className="mr-8">
          <LogoPlaceholder />
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
