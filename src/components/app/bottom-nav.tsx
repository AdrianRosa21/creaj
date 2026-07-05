"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Package, Gift, Ticket, User } from "lucide-react"

const navItems = [
  { href: "/app", icon: Home, label: "Inicio" },
  { href: "/app/entregas", icon: Package, label: "Entregas" },
  { href: "/app/premios", icon: Gift, label: "Premios" },
  { href: "/app/canjes", icon: Ticket, label: "Canjes" },
  { href: "/app/perfil", icon: User, label: "Perfil" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden">
      <div className="grid h-full w-full grid-cols-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors",
                isActive && "text-primary font-medium"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] leading-none">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
