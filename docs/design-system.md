# BooksQuest Pixel — sistema de diseño

Identidad visual de la plataforma: **noche estrellada + pixel-art**, inspirada en Codédex y en el
arte de los propios juegos (mago rojo, topo, slimes, plantas). Todo el hub (menú, bienvenida,
páginas de juego, admin) usa las mismas piezas.

Código fuente:

| Qué                                                              | Dónde                                                                                                                                |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Tokens, marcos, botones, animaciones                             | [src/styles.css](../src/styles.css)                                                                                                  |
| Íconos, paleta en TS, cuadrículas de arte                        | [src/components/pixel/pixel-art.ts](../src/components/pixel/pixel-art.ts)                                                            |
| Componentes pixel (íconos, sprites, cielo, suelo, logo, escenas) | [src/components/pixel/](../src/components/pixel/)                                                                                    |
| Primitivos shadcn ya adaptados                                   | [src/components/ui/](../src/components/ui/) (button, card, input, label, badge, table, tabs, dialog, alert-dialog, sonner, skeleton) |
| Favicon e ícono de iOS (generador)                               | [scripts/generate-favicon.mjs](../scripts/generate-favicon.mjs) → `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`        |

## Principios

1. **Todo cae en la cuadrícula de 4px.** Bordes de 4px, sombras de 4px, saltos de 4px. Sin blur, sin
   degradados suaves (el cielo es un degradado _por bandas_), sin esquinas redondeadas.
2. **Esquinas cortadas, no redondeadas.** Cada marco pierde un "pixel" en cada esquina.
3. **Movimiento por cuadros.** Las animaciones usan `steps()`; nada de easing suave.
4. **Arte real de los juegos.** Las tarjetas del menú usan los sprites y fondos de `public/assets`,
   a escala entera y con `image-rendering: pixelated`.
5. **Accesible primero.** Contraste AA como mínimo, foco visible, objetivos táctiles de 44px,
   `prefers-reduced-motion` respetado.

## Tokens

### Paleta (`--px-*`, espejo en `PX` de `pixel-art.ts`)

| Grupo         | Tokens                                                                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Tinta / noche | `ink #0b0820` · `night-950…400` (`#0f0a2b` → `#8a79e6`)                                                                                   |
| Texto         | `star #f4efff` (principal) · `lav #b9aef2` (atenuado)                                                                                     |
| Acentos       | `gold #f7d51d` · `green #92cc41` · `blue #209cee` · `red #e76e55` · `purple #a45bf0` · `orange #f59f54` · `cyan #5ceee1` · `pink #ff6b9a` |

Cada acento trae `-hi` (brillo) y `-lo` (sombra) para el bisel. Los tokens de shadcn
(`--background`, `--primary`, `--border`…) apuntan a esta paleta, así que cualquier componente
shadcn nuevo ya sale con el look correcto. Utilidades Tailwind: `bg-gold`, `text-lav`,
`border-ink`, `bg-night-800`…

### Tipografía

| Rol                              | Fuente             | Uso                                                               |
| -------------------------------- | ------------------ | ----------------------------------------------------------------- |
| Display (`font-pixel`)           | **Silkscreen** 700 | Títulos, botones, barras, etiquetas. Siempre MAYÚSCULAS y cortos. |
| Cuerpo (`font-sans`/`font-body`) | **Pixelify Sans**  | Párrafos, inputs, nombres de jugador.                             |

> Se eligió Silkscreen y no Press Start 2P porque esta última dibuja mal las mayúsculas
> acentuadas (É, Ó…) y la app está en español.

Tamaños del display, en múltiplos de 8px para que los píxeles queden nítidos: `16px` (botones,
barras), `24px` y `40px` (títulos). No usar `font-pixel` para párrafos.

## Piezas base (CSS)

| Clase                                                                       | Qué hace                                                                                                                              |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `.px-frame`                                                                 | Marco de 4px con esquinas cortadas. Variables: `--px-edge`, `--px-fill`, `--px-hi`, `--px-lo`, `--px`. El relleno **debe ser opaco**. |
| `.px-c-{gold,green,blue,red,purple,orange,cyan,pink,paper,night,deep,well}` | "Materiales": relleno + brillo + sombra + color de texto. `night` = elevado, `deep` = panel, `well` = hundido (inputs).               |
| `.px-btn` (+ `--sm`, `--lg`, `--icon`, `--ghost`)                           | Botón con "labio" de 4px que se aplasta al presionar. Va con `.px-frame` y un material.                                               |
| `.px-drop`                                                                  | Sombra dura que respeta la silueta recortada.                                                                                         |
| `.px-bar`                                                                   | Barra de título de ventana (`--px-bar`, `--px-bar-hi` para el color).                                                                 |
| `.px-chip`                                                                  | Etiqueta pequeña (marco a 2px).                                                                                                       |
| `.px-title`                                                                 | Texto con contorno de 1 "pixel de fuente" y sombra 3D.                                                                                |
| `.px-dither`                                                                | Velo tramado para modales.                                                                                                            |
| `.px-outline`                                                               | Contorno + sombra 3D para dibujos sueltos (el 404).                                                                                   |
| `.px-sprite`                                                                | Hoja de sprites escalada a entero (ver `PixelSprite`).                                                                                |

Ejemplo de botón nuevo de otro color: `className="px-frame px-btn px-c-pink"`, o agregar una variante
en `buttonVariants`.

## Componentes

- **`Button`** — variantes `default` (oro), `success`, `info`, `destructive`, `secondary`,
  `outline` (oscuro), `ghost`, `link`; tamaños `default`, `sm`, `lg`, `icon`.
- **`Card`**, **`Input`**, **`Label`**, **`Badge`**, **`Table`**, **`Tabs`** (pestaña activa en oro),
  **`Dialog`/`AlertDialog`** (velo tramado, entrada en 4 pasos), **`Toaster`** (verde = éxito, rojo =
  error, azul = info, naranja = aviso).
- **`PixelIcon`** — 20 íconos de 12×12 (`play`, `trophy`, `exit`, `dice`, `shield`, `check`…). Los de
  un color toman `currentColor`. `RankBadge` muestra medalla de oro/plata/bronce o el número.
- **`PixelSprite` / `MoleInHole`** — animan las hojas de sprites de los juegos (`SHEETS`).
- **`PixelSky`** (fondo fijo global), **`PixelGround`** + **`GroundParade`**, **`PixelLogo`**.
- **`GameShell`** — ventana arcade común de las páginas de juego.

Agregar un ícono: añadir una cuadrícula de 12 filas × 12 columnas a `ICONS` en `pixel-art.ts`
(`x` = color del texto; otras letras salen de `PALETTE`). Los tipos y `PixelIcon` lo toman solos.

## Movimiento

Utilidades: `animate-px-bob`, `-bob-big`, `-blink`, `-twinkle`, `-pop`, `-fade`, `-shake`, `-spin`.
Con `prefers-reduced-motion: reduce` todo queda quieto: los topos asoman, las nubes y el caminante
quedan repartidos.

## Accesibilidad

- Contraste verificado (WCAG): texto principal 16:1, atenuado ≥ 6.8:1, texto oscuro sobre cada
  acento ≥ 4.9:1, borde de campos de texto 4.7:1 (todo AA o mejor).
- Foco: contorno dorado de 4px en todo elemento interactivo; los campos cambian su borde a oro.
- Objetivos táctiles ≥ 44px (`px-btn--sm` = 44px, botones normales = 48px).
- Sprites, cielo y adornos son `aria-hidden`; las medallas y el 404 llevan `title`.
- `<html lang="es">`.

## Favicon

El libro del logo dentro de un marco dorado sobre fondo `night-900`, con las esquinas cortadas como
los demás marcos. El marco dorado da silueta tanto en pestañas claras como oscuras.

| Archivo                       | Uso                                                         |
| ----------------------------- | ----------------------------------------------------------- |
| `public/favicon.svg`          | Navegadores modernos (vectorial, nítido a cualquier tamaño) |
| `public/favicon.ico`          | 16 + 32 + 48 px: navegadores viejos y Safari                |
| `public/apple-touch-icon.png` | 180 px, fondo opaco (pantalla de inicio de iOS)             |

Se generan desde una sola cuadrícula pixel, sin dependencias (solo módulos internos de Node):

```sh
node scripts/generate-favicon.mjs
```

Si cambia el libro del logo (`ICONS.book` en `pixel-art.ts`), actualiza `BOOK` en el script y vuelve
a correrlo. Los enlaces están en el `head` de `src/routes/__root.tsx`.

## Fuera de alcance (a propósito)

Los menús y avisos **dentro** del canvas de Phaser (botón "Iniciar", cartel de Whack, HUD) conservan
su propio estilo: ya son pixel-art y viven en el código de cada juego.
