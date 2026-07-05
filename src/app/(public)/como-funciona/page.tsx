import { HowItWorksSection } from "@/components/public/landing-sections"
import { Container } from "@/components/ui/container"

export default function ComoFuncionaPage() {
  return (
    <div className="py-20">
      <Container>
        <h1 className="text-4xl font-bold mb-6 text-center">Cómo Funciona</h1>
        <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
          Conoce el proceso completo, desde la entrada de la materia prima hasta la separación del jugo y el bagazo, asegurando la máxima eficiencia y seguridad.
        </p>
      </Container>
      <HowItWorksSection />
    </div>
  )
}