import { RewardsPreviewSection } from "@/components/public/landing-sections"
import { Container } from "@/components/ui/container"

export default function RecompensasPage() {
  return (
    <div className="py-20">
      <Container>
        <h1 className="text-4xl font-bold mb-6 text-center">Sistema de Recompensas</h1>
        <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
          Como parte de esta demostración, puedes simular la entrega de caña y acumular puntos canjeables por productos reales en nuestro stand.
        </p>
      </Container>
      <RewardsPreviewSection showAll={true} />
    </div>
  )
}