# TypeScript Migration Roadmap

## Overview
This document outlines the migration plan from JavaScript (JSX) to TypeScript (TSX) for the BoothieCall Playground photobooth application.

## Current State
- **Framework**: React 18 with Vite
- **Language**: JavaScript (JSX)
- **Styling**: Tailwind CSS with custom theme
- **Components**: ~15 React components
- **Dependencies**: Camera libraries, GIF processing, theme context

## Migration Benefits
- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Code Documentation**: Self-documenting interfaces and props
- **Maintainability**: Easier to understand and modify code
- **Team Collaboration**: Clear contracts between components

## Migration Complexity: **Medium-Low**
**Estimated Time**: 1-2 hours  
**Risk Level**: Low (incremental migration possible)

## Phase 1: Setup and Configuration (15 minutes)

### 1.1 Install TypeScript Dependencies
```bash
npm install -D typescript @types/react @types/react-dom @types/node
```

### 1.2 Create tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 1.3 Update Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/boothiecal_playground/',
})
```

## Phase 2: Core Type Definitions (20 minutes)

### 2.1 Create Type Definitions
```typescript
// src/types/index.ts
export interface PhotoData {
  id: string;
  dataUrl: string;
  timestamp: number;
  filter?: string;
}

export interface FrameWindow {
  left: number;
  top: number;
  width: number;
  height: number;
  borderRadius: number;
}

export interface FrameMapping {
  frame: string;
  frameWidth: number;
  frameHeight: number;
  windows: FrameWindow[];
}

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryHover: string;
  primaryGradient: string;
  primaryGradientHover: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  textAccent: string;
  border: string;
  borderLight: string;
  button: string;
  buttonSecondary: string;
  animatedBg: string;
  overlay: string;
  shadow: string;
}

export interface Theme {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

export type LayoutType = '1shot' | '3shot' | '4shot' | '6shot';

export interface FilterOption {
  name: string;
  value: string;
  cssFilter: string;
}
```

## Phase 3: Component Migration (45 minutes)

### 3.1 Priority Order for Migration
1. **ThemeContext.tsx** - Core dependency
2. **AppLayout.tsx** - Layout wrapper
3. **Landing.tsx** - Main entry point
4. **Photobooth.tsx** - Core logic component
5. **CameraSetup.tsx** - Camera functionality
6. **Button components** - Simple components first
7. **Layout selection components**
8. **Filter and design components**

### 3.2 Component Type Patterns

#### Button Components
```typescript
interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function BackButton({ onClick, children = "Back", className = "", disabled = false }: ButtonProps): JSX.Element
```

#### Theme Context
```typescript
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Implementation
}
```

#### Camera Component
```typescript
interface CameraSetupProps {
  layoutType: LayoutType;
  onPhotosReady: (photos: PhotoData[]) => void;
  onBack: () => void;
}
```

### 3.3 Migration Checklist per Component
- [ ] Rename .jsx to .tsx
- [ ] Add proper interface for props
- [ ] Type all state variables
- [ ] Type event handlers
- [ ] Add return type annotations
- [ ] Handle ref types
- [ ] Type any external library usage

## Phase 4: Advanced Typing (20 minutes)

### 4.1 External Library Types
```bash
# If needed for specific libraries
npm install -D @types/gifshot
```

### 4.2 Custom Hook Types
```typescript
// useTheme hook
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

### 4.3 Utility Type Guards
```typescript
// src/utils/typeGuards.ts
export const isValidLayoutType = (layout: string): layout is LayoutType => {
  return ['1shot', '3shot', '4shot', '6shot'].includes(layout);
};
```

## Phase 5: Testing and Validation (10 minutes)

### 5.1 Build Validation
```bash
npm run build
```

### 5.2 Type Checking
```bash
npx tsc --noEmit
```

### 5.3 Runtime Testing
- Test all major user flows
- Verify camera functionality
- Check theme switching
- Validate photo capture and download

## Migration Strategy

### Approach: **Incremental Migration**
1. Start with leaf components (no dependencies)
2. Move up the component tree
3. Migrate shared utilities and contexts last
4. Maintain backward compatibility during transition

### Risk Mitigation
- **Git branches**: Create feature branch for migration
- **Incremental commits**: Commit after each component migration
- **Fallback plan**: Keep backup of working JSX version
- **Testing**: Verify functionality after each phase

## File Structure After Migration

```
src/
├── types/
│   ├── index.ts
│   └── components.ts
├── components/
│   ├── AppLayout.tsx
│   ├── Landing.tsx
│   ├── Photobooth.tsx
│   ├── CameraSetup.tsx
│   ├── ThemeContext.tsx
│   └── ...
├── utils/
│   ├── typeGuards.ts
│   └── constants.ts
└── main.tsx
```

## Package.json Updates

### New Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  }
}
```

### Updated Dependencies
- Add TypeScript and type definitions
- Update ESLint configuration for TypeScript
- Ensure Vite supports TypeScript out of the box

## Expected Challenges and Solutions

### 1. **Theme Context Typing**
- **Challenge**: Complex theme object structure
- **Solution**: Create comprehensive ThemeColors interface

### 2. **Camera Integration**
- **Challenge**: WebRTC and MediaRecorder APIs
- **Solution**: Use built-in DOM types, add custom types as needed

### 3. **GIF Processing Libraries**
- **Challenge**: Limited type definitions for gif libraries
- **Solution**: Create custom type declarations or use any with comments

### 4. **Frame Mapping Data**
- **Challenge**: Complex nested object structure
- **Solution**: Create detailed interfaces for frame configurations

## Success Criteria

- ✅ All components compile without TypeScript errors
- ✅ All existing functionality works as before
- ✅ Enhanced IDE support (autocomplete, error detection)
- ✅ Type safety for prop passing between components
- ✅ Build process includes type checking
- ✅ No runtime errors introduced by migration

## Future Enhancements (Post-Migration)

1. **Strict Type Checking**: Enable additional strict flags
2. **Generic Components**: Create reusable typed components
3. **API Integration**: Add types for future API integrations
4. **Testing**: Add typed unit tests with Jest and Testing Library
5. **Documentation**: Generate type documentation

## Timeline Summary

| Phase | Duration | Description |
|-------|----------|-------------|
| 1 | 15 min | Setup and configuration |
| 2 | 20 min | Core type definitions |
| 3 | 45 min | Component migration |
| 4 | 20 min | Advanced typing |
| 5 | 10 min | Testing and validation |
| **Total** | **~2 hours** | **Complete migration** |

---

**Note**: This roadmap assumes familiarity with TypeScript. Adjust timeline if team needs TypeScript training.

**Migration Branch Strategy**: Create `feature/typescript-migration` branch from current state for safe migration.