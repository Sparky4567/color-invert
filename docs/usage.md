# Usage and development guide

## Supported input

| Format | Example |
| --- | --- |
| Three-digit HEX | `#ABC` |
| Four-digit HEX with alpha | `#ABCD` |
| Six-digit HEX | `#B8A4ED` |
| Eight-digit HEX with alpha | `#B8A4ED80` |
| RGB | `rgb(184, 164, 237)` |
| RGBA | `rgba(184, 164, 237, 0.5)` |

The leading `#` is optional for HEX. HEX values are case insensitive. RGB channels must be integers from 0 to 255, and alpha must be between 0 and 1. Leading and trailing whitespace is ignored.

Named CSS colors, HSL, percentage RGB channels, and space-separated CSS color syntax are not supported. Invalid input shows a validation message and leaves the last valid color in the previews.

## Controls

- **Color picker:** Click the picker button on the original swatch to choose a color. Existing opacity is preserved.
- **Sliders:** Change individual RGB channels or opacity. Slider changes update the input and previews.
- **Swap:** The arrow button between the cards makes the inverted color the original color.
- **Surprise me:** Generate an opaque random RGB color.
- **Sample colors:** Select a sample beneath the main panel to try an opaque preset.
- **Copy:** Copy the corresponding format from either card. A check mark confirms success.

## Transparency and output

The checkerboard behind a swatch shows transparency. Inversion changes only red, green, and blue:

```text
inverted red   = 255 - original red
inverted green = 255 - original green
inverted blue  = 255 - original blue
inverted alpha = original alpha
```

HEX output uses six digits for opaque colors and eight digits when alpha is below 1. Eight-digit HEX quantizes alpha to one byte. RGB output omits opacity; use RGBA or eight-digit HEX when transparency matters. RGBA output rounds alpha to three decimal places. The opacity slider adjusts in whole percentage points.

For example, `rgba(10, 20, 30, 0.5)` becomes `rgba(245, 235, 225, 0.5)`.

## Browser and privacy notes

Use a modern browser with native color input and Clipboard API support. Clipboard writing requires a secure context, such as HTTPS or localhost, and browser permission. If copying fails, select the displayed code and copy it manually.

Color calculations run in the browser and do not require a server API. The stylesheet loads DM Sans and Manrope from Google Fonts; system fonts are used if those requests are unavailable.

## Development

Bun 1.4.4 was used to build and verify this project. Dependencies are locked in `bun.lock`.

```bash
bun install --frozen-lockfile
bun run typecheck
bun run build
```

To choose a different server port:

```bash
PORT=3001 bun run dev
```

### Project structure

| File | Responsibility |
| --- | --- |
| `src/App.tsx` | React interface and interaction state |
| `src/colors.ts` | Color parsing, inversion, and code formatting |
| `src/index.css` | Styling and responsive layouts |
| `src/frontend.tsx` | React entry point and hot reload setup |
| `src/index.html` | HTML shell and metadata |
| `src/index.ts` | Bun development and production server |

The server and unused `APITester.tsx`, `logo.svg`, and `react.svg` retain example assets/routes from the Bun starter. The color inverter does not depend on the example API routes.

### Static deployment

Run `bun run build` and deploy the contents of `dist/`. No backend is needed for the color tool. Use HTTPS so clipboard copying works outside localhost.

The generated `dist/` directory, dependencies, and environment files are excluded from version control. Only variables prefixed with `BUN_PUBLIC_` are configured for inclusion in the browser bundle; do not use that prefix for secrets.
