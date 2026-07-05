import { AuthGuard } from "@/components/auth-guard"
import { BottomNav } from "@/components/app/bottom-nav"
import { AppHeader } from "@/components/app/app-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col bg-muted/20">
        <AppHeader />
        {/* pb-20 to avoid content being hidden under the bottom nav on mobile */}
        <main className="flex-1 pb-20 md:pb-8 pt-6">
          {children}
        </main>
        <BottomNav />
      </div>
    </AuthGuard>
  )
}