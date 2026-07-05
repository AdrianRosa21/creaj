# PROMPT 02 — Autenticación y aplicación del usuario

Lee las skills `ueds-project-context`, `ueds-design-system`, `ueds-rewards-domain`, `ueds-firebase-architecture` y `ueds-quality-gate`.

Implementa Firebase Authentication real con:

- Registro por correo y contraseña.
- Inicio de sesión por correo y contraseña.
- Inicio con Google.
- Cerrar sesión.
- Recuperar contraseña.
- Persistencia de sesión.
- Creación automática del documento `users/{uid}`.

No implementes teléfono más contraseña. Agrega teléfono como campo opcional editable del perfil. Deja documentado que el login telefónico con SMS puede ser una fase posterior.

Implementa la aplicación del usuario:

- Dashboard con saldo total, reservado y disponible.
- Historial de entregas.
- Catálogo de premios desde Firestore con fallback de desarrollo.
- Estados de bloqueo por saldo o stock.
- Detalle de premio en sheet o modal móvil.
- Solicitud de canje con operación segura.
- Pantalla `RedemptionPass` para mostrar al administrador.
- Cancelación de canje pendiente.
- Historial de canjes.
- Perfil editable.
- Barra de navegación inferior.
- Guards para rutas privadas.

Usa transacciones de Firestore y validación con Zod donde corresponda. Evita dobles envíos y muestra feedback claro.

Crea reglas iniciales de Firestore donde el usuario pueda leer su perfil e historial, pero no alterar saldos, entregas, inventario ni estados de canje privilegiados.

Al terminar prueba los flujos con datos de desarrollo, ejecuta lint/build y reporta limitaciones pendientes para conectar el panel admin.
