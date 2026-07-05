# PROMPT 00 — Preparar proyecto y arquitectura

Trabaja como arquitecto de producto, diseñador senior mobile-first y desarrollador full-stack. Estás dentro del repositorio oficial de UEDS.

Antes de actuar:

1. Lista las skills disponibles y confirma que detectas las skills `ueds-*`.
2. Lee todos los archivos de `docs/` y las skills relevantes.
3. Resume en máximo 15 puntos lo que entendiste, incluyendo alcance, usuarios, reglas de puntos, flujo de canje y restricciones.
4. No escribas código hasta terminar ese resumen.

Luego prepara el proyecto con estas decisiones obligatorias:

- Next.js App Router, TypeScript y carpeta `src`.
- Tailwind CSS.
- shadcn/ui como base personalizable.
- Motion.
- Lucide React.
- Firebase Web SDK y Firebase Admin SDK.
- Despliegue objetivo en Vercel.
- Español y mobile-first.

Tareas:

1. Si el proyecto no existe, inicialízalo con la versión estable actual de Next.js.
2. Crea la estructura de rutas y carpetas descrita en `docs/ROUTES_AND_COMPONENTS.md`.
3. Crea variables CSS del sistema visual.
4. Configura Sora y Manrope con `next/font`.
5. Crea componentes base: botón, tarjeta, contenedor, encabezado de sección, badge de estado, skeleton y empty state.
6. Crea `lib/firebase/client.ts`, `lib/firebase/admin.ts` y validación clara de variables de entorno, sin credenciales reales.
7. Crea `.env.example` y actualiza `.gitignore`.
8. Crea tipos de dominio para usuario, entrega, transacción, premio y canje.
9. Crea `docs/FIREBASE_SETUP.md` con pasos manuales para configurar Authentication, Firestore, Google provider, variables de Vercel y un usuario admin.
10. Crea datos de demostración tipados para que la interfaz pueda desarrollarse antes de conectar Firestore.
11. Ejecuta lint y build.

No implementes todavía páginas completas, autenticación real ni el panel. Al terminar muestra:

- Árbol creado.
- Decisiones técnicas.
- Comandos ejecutados.
- Resultado de lint/build.
- Próximo paso sugerido.
