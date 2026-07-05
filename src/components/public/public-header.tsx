"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LogoPlaceholder } from "./logo-placeholder"

const routes = [
  { href: "/", label: "Inicio" },
  { href: "/proyecto", label: "El Proyecto" },
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/recompensas", label: "Recompensas" },
  { href: "/equipo", label: "Equipo" },
]

export function PublicHeader() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <LogoPlaceholder />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {routes.map((route) => (
            <Link 
              key={route.href} 
              href={route.href} 
              className="transition-colors hover:text-primary text-muted-foreground"
            >
              {route.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Link href="/iniciar-sesion">
            <Button variant="ghost" size="sm">Iniciar sesión</Button>
          </Link>
          <Link href="/crear-cuenta">
            <Button size="sm">Crear cuenta</Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger 
            className="md:hidden"
            render={<Button variant="ghost" size="icon" className="md:hidden" />}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menú principal</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-2 py-1 text-lg font-medium"
                >
                  {route.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                <Link href="/iniciar-sesion" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">Iniciar sesión</Button>
                </Link>
                <Link href="/crear-cuenta" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Crear cuenta</Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
