import { ProblemSection } from "@/components/public/landing-sections"
import { Container } from "@/components/ui/container"

export default function ProyectoPage() {
  return (
    <div className="py-20">
      <Container>
        <h1 className="text-4xl font-bold mb-6 text-center">El Proyecto UEDS</h1>
        <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
          La Unidad Extractora de Sacarosa es una iniciativa que busca optimizar la extracción de jugo de caña mediante un prototipo electromecánico de alta eficiencia.
        </p>
      </Container>
      <ProblemSection />
    </div>
  )
}