import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"

export default function EquipoPage() {
  return (
    <div className="py-20">
      <Container>
        <h1 className="text-4xl font-bold mb-6 text-center">El Equipo</h1>
        <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
          Este prototipo fue desarrollado por estudiantes comprometidos con la innovación tecnológica en la agroindustria.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-muted mb-4" />
                <h3 className="font-semibold text-lg">Miembro del Equipo</h3>
                <p className="text-muted-foreground text-sm">Ingeniería / Desarrollo</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  )
}