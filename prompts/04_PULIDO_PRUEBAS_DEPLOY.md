# PROMPT 04 — Pulido final, pruebas y despliegue

Activa `ueds-quality-gate` y revisa todas las skills relevantes.

Realiza una auditoría final del proyecto completo:

## Diseño

- Consistencia visual.
- Mobile-first real a 360 y 390 px.
- Navegación cómoda con una mano.
- Tipografía, espacios y estados.
- Logo y favicon.
- Animaciones ligeras.

## Funcionalidad

- Registro, login, Google, reset y logout.
- Dashboard del usuario.
- Entregas registradas por admin.
- Cálculo de puntos.
- Solicitud, reserva, cancelación y confirmación de canje.
- Inventario.
- Guards de usuario y admin.

## Seguridad

- Reglas Firestore restrictivas.
- Custom claims.
- Secretos fuera del repositorio.
- Inputs validados.
- Operaciones atómicas.

## Calidad

- Lint sin errores.
- Build de producción exitoso.
- Sin errores de consola.
- Sin enlaces muertos.
- Loading, empty y error states.
- Accesibilidad de teclado y contraste.
- Metadata SEO y Open Graph.
- `README.md` con instalación, Firebase y despliegue.

Prepara Vercel:

- Variables documentadas.
- Dominio autorizado en Firebase Auth.
- Configuración de producción.
- Instrucciones exactas de deploy.

No agregues todavía un modelo 3D pesado. Deja una sección en el README para la futura integración de un `.glb` con React Three Fiber.

Entrega un reporte final con:

1. Funciones terminadas.
2. Pruebas realizadas.
3. Variables que debe configurar el desarrollador.
4. Pasos manuales pendientes en Firebase Console.
5. Riesgos o límites conocidos.
6. URL de preview si el entorno permite desplegar.
