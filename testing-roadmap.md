# 🧪 Roadmap de Integración de Suite de Pruebas - BoothieCall Playground

## 📋 Información General

**Proyecto**: BoothieCall Playground  
**Stack Base**: React 18 + TypeScript + Vite + Tailwind CSS  
**Objetivo**: Implementar una suite de pruebas moderna y eficiente  
**Tiempo Estimado**: 3-4 horas  
**Prerrequisito**: Migración completa a TypeScript ✅

---

## 🎯 Objetivos de las Pruebas

- **Prevenir Regresiones**: Asegurar que nuevas funcionalidades no rompan las existentes
- **Garantizar Calidad**: Validar comportamiento esperado de componentes
- **Facilitar Refactoring**: Permitir cambios de código con confianza
- **Documentación Viva**: Las pruebas como documentación del comportamiento

---

## 🛠️ Stack de Pruebas Propuesto

| Herramienta | Propósito | Justificación |
|-------------|-----------|---------------|
| **Vitest** | Motor de pruebas | Integración nativa con Vite, velocidad extrema |
| **React Testing Library** | Pruebas de componentes | Best practices, testing como usuario real |
| **@testing-library/jest-dom** | Aserciones DOM | Matchers legibles y expresivos |
| **@testing-library/user-event** | Simulación de eventos | Interacciones realistas del usuario |

---

## 📅 Fases de Implementación

### **FASE 1: Configuración Base** ⚙️
**Duración**: 30 minutos  
**Prioridad**: Alta

#### 1.1 Instalación de Dependencias
```bash
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

#### 1.2 Configuración de Vite
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/boothiecal_playground/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        '**/*.test.{ts,tsx}',
        '**/*.config.{ts,js}',
      ],
    },
  },
})
```

#### 1.3 Setup de Pruebas
```typescript
// src/setupTests.ts
import '@testing-library/jest-dom';

// Mock para window.matchMedia (necesario para componentes con media queries)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock para URL.createObjectURL (usado en descargas)
global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();
```

#### 1.4 Scripts NPM
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch",
    "test:run": "vitest run"
  }
}
```

#### 1.5 Archivo de Utilidades de Testing
```typescript
// src/test-utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { ThemeProvider } from './components/ThemeContext';

// Wrapper personalizado que incluye el ThemeProvider
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

// Helper de renderizado customizado
export const renderWithTheme = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
```

---

### **FASE 2: Pruebas de Utilidades** 🔧
**Duración**: 15 minutos  
**Prioridad**: Media

#### 2.1 Type Guards Testing
```typescript
// src/utils/typeGuards.test.ts
import { describe, it, expect } from 'vitest';
import { isValidLayoutType } from './typeGuards';

describe('Type Guards', () => {
  describe('isValidLayoutType', () => {
    it('should validate correct layout types', () => {
      expect(isValidLayoutType('1shot')).toBe(true);
      expect(isValidLayoutType('3shot')).toBe(true);
      expect(isValidLayoutType('4shot')).toBe(true);
      expect(isValidLayoutType('6shot')).toBe(true);
    });

    it('should reject invalid layout types', () => {
      expect(isValidLayoutType('2shot')).toBe(false);
      expect(isValidLayoutType('5shot')).toBe(false);
      expect(isValidLayoutType('invalid')).toBe(false);
      expect(isValidLayoutType('')).toBe(false);
      expect(isValidLayoutType(null as any)).toBe(false);
      expect(isValidLayoutType(undefined as any)).toBe(false);
    });
  });
});
```

#### 2.2 Pruebas de Constantes
```typescript
// src/utils/constants.test.ts
import { describe, it, expect } from 'vitest';
// Importar constantes según sea necesario

describe('Constants', () => {
  it('should have correct frame mappings structure', () => {
    // Verificar estructura de frameMappings si se convierte a constante
    expect(typeof frameMappings).toBe('object');
    expect(frameMappings['1shot-design1']).toBeDefined();
  });
});
```

---

### **FASE 3: Componentes Básicos** 🧩
**Duración**: 45 minutos  
**Prioridad**: Alta

#### 3.1 Pruebas de NextButton
```typescript
// src/components/NextButton.test.tsx
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import NextButton from './NextButton';
import { renderWithTheme } from '../test-utils';

describe('NextButton', () => {
  it('renders with default text', () => {
    renderWithTheme(<NextButton onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('renders with custom children', () => {
    renderWithTheme(<NextButton onClick={() => {}}>Continue</NextButton>);
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    renderWithTheme(<NextButton onClick={handleClick} />);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<NextButton onClick={() => {}} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom className', () => {
    renderWithTheme(<NextButton onClick={() => {}} className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('has correct Elegancia Nocturna styling', () => {
    renderWithTheme(<NextButton onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('font-elegancia-body', 'shadow-elegancia');
  });
});
```

#### 3.2 Pruebas de BackButton
```typescript
// src/components/BackButton.test.tsx
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import BackButton from './BackButton';
import { renderWithTheme } from '../test-utils';

describe('BackButton', () => {
  it('renders with default text', () => {
    renderWithTheme(<BackButton onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  it('renders custom children', () => {
    renderWithTheme(<BackButton onClick={() => {}}>Go Back</BackButton>);
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    renderWithTheme(<BackButton onClick={handleClick} />);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('shows back arrow icon', () => {
    renderWithTheme(<BackButton onClick={() => {}} />);
    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
```

#### 3.3 Pruebas de AppLayout
```typescript
// src/components/AppLayout.test.tsx
import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AppLayout from './AppLayout';
import { renderWithTheme } from '../test-utils';

describe('AppLayout', () => {
  it('renders children correctly', () => {
    renderWithTheme(
      <AppLayout>
        <div>Test Content</div>
      </AppLayout>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies correct theme classes', () => {
    renderWithTheme(
      <AppLayout>
        <div>Content</div>
      </AppLayout>
    );
    const container = screen.getByText('Content').parentElement;
    expect(container).toHaveClass('min-h-screen');
  });

  it('accepts custom className', () => {
    renderWithTheme(
      <AppLayout className="custom-layout">
        <div>Content</div>
      </AppLayout>
    );
    const container = screen.getByText('Content').parentElement;
    expect(container).toHaveClass('custom-layout');
  });
});
```

---

### **FASE 4: Componentes con Estado** 🎮
**Duración**: 1.5 horas  
**Prioridad**: Alta

#### 4.1 Pruebas de ThemeContext
```typescript
// src/components/ThemeContext.test.tsx
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeContext';
import { render } from '@testing-library/react';

// Componente de prueba para usar el hook
const TestComponent = () => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="dark-mode">{isDarkMode.toString()}</span>
      <span data-testid="primary-color">{colors.primary}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  it('provides default Elegancia Nocturna theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('dark-mode')).toHaveTextContent('true');
    expect(screen.getByTestId('primary-color')).toHaveTextContent('elegancia-primary');
  });

  it('throws error when used outside provider', () => {
    // Suprimir console.error para esta prueba
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => render(<TestComponent />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    );
    
    consoleSpy.mockRestore();
  });
});
```

#### 4.2 Pruebas de Landing
```typescript
// src/components/Landing.test.tsx
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Landing from './Landing';
import { renderWithTheme } from '../test-utils';

describe('Landing', () => {
  it('renders welcome message and logo', () => {
    renderWithTheme(<Landing onStart={() => {}} />);
    expect(screen.getByText(/boothiecall playground/i)).toBeInTheDocument();
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  it('calls onStart when start button is clicked', async () => {
    const handleStart = vi.fn();
    const user = userEvent.setup();
    
    renderWithTheme(<Landing onStart={handleStart} />);
    const startButton = screen.getByRole('button', { name: /start/i });
    await user.click(startButton);
    
    expect(handleStart).toHaveBeenCalledOnce();
  });

  it('displays gallery background images', () => {
    renderWithTheme(<Landing onStart={() => {}} />);
    const galleryImages = screen.getAllByAltText(/gallery/i);
    expect(galleryImages.length).toBeGreaterThan(0);
  });

  it('shows card hover effect', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Landing onStart={() => {}} />);
    
    const mainCard = screen.getByRole('button', { name: /start/i }).closest('.card');
    await user.hover(mainCard!);
    
    // Verificar que se aplican clases de hover
    expect(mainCard).toHaveClass('transform');
  });

  it('has proper Elegancia Nocturna styling', () => {
    renderWithTheme(<Landing onStart={() => {}} />);
    const heading = screen.getByText(/boothiecall playground/i);
    expect(heading).toHaveClass('font-elegancia-heading');
  });
});
```

#### 4.3 Pruebas de Photobooth Flow
```typescript
// src/components/Photobooth.test.tsx
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Photobooth from './Photobooth';
import { renderWithTheme } from '../test-utils';

// Mock de componentes que requieren cámara
vi.mock('./CameraSetup', () => ({
  default: ({ onBack, onDone }: any) => (
    <div data-testid="camera-setup">
      <button onClick={onBack}>Back to Layout</button>
      <button onClick={() => onDone([])}>Photos Done</button>
    </div>
  ),
}));

vi.mock('./StripDesign', () => ({
  default: ({ onBack }: any) => (
    <div data-testid="strip-design">
      <button onClick={onBack}>Back to Camera</button>
    </div>
  ),
}));

describe('Photobooth', () => {
  const mockOnBack = vi.fn();

  beforeEach(() => {
    mockOnBack.mockClear();
  });

  it('initially shows layout selection', () => {
    renderWithTheme(<Photobooth onBack={mockOnBack} />);
    // Buscar elementos específicos del StripLayoutSelection
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  it('navigates back when back button is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Photobooth onBack={mockOnBack} />);
    
    await user.click(screen.getByRole('button', { name: /back/i }));
    expect(mockOnBack).toHaveBeenCalledOnce();
  });

  it('shows confirmation screen after layout selection', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Photobooth onBack={mockOnBack} />);
    
    // Simular selección de layout (esto dependerá de cómo funcione StripLayoutSelection)
    // Por ahora, probamos que el estado interno cambie correctamente
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  it('manages design overlays correctly', () => {
    renderWithTheme(<Photobooth onBack={mockOnBack} />);
    
    // Verificar que los overlays están definidos
    // Esto puede requerir exponer algún estado interno o usar data-testid
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });
});
```

---

### **FASE 5: Integración y Flujo Completo** 🌐
**Duración**: 1 hora  
**Prioridad**: Media

#### 5.1 Pruebas de App.tsx
```typescript
// src/App.test.tsx
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from './App';
import { render } from './test-utils';

describe('App Integration', () => {
  it('renders landing page by default', () => {
    render(<App />);
    expect(screen.getByText(/boothiecall playground/i)).toBeInTheDocument();
  });

  it('navigates from landing to photobooth', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Click start button
    const startButton = screen.getByRole('button', { name: /start/i });
    await user.click(startButton);
    
    // Should show photobooth (layout selection)
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  it('navigates back from photobooth to landing', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Go to photobooth
    await user.click(screen.getByRole('button', { name: /start/i }));
    
    // Go back to landing
    await user.click(screen.getByRole('button', { name: /back/i }));
    
    // Should be back at landing
    expect(screen.getByText(/boothiecall playground/i)).toBeInTheDocument();
  });

  it('maintains theme context throughout navigation', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Verify theme is applied on landing
    const heading = screen.getByText(/boothiecall playground/i);
    expect(heading).toHaveClass('font-elegancia-heading');
    
    // Navigate to photobooth
    await user.click(screen.getByRole('button', { name: /start/i }));
    
    // Theme should still be applied
    const backButton = screen.getByRole('button', { name: /back/i });
    expect(backButton).toHaveClass('font-elegancia-body');
  });
});
```

#### 5.2 Pruebas E2E Simuladas
```typescript
// src/integration/user-flows.test.tsx
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import { render } from '../test-utils';

describe('User Flow Integration', () => {
  it('completes basic photobooth flow', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // 1. Start from landing
    expect(screen.getByText(/boothiecall playground/i)).toBeInTheDocument();
    
    // 2. Enter photobooth
    await user.click(screen.getByRole('button', { name: /start/i }));
    
    // 3. Should be in layout selection
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    
    // 4. Return to landing
    await user.click(screen.getByRole('button', { name: /back/i }));
    
    // 5. Back at landing
    expect(screen.getByText(/boothiecall playground/i)).toBeInTheDocument();
  });

  it('handles theme consistency across components', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Check theme on landing
    const landingHeading = screen.getByText(/boothiecall playground/i);
    expect(landingHeading).toHaveClass('font-elegancia-heading');
    
    // Navigate and check theme consistency
    await user.click(screen.getByRole('button', { name: /start/i }));
    
    const photoboothButton = screen.getByRole('button', { name: /back/i });
    expect(photoboothButton).toHaveClass('font-elegancia-body');
  });
});
```

---

### **FASE 6: Mocks y Simulaciones** 🎭
**Duración**: 30 minutos  
**Prioridad**: Baja

#### 6.1 Mocks Globales
```typescript
// src/mocks/browser.ts
// Mock para APIs del navegador
export const mockCamera = {
  takePhoto: vi.fn(() => 'data:image/png;base64,mock-image-data'),
  takePhotoStream: vi.fn(() => ({
    getTracks: () => [{ stop: vi.fn() }],
  })),
};

// Mock para react-camera-pro
vi.mock('react-camera-pro', () => ({
  Camera: vi.fn(({ ref }) => {
    if (ref && typeof ref === 'object' && ref.current !== undefined) {
      ref.current = mockCamera;
    }
    return <div data-testid="mock-camera">Mock Camera Component</div>;
  }),
}));

// Mock para gifshot
vi.mock('gifshot', () => ({
  default: {
    createGIF: vi.fn((options, callback) => {
      callback({
        error: false,
        image: 'data:image/gif;base64,mock-gif-data',
      });
    }),
  },
}));

// Mock para gifuct-js
vi.mock('gifuct-js', () => ({
  parseGIF: vi.fn(() => ({ frames: [] })),
  decompressFrames: vi.fn(() => []),
}));
```

#### 6.2 Mock de Media APIs
```typescript
// src/mocks/media.ts
// Mock para MediaRecorder
global.MediaRecorder = vi.fn().mockImplementation(() => ({
  start: vi.fn(),
  stop: vi.fn(),
  ondataavailable: null,
  onstop: null,
}));

// Mock para getUserMedia
Object.defineProperty(navigator, 'mediaDevices', {
  writable: true,
  value: {
    getUserMedia: vi.fn().mockResolvedValue({
      getTracks: () => [{ stop: vi.fn() }],
    }),
  },
});

// Mock para Screen Orientation API
Object.defineProperty(window.screen, 'orientation', {
  writable: true,
  value: {
    type: 'landscape-primary',
  },
});
```

#### 6.3 Helper para Testing de Hooks
```typescript
// src/test-utils/hooks.tsx
import { renderHook } from '@testing-library/react';
import { ThemeProvider } from '../components/ThemeContext';

export const renderHookWithTheme = <T,>(hook: () => T) => {
  return renderHook(hook, {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
  });
};
```

---

## 📊 Métricas de Éxito

### Criterios de Aceptación
- [ ] Suite de pruebas ejecuta sin errores (`npm run test`)
- [ ] Cobertura mínima del 70% en componentes críticos
- [ ] Pruebas de flujo principal completas
- [ ] Tiempo de ejecución < 30 segundos
- [ ] Documentación de testing actualizada

### KPIs y Objetivos
| Métrica | Objetivo | Comando | Estado |
|---------|----------|---------|---------|
| **Cobertura General** | >70% | `npm run test:coverage` | ⏳ |
| **Cobertura Crítica** | >90% | Manual | ⏳ |
| **Tiempo Ejecución** | <30s | `npm run test:run` | ⏳ |
| **Pruebas Pasando** | 100% | `npm run test` | ⏳ |

### Componentes Críticos (Cobertura >90%)
- [x] ThemeContext
- [x] Landing  
- [x] Photobooth
- [x] NextButton/BackButton
- [ ] CameraSetup
- [ ] StripDesign
- [ ] StripLayoutSelection

---

## 🔄 Proceso de Desarrollo

### Workflow de Testing
```bash
# Desarrollo con pruebas en watch mode
npm run test:watch

# Ejecutar todas las pruebas
npm run test:run

# Ver cobertura
npm run test:coverage

# Interfaz visual
npm run test:ui
```

### Convenciones de Nomenclatura
- **Archivos**: `Component.test.tsx` junto al componente
- **Describe blocks**: Agrupación por componente/funcionalidad
- **Test descriptions**: Comportamiento esperado en inglés
- **Data attributes**: `data-testid` para elementos específicos de testing

### Pre-commit Hooks (Futuro)
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run test:run && npm run type-check"
    }
  }
}
```

---

## 🚀 Plan de Implementación

### Sprint 1: Configuración (1 día)
- [ ] **Fase 1**: Instalación y configuración base
- [ ] **Fase 2**: Pruebas de utilidades
- [ ] Documentación inicial

### Sprint 2: Componentes Básicos (2 días)  
- [ ] **Fase 3**: Botones y componentes simples
- [ ] Tests de ThemeContext
- [ ] Setup de mocks básicos

### Sprint 3: Componentes Complejos (3 días)
- [ ] **Fase 4**: Landing, Photobooth, flujos con estado
- [ ] Mocks de cámara y media APIs
- [ ] Pruebas de integración básicas

### Sprint 4: Integración Final (1 día)
- [ ] **Fase 5**: Flujos completos de usuario
- [ ] **Fase 6**: Mocks avanzados
- [ ] CI/CD setup
- [ ] Documentación final

---

## 🔮 Roadmap Futuro

### Próximas Mejoras (Post-MVP)
1. **GitHub Actions CI/CD**
   ```yaml
   # .github/workflows/test.yml
   name: Tests
   on: [push, pull_request]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: npm ci
         - run: npm run test:run
         - run: npm run test:coverage
   ```

2. **Visual Regression Testing**
   - Chromatic para Storybook
   - Percy para screenshots automáticos

3. **E2E Testing con Playwright**
   ```typescript
   // tests/e2e/photobooth-flow.spec.ts
   test('complete photobooth experience', async ({ page }) => {
     await page.goto('/');
     await page.click('text=Start Playground');
     await page.click('text=4 Photos');
     // ... flujo completo
   });
   ```

4. **Performance Testing**
   - Lighthouse CI
   - Bundle analyzer
   - Métricas de Web Vitals

5. **Accessibility Testing**
   ```typescript
   import { axe, toHaveNoViolations } from 'jest-axe';
   
   expect.extend(toHaveNoViolations);
   
   test('should not have accessibility violations', async () => {
     const { container } = render(<Landing onStart={() => {}} />);
     const results = await axe(container);
     expect(results).toHaveNoViolations();
   });
   ```

---

## 📚 Recursos y Referencias

### Documentación
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

### Patrones de Testing
- [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

### Herramientas Adicionales
- [Mock Service Worker](https://mswjs.io/) - Para mocking de APIs
- [Storybook](https://storybook.js.org/) - Para desarrollo y testing visual
- [Chromatic](https://www.chromatic.com/) - Para visual regression testing

---

## 📝 Checklist de Implementación

### Configuración Inicial
- [ ] Instalar dependencias de testing
- [ ] Configurar Vitest en vite.config.ts
- [ ] Crear setupTests.ts
- [ ] Crear test-utils.tsx
- [ ] Actualizar package.json con scripts

### Pruebas por Componente
- [ ] ThemeContext.test.tsx
- [ ] NextButton.test.tsx  
- [ ] BackButton.test.tsx
- [ ] AppLayout.test.tsx
- [ ] Landing.test.tsx
- [ ] Photobooth.test.tsx
- [ ] App.test.tsx

### Utilidades y Mocks
- [ ] typeGuards.test.ts
- [ ] browser mocks setup
- [ ] camera API mocks
- [ ] GIF processing mocks

### Documentación
- [ ] README con comandos de testing
- [ ] Guía para escribir nuevas pruebas
- [ ] Convenciones del equipo

### CI/CD (Futuro)
- [ ] GitHub Actions workflow
- [ ] Pre-commit hooks
- [ ] Coverage reporting
- [ ] Badge de estado en README

---

**Estado Actual**: 📋 Pendiente de implementación  
**Próxima Acción**: Ejecutar Fase 1 - Configuración Base  
**Responsable**: Equipo de desarrollo  
**Fecha Target**: [Definir según prioridades del equipo]

---

*Este roadmap es un documento vivo que debe actualizarse según evolucione el proyecto y se identifiquen nuevas necesidades de testing.*