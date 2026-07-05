# Reglas de puntos y premios

## Unidad de medición

Para la demo se utiliza el número de cañas aceptadas por el administrador.

## Cálculo

- Cada caña aceptada: **10 puntos**.
- Entrega de 5 a 9 cañas: **10 puntos extra**.
- Entrega de 10 o más cañas: **25 puntos extra**.

No existen bonos por fecha, rapidez, rachas ni tiempo.

### Ejemplos

- 2 cañas = 20 puntos.
- 5 cañas = 60 puntos.
- 8 cañas = 90 puntos.
- 10 cañas = 125 puntos.

## Catálogo inicial de demostración

| Premio | Costo | Stock inicial |
|---|---:|---:|
| Chicle | 20 pts | 30 |
| Paleta | 30 pts | 25 |
| Gomitas mini | 40 pts | 25 |
| Sticker UEDS | 50 pts | 40 |
| Pulsera UEDS | 70 pts | 20 |
| Combo dulce | 90 pts | 15 |
| Premio sorpresa | 120 pts | 8 |

Los premios deben poder administrarse desde el panel.

## Estados de un canje

- `pending`: solicitado y con puntos reservados.
- `completed`: entregado por el administrador.
- `cancelled`: cancelado; los puntos reservados se liberan.

## Reglas críticas

- No permitir dos confirmaciones del mismo canje.
- No permitir saldo disponible negativo.
- No permitir canje si el premio está inactivo o sin stock.
- El inventario solo disminuye al completar el canje.
- La cancelación no disminuye inventario.
- Cada operación debe dejar historial auditable.
