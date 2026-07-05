# Especificación funcional de la demo

## 1. Sitio público

### Página principal

Secciones mínimas:

1. Hero con propuesta de valor y CTA.
2. Qué es UEDS.
3. Problema que atiende.
4. Cómo funciona la máquina en cuatro pasos.
5. Componentes principales.
6. Seguridad y diseño.
7. Impacto y aprovechamiento del bagazo.
8. Cómo funciona el sistema de puntos.
9. Vista previa de premios.
10. Equipo del proyecto.
11. Preguntas frecuentes.
12. CTA final para crear cuenta.

### Rutas públicas

- `/`
- `/proyecto`
- `/como-funciona`
- `/recompensas`
- `/equipo`
- `/iniciar-sesion`
- `/crear-cuenta`

## 2. Autenticación

Métodos requeridos:

- Correo y contraseña.
- Google.
- Recuperación de contraseña.

El perfil puede guardar nombre, teléfono opcional y avatar.

## 3. Aplicación del usuario

Rutas:

- `/app`
- `/app/puntos`
- `/app/entregas`
- `/app/premios`
- `/app/canjes`
- `/app/perfil`

Funciones:

- Ver saldo total, saldo reservado y saldo disponible.
- Ver historial de entregas.
- Ver catálogo de premios.
- Ver premios bloqueados por saldo insuficiente.
- Solicitar un canje.
- Mostrar una pantalla de validación grande para el stand.
- Cancelar un canje pendiente antes de que el admin lo complete.
- Ver canjes completados y cancelados.

## 4. Panel administrativo

Rutas:

- `/admin`
- `/admin/usuarios`
- `/admin/entregas`
- `/admin/canjes`
- `/admin/premios`

Funciones:

- Acceso solo para usuario con rol administrativo.
- Buscar usuario por nombre, correo o código corto.
- Registrar una entrega y calcular puntos.
- Ver el cálculo antes de confirmar.
- Ver solicitudes de canje pendientes.
- Confirmar o cancelar un canje.
- Crear, editar, activar o desactivar premios.
- Ajustar inventario.
- Ver actividad reciente.

## 5. Canje presencial

Flujo:

1. Usuario abre un premio.
2. Si tiene saldo disponible, pulsa `Solicitar canje`.
3. El sistema crea un canje pendiente y reserva los puntos.
4. Aparece una tarjeta de validación con nombre, premio, costo y código corto.
5. El usuario muestra la pantalla en el stand.
6. El administrador busca o escanea el código.
7. El administrador pulsa `Confirmar entrega`.
8. El sistema descuenta definitivamente los puntos, reduce inventario y marca el canje como completado.

No debe existir un botón del lado del usuario que pueda completar el canje por sí solo.
