# PROMPT 03 — Panel administrativo y canje presencial

Lee todas las skills `ueds-*` y los documentos del proyecto.

Construye el panel administrativo desde la primera versión. Debe verse bien en móvil y escritorio.

Seguridad:

- Protege `/admin` con Firebase custom claim `admin: true`.
- Crea un script local seguro para otorgar el claim inicial por UID o correo.
- Nunca expongas service-account credentials al cliente.
- Todas las operaciones privilegiadas deben pasar por server routes o funciones confiables.

Implementa:

1. Resumen con usuarios, entregas, puntos emitidos, canjes pendientes y stock bajo.
2. Búsqueda de usuarios por nombre, correo o `publicCode`.
3. Perfil resumido del usuario con saldos e historial.
4. Formulario para registrar una entrega.
5. Vista previa del cálculo de puntos según `docs/POINTS_AND_REWARDS.md`.
6. Confirmación atómica que crea entrega, transacción y actualiza saldo.
7. Bandeja de canjes pendientes.
8. Búsqueda por código de validación.
9. Confirmación atómica del canje que descuenta saldo reservado, reduce stock, crea transacción y marca completado.
10. Cancelación administrativa que libera puntos.
11. CRUD básico de premios e inventario.
12. Datos semilla para el catálogo inicial.
13. Estados vacíos, carga, errores y confirmaciones destructivas.

Actualiza Firestore Rules para reflejar los roles y crea pruebas o un checklist verificable de permisos.

Prueba explícitamente:

- Usuario normal intentando entrar a `/admin`.
- Usuario sin puntos intentando canjear.
- Dos clics de confirmación.
- Premio sin stock.
- Canje cancelado.
- Canje completado.
- Entrega de 8 cañas que debe otorgar 90 puntos.

Ejecuta quality gate completa y corrige antes de declarar terminado.
