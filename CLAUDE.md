# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Project Architecture

This is a React-based photobooth web application built with Vite and Tailwind CSS. The app captures photos/GIFs from the user's camera and creates customizable photo strips with various layouts and designs.

### Core Technologies
- **React 18** with hooks and context for state management
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **gifshot** and **gifuct-js** for GIF creation and processing
- **react-webcam** for camera integration

### Key Components Structure

- **AppLayout.jsx** - Main layout wrapper with animated shooting star cursor
- **ThemeContext.jsx** - Theme management system (Pink/Red themes) with localStorage persistence
- **Photobooth.jsx** - Main application logic and state management
- **CameraSetup.jsx** - Camera capture logic with GIF recording support
- **FilterCarousel.jsx** - Photo filter system with individual and bulk application
- **StripDesign.jsx** - Design selection and download functionality
- **frameMappings.js** - Critical frame positioning data for photo placement

### Photo Strip Workflow
1. **Landing** - Animated welcome page
2. **Layout Selection** - Choose 1, 3, 4, or 6 photo layouts
3. **Photo Capture** - Camera with countdown timer and GIF recording
4. **Filter Application** - Individual or bulk photo filtering
5. **Design Selection** - Choose from layout-specific design templates
6. **Download** - Generate PNG photo strips or animated GIF strips

### Frame Mapping System

The `frameMappings.js` file is crucial for photo positioning. It defines:
- Exact pixel coordinates for photo placement within design templates
- Border radius for rounded corners
- Frame dimensions and aspect ratios
- Photo window positions for each design variant

When adding new designs:
1. Add design PNG files to `public/designs/`
2. Update design arrays in `Photobooth.jsx`
3. Add corresponding frame mapping in `frameMappings.js`
4. Test photo positioning accuracy

### Theme System

The app uses React Context for theme management with two themes:
- **Pink Theme** (light mode) - Default pink/purple gradients
- **Red Theme** (dark mode) - Red/dark gradients with cream-colored cards

Theme state persists in localStorage and affects:
- Background gradients
- Card colors
- Shooting star cursor animation
- Button styling

### Filter System

Filters use CSS filter properties and support:
- Individual photo filtering - different filter per photo
- "All Photos" bulk application
- Paginated filter selection
- Real-time preview on photo thumbnails

### GIF Features

The app captures motion during photo sessions using MediaRecorder API:
- Records video during photo capture
- Processes frames with gifuct-js
- Composites GIFs with design overlays
- Offers both static PNG and animated GIF downloads

### File Organization

- `public/designs/` - Design template PNG files organized by layout type
- `public/images/` - Layout preview images and UI assets
- `src/components/` - All React components
- Design templates follow naming: `{layout}-design{number}.png`

### Development Notes

- Component development follows existing patterns with hooks and context
- New layouts require updates to multiple files: component, mappings, and assets
- Photo positioning uses pixel-perfect coordinates - test thoroughly on different screens
- GIF processing is computationally intensive - consider performance implications
- Camera requires HTTPS in production for security