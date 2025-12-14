# Glowing Bento Grid Portfolio

A modern, interactive portfolio showcase featuring a bento-grid layout with dynamic glowing card effects.

## Features

- **Interactive Glowing Cards**: Mouse-responsive glow effects that follow cursor movement
- **Dynamic Color Gradients**: Position-based color schemes (blue-pink for left, pink-yellow for right, multi-color for center)
- **Responsive Bento Layout**: Flexible grid system that adapts to different screen sizes
- **Smooth Animations**: 60 FPS animations powered by Framer Motion

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Vite

## Project Structure

```
src/
├── components/
│   ├── GlowingEffectDemo.tsx   # Main demo component with card grid
│   └── ui/
│       ├── glow-card.tsx       # Reusable glowing card component
│       └── glowing-effect.tsx  # Core glowing effect logic
├── pages/
│   └── Index.tsx               # Home page
└── index.css                   # Global styles & design tokens
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
