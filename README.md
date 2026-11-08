# Invert

A responsive color picker and inversion tool built with Bun, React, and TypeScript. Choose or paste a color, preview its inverse, and copy HEX, RGB, or RGBA codes.

## Features

- Native color picker and editable HEX, RGB, and RGBA input
- Side-by-side original and inverted color previews
- Copy buttons for each output format
- Red, green, blue, and opacity sliders
- Swap colors, generate a random color, or try a sample shade
- Input validation and layouts for mobile and desktop

## Getting started

Install Bun and then run:

```bash
bun install --frozen-lockfile
bun run dev
```

Open the local URL printed in your terminal (normally `http://localhost:3000`).

## Commands

| Command | Purpose |
| --- | --- |
| `bun run dev` | Start the development server with hot reloading |
| `bun run build` | Build the static site into `dist/` |
| `bun run start` | Serve the application with development features disabled |
| `bun run typecheck` | Check TypeScript types |

`bun run start` serves from the source using Bun's HTML bundler. To deploy the static build, upload the contents of `dist/` to a static web host after running `bun run build`.

## Usage

Paste a supported color into **Start with a color**, or use the eyedropper-shaped button to open your browser's color picker. Valid input updates the previews immediately. Adjust the sliders and use the copy icon next to any code to copy it.

For example, `#B8A4ED` inverts to `#475B12`:

```css
/* Original */
color: rgb(184, 164, 237);

/* Inverted */
color: rgb(71, 91, 18);
```

Inversion calculates `255 − channel` for each RGB channel and preserves opacity. It is not a guarantee of accessible text contrast.

See [the detailed usage and development guide](docs/usage.md) for supported input formats, transparency behavior, browser requirements, and project structure.

## License

[MIT](LICENSE) © 2026 Andrius Pratusis
