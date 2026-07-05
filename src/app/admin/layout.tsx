import { AdminGuard } from "@/components/admin-guard"
import Link from "next/link"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col bg-muted/20">
        <header className="sticky top-0 z-40 w-full border-b bg-primary text-primary-foreground">
          <div className="container flex h-16 items-center px-4 max-w-7xl mx-auto overflow-x-auto">
            <Link href="/admin" className="mr-8 flex-shrink-0">
              <span className="font-heading font-black tracking-tight text-xl">UEDS <span className="opacity-70 font-normal">Admin</span></span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium">
              <Link href="/admin" className="hover:opacity-80">Resumen</Link>
              <Link href="/admin/usuarios" className="hover:opacity-80">Entregas</Link>
              <Link href="/admin/canjes" className="hover:opacity-80">Canjes</Link>
              <Link href="/admin/premios" className="hover:opacity-80">Catálogo</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 py-8 px-4 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </AdminGuard>
  )
}