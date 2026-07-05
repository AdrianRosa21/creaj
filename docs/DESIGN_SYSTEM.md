# Sistema visual UEDS

## Dirección

Agrotech premium, limpia, futurista y accesible. La página debe sentirse creada para una demostración tecnológica real, no como una presentación escolar convertida en web.

## Paleta

- Azul industrial: `#0B2A3F`
- Azul profundo: `#061C2B`
- Verde caña: `#5F7F2C`
- Verde fresco: `#8DBF3F`
- Menta clara: `#EAF6E3`
- Marfil: `#F8F7F1`
- Blanco: `#FFFFFF`
- Texto gris: `#4C5962`
- Éxito: `#1F9D68`
- Alerta: `#E8A317`
- Error: `#D64545`

## Tipografía

- Encabezados: `Sora`.
- Texto y UI: `Manrope`.
- Usar `next/font`.

## Componentes

- Tarjetas con radios de 20–28 px.
- Sombras suaves y bordes translúcidos.
- Fondos con degradados discretos.
- Botones grandes y cómodos para móvil.
- Chips de estado claros.
- Ilustraciones técnicas con líneas finas.
- Iconos Lucide; no mezclar familias.

## Hero

- Mensaje sugerido: `De la caña al valor.`
- Subtítulo: `Una experiencia que conecta ingeniería, aprovechamiento y recompensas.`
- CTA primario: `Explorar el proyecto`.
- CTA secundario: `Crear mi cuenta`.
- Mostrar una composición isométrica o 2.5D de la máquina, caña y flujo de jugo.

## Aplicación móvil

- Barra inferior para Inicio, Puntos, Premios y Perfil.
- Saldo como elemento principal.
- Acciones importantes al alcance del pulgar.
- Tarjetas de premios en dos columnas cuando haya espacio; una columna en pantallas pequeñas.

## Movimiento

- Microinteracciones de 150–300 ms.
- Entrada por scroll moderada.
- Respetar `prefers-reduced-motion`.
- No usar animaciones infinitas pesadas.

## Experiencia 3D

Fase inicial:

- Ilustración 2.5D animada con CSS/SVG/Motion.
- Hotspots interactivos para motor, rodillos, canal y paro de emergencia.
- Botón `Ver cómo funciona`.

Fase posterior:

- Modelo `.glb` comprimido.
- Carga diferida.
- Fallback estático.
- Sin bloquear la carga inicial.
