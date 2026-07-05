import Link from "next/link"
import { LogoPlaceholder } from "./logo-placeholder"

export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/20 py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <LogoPlaceholder className="mb-4" />
            <p className="text-sm text-muted-foreground max-w-sm">
              Prototipo electromecánico educativo para la extracción controlada y eficiente de sacarosa.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Proyecto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/proyecto" className="hover:text-primary">El Problema</Link></li>
              <li><Link href="/como-funciona" className="hover:text-primary">Cómo Funciona</Link></li>
              <li><Link href="/recompensas" className="hover:text-primary">Sistema de Puntos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Demostración de Feria</li>
              <li>Fines Educativos</li>
              <li><Link href="/equipo" className="hover:text-primary">El Equipo</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} UEDS. Proyecto Educativo.
        </div>
      </div>
    </footer>
  )
}
