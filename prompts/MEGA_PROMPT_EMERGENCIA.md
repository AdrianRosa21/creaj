# MEGA PROMPT DE EMERGENCIA

Usa este prompt solo si necesitas que Antigravity avance de una sola vez. Es menos confiable que ejecutar las fases por separado.

Construye la demostración completa de UEDS leyendo primero todas las skills `ueds-*` y todos los documentos de `docs/`. Antes de escribir código, resume el alcance y crea un plan por hitos. Después ejecuta los hitos en orden: arquitectura, sitio público, Firebase Auth, app de usuario, panel admin, reglas de seguridad, pruebas y despliegue.

Usa Next.js App Router, TypeScript, Tailwind, shadcn/ui personalizado, Motion, Lucide, Firebase Authentication, Cloud Firestore, Firebase Admin SDK y Vercel. La experiencia debe ser en español, mobile-first y agrotech premium.

Implementa sitio informativo, correo/contraseña, Google, perfil con teléfono opcional, puntos por cantidad de cañas, entregas creadas por admin, catálogo de premios, saldo reservado, solicitud de canje, pase presencial, confirmación exclusiva del admin, inventario, historial y custom claims. Respeta exactamente las reglas y modelo de datos de `docs/`.

No uses teléfono más contraseña, no inventes métricas técnicas, no uses reglas abiertas, no expongas credenciales, no permitas al usuario editar su saldo y no agregues WebGL pesado en esta fase. La máquina debe mostrarse inicialmente con una visual 2.5D ligera.

Después de cada hito ejecuta validaciones. No declares el proyecto terminado hasta que lint y build pasen, los guards funcionen, las operaciones críticas sean atómicas y se hayan probado móvil, usuario normal y administrador. Documenta todos los pasos manuales de Firebase y Vercel.
