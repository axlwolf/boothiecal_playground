# 📱 Roadmap de Implementación PWA - BoothieCall Playground

## 📋 Información General

**Proyecto**: BoothieCall Playground  
**Stack Base**: React 18 + TypeScript + Vite + Tailwind CSS  
**Objetivo**: Transformar la aplicación en una PWA completa con experiencia nativa  
**Tiempo Estimado**: 2-3 horas  
**Prerrequisito**: Testing suite implementada y aplicación estable

---

## 🎯 Objetivos de la PWA

- **📲 Instalabilidad**: "Add to Home Screen" experience
- **⚡ Performance**: Carga instantánea con cache inteligente
- **📶 Offline Support**: Funcionalidad básica sin conexión
- **🎪 Event-Ready**: Optimizada para uso en eventos/venues
- **📱 Native Feel**: Experiencia app-like en dispositivos móviles

---

## 🛠️ Stack PWA Propuesto

| Herramienta | Propósito | Justificación |
|-------------|-----------|---------------|
| **vite-plugin-pwa** | Core PWA functionality | Integración nativa con Vite, zero-config |
| **Workbox** | Service Worker management | Estrategias de cache avanzadas |
| **workbox-window** | SW communication | Updates y notificaciones |
| **Web App Manifest** | Instalación y metadatos | Comportamiento app-like |

---

## 📅 Fases de Implementación

### **FASE 1: Setup y Configuración Base** ⚙️
**Duración**: 45 minutos  
**Prioridad**: Alta

#### 1.1 Instalación de Dependencias PWA
```bash
npm install -D vite-plugin-pwa workbox-window
npm install -D @types/workbox-window # Para TypeScript support
```

#### 1.2 Configuración de Vite PWA
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/boothiecal_playground/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // Para testing en desarrollo
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'BoothieCall Playground',
        short_name: 'Photobooth',
        description: 'Professional photobooth experience with Elegancia Nocturna theme',
        theme_color: '#D8AE48',
        background_color: '#0A0A0A',
        display: 'standalone',
        orientation: 'landscape-primary',
        start_url: '/boothiecal_playground/',
        scope: '/boothiecal_playground/',
        icons: [
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        categories: ['photo', 'entertainment', 'lifestyle'],
        shortcuts: [
          {
            name: 'Quick Photobooth',
            short_name: 'Photobooth',
            description: 'Start a new photobooth session',
            url: '/boothiecal_playground/',
            icons: [{ src: 'logo.png', sizes: '192x192' }]
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,woff,woff2}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB max
        runtimeCaching: [
          // Cache de designs (estrategia Cache First)
          {
            urlPattern: /\/designs\/.*\.png$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'designs-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 días
              },
              cacheKeyWillBeUsed: async ({ request }) => {
                return `${request.url}?v=1`; // Cache versioning
              }
            }
          },
          // Cache de galería (estrategia Stale While Revalidate)
          {
            urlPattern: /\/gallery\/.*\.(png|jpg|jpeg)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'gallery-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 días
              }
            }
          },
          // Cache de fonts
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
              },
              cacheKeyWillBeUsed: async ({ request }) => {
                return request.url
              }
            }
          }
        ]
      }
    })
  ]
})
```

#### 1.3 Actualización de package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "pwa:dev": "vite --mode development",
    "pwa:build": "vite build --mode production",
    "pwa:preview": "vite preview --mode production"
  }
}
```

---

### **FASE 2: Iconografía y Assets PWA** 🎨
**Duración**: 30 minutos  
**Prioridad**: Alta

#### 2.1 Generación de Iconos PWA
```bash
# Script para generar iconos de diferentes tamaños
# Usar logo.png existente como base (512x512)
```

#### 2.2 Assets PWA Requeridos
```
public/
├── favicon.ico (32x32)
├── apple-touch-icon.png (180x180)
├── pwa-192x192.png (192x192)
├── pwa-512x512.png (512x512)
├── pwa-maskable-192x192.png (192x192 maskable)
├── pwa-maskable-512x512.png (512x512 maskable)
└── manifest-icon-512.maskable.png
```

#### 2.3 Splash Screens (iOS)
```typescript
// Meta tags para splash screens iOS
const iOSSplashScreens = [
  {
    media: 'screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
    href: '/splash/iphone5_splash.png'
  },
  {
    media: 'screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
    href: '/splash/iphone6_splash.png'
  },
  // ... más splash screens para diferentes dispositivos
];
```

---

### **FASE 3: Service Worker y Cache Strategy** 🔄
**Duración**: 45 minutos  
**Prioridad**: Alta

#### 3.1 Estrategias de Cache Personalizadas
```typescript
// src/pwa/cacheStrategies.ts
export const photoboothCacheStrategies = {
  // Designs - Critical for offline functionality
  designs: {
    urlPattern: /\/designs\/.*\.png$/,
    handler: 'CacheFirst' as const,
    options: {
      cacheName: 'photobooth-designs',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30 // 30 días
      }
    }
  },
  
  // Gallery images - Background content
  gallery: {
    urlPattern: /\/gallery\/.*\.(png|jpg|jpeg)$/,
    handler: 'StaleWhileRevalidate' as const,
    options: {
      cacheName: 'photobooth-gallery',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 7 // 7 días
      }
    }
  },
  
  // External fonts
  fonts: {
    urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
    handler: 'CacheFirst' as const,
    options: {
      cacheName: 'google-fonts',
      expiration: {
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
      }
    }
  }
};
```

#### 3.2 Offline Fallbacks
```typescript
// src/pwa/offlineFallbacks.ts
export const offlineFallbacks = {
  // Página offline para navegación
  offline: '/offline.html',
  
  // Imagen placeholder para designs que no están en cache
  designFallback: '/images/design-placeholder.png',
  
  // Configuración para funcionalidad mínima offline
  minimalFeatures: [
    'layout-selection',
    'camera-access',
    'basic-designs'
  ]
};
```

---

### **FASE 4: PWA Features y UX** 📱
**Duración**: 60 minutos  
**Prioridad**: Media

#### 4.1 Install Prompt Personalizado
```typescript
// src/components/PWAInstallPrompt.tsx
import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const { colors } = useTheme();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  if (!showInstallPrompt) return null;

  return (
    <div className={`fixed bottom-4 left-4 right-4 ${colors.card} rounded-xl shadow-elegancia p-4 z-50`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`${colors.text} font-elegancia-heading text-lg font-bold`}>
            Install BoothieCall
          </h3>
          <p className={`${colors.textSecondary} text-sm`}>
            Get the full photobooth experience!
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowInstallPrompt(false)}
            className={`px-4 py-2 ${colors.buttonSecondary} rounded-lg text-sm`}
          >
            Later
          </button>
          <button
            onClick={handleInstallClick}
            className={`px-4 py-2 ${colors.button} rounded-lg text-sm font-bold`}
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
};
```

#### 4.2 Update Notifications
```typescript
// src/components/PWAUpdatePrompt.tsx
import React, { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export const PWAUpdatePrompt: React.FC = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(r) {
      console.log('PWA: Service Worker registered', r);
    },
    onRegisterError(error) {
      console.log('PWA: Service Worker registration error', error);
    }
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <>
      {(offlineReady || needRefresh) && (
        <div className="fixed top-4 right-4 bg-elegancia-surface border border-elegancia-primary rounded-xl shadow-elegancia p-4 z-50">
          <div className="text-elegancia-primary font-elegancia-body">
            {offlineReady ? (
              <span>App ready to work offline!</span>
            ) : (
              <span>New content available, click refresh to update.</span>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={close}
              className="px-3 py-1 bg-gray-600 text-white rounded text-sm"
            >
              Close
            </button>
            {needRefresh && (
              <button
                onClick={() => updateServiceWorker(true)}
                className="px-3 py-1 bg-elegancia-primary text-elegancia-dark rounded text-sm font-bold"
              >
                Refresh
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
```

#### 4.3 Offline Status Indicator
```typescript
// src/components/OfflineIndicator.tsx
import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

export const OfflineIndicator: React.FC = () => {
  const { colors } = useTheme();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-2 text-center text-sm font-bold z-50">
      📶 You're offline - Some features may be limited
    </div>
  );
};
```

---

### **FASE 5: Camera PWA Optimization** 📸
**Duración**: 30 minutos  
**Prioridad**: Media

#### 5.1 Camera Permission Persistence
```typescript
// src/hooks/useCameraPWA.ts
import { useState, useEffect } from 'react';

interface CameraPWAState {
  hasPermission: boolean;
  isSupported: boolean;
  isStandalone: boolean;
}

export const useCameraPWA = (): CameraPWAState => {
  const [state, setState] = useState<CameraPWAState>({
    hasPermission: false,
    isSupported: false,
    isStandalone: false
  });

  useEffect(() => {
    const checkCameraSupport = async () => {
      // Check if running as standalone PWA
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                          (window.navigator as any).standalone ||
                          document.referrer.includes('android-app://');

      // Check camera API support
      const isSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

      // Check for existing permissions
      let hasPermission = false;
      if (isSupported) {
        try {
          const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
          hasPermission = result.state === 'granted';
        } catch (error) {
          console.log('Permission API not supported');
        }
      }

      setState({ hasPermission, isSupported, isStandalone });
    };

    checkCameraSupport();
  }, []);

  return state;
};
```

#### 5.2 PWA-Specific Camera Handling
```typescript
// src/utils/cameraPWA.ts
export const requestCameraPermissionPWA = async (): Promise<boolean> => {
  try {
    // For PWA, we need to be extra careful with permissions
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    });

    // Immediately stop the stream - we just wanted to get permission
    stream.getTracks().forEach(track => track.stop());
    
    return true;
  } catch (error) {
    console.error('Camera permission denied in PWA:', error);
    return false;
  }
};

export const isCameraAvailableInPWA = (): boolean => {
  // Check if camera API is available in current PWA context
  return !!(
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia &&
    window.isSecureContext
  );
};
```

---

### **FASE 6: Testing y Optimización** 🧪
**Duración**: 45 minutos  
**Prioridad**: Alta

#### 6.1 PWA Testing Suite
```typescript
// src/tests/pwa.test.ts
import { describe, it, expect, vi } from 'vitest';

describe('PWA Functionality', () => {
  it('should detect PWA installation capability', () => {
    // Mock beforeinstallprompt event
    const mockEvent = new Event('beforeinstallprompt');
    Object.defineProperty(mockEvent, 'prompt', {
      value: vi.fn().mockResolvedValue(undefined)
    });

    // Test installation flow
    expect(mockEvent.type).toBe('beforeinstallprompt');
  });

  it('should handle offline state correctly', () => {
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false
    });

    expect(navigator.onLine).toBe(false);
  });

  it('should cache critical resources', async () => {
    // Test cache API
    if ('caches' in window) {
      const cache = await caches.open('test-cache');
      expect(cache).toBeDefined();
    }
  });
});
```

#### 6.2 Lighthouse PWA Audit Configuration
```javascript
// lighthouse.config.js
module.exports = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['pwa', 'performance', 'accessibility'],
    skipAudits: ['uses-http2'] // Skip if not using HTTP/2
  },
  audits: [
    'installable-manifest',
    'splash-screen',
    'themed-omnibox',
    'content-width',
    'viewport'
  ]
};
```

#### 6.3 Performance Monitoring
```typescript
// src/utils/pwaAnalytics.ts
export const trackPWAMetrics = () => {
  // Track installation
  window.addEventListener('appinstalled', () => {
    console.log('PWA: App installed');
    // Analytics tracking
  });

  // Track display mode
  const displayMode = window.matchMedia('(display-mode: standalone)').matches
    ? 'standalone'
    : 'browser';
  
  console.log(`PWA: Display mode - ${displayMode}`);

  // Track service worker performance
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'CACHE_PERFORMANCE') {
        console.log('PWA: Cache hit ratio:', event.data.hitRatio);
      }
    });
  }
};
```

---

## 📊 Métricas de Éxito PWA

### Criterios de Aceptación
- [ ] **Lighthouse PWA Score**: >90
- [ ] **Installation Prompt**: Funciona correctamente
- [ ] **Offline Functionality**: Core features disponibles
- [ ] **Cache Performance**: <3s load time en repeat visits
- [ ] **Cross-Platform**: Funciona en iOS, Android, Desktop

### KPIs Específicos
| Métrica | Objetivo | Herramienta |
|---------|----------|-------------|
| **PWA Score** | >90 | Lighthouse |
| **Install Rate** | >15% | Analytics |
| **Offline Usage** | Tracked | Service Worker |
| **Cache Hit Ratio** | >80% | Cache API |
| **Load Time (Cached)** | <2s | Performance API |

---

## 🔄 Integración con Testing

### Testing PWA Features
```typescript
// Añadir a testing-roadmap.md
describe('PWA Integration Tests', () => {
  it('should work offline with cached resources', async () => {
    // Simulate offline mode
    await page.setOfflineMode(true);
    
    // Navigate to app
    await page.goto('/boothiecal_playground/');
    
    // Check if app loads from cache
    expect(await page.title()).toBe('BoothieCall Playground');
  });

  it('should prompt for installation', async () => {
    // Trigger install prompt
    await page.evaluate(() => {
      window.dispatchEvent(new Event('beforeinstallprompt'));
    });
    
    // Check if prompt appears
    expect(await page.locator('[data-testid="install-prompt"]')).toBeVisible();
  });
});
```

---

## 🚀 Plan de Implementación

### Sprint 1: Core PWA Setup (1 día)
- [ ] **Fase 1**: Instalación y configuración base
- [ ] **Fase 2**: Iconos y assets PWA
- [ ] Configuración básica de manifest

### Sprint 2: Advanced Features (1 día)
- [ ] **Fase 3**: Service Worker y cache strategies
- [ ] **Fase 4**: Install prompt y update notifications
- [ ] Testing básico de PWA

### Sprint 3: Camera & Optimization (1 día)
- [ ] **Fase 5**: Camera PWA optimization
- [ ] **Fase 6**: Testing completo y performance tuning
- [ ] Lighthouse audit y fixes

---

## 🔮 Roadmap Futuro PWA

### Próximas Mejoras (Post-MVP)
1. **Push Notifications**
   - Notificaciones de eventos/updates
   - Marketing campaigns para photobooth bookings

2. **Background Sync**
   - Sync de photos cuando vuelve conexión
   - Queue de uploads pendientes

3. **Advanced Caching**
   - Predictive caching based on user behavior
   - Smart cache management por storage limitations

4. **Native Integrations**
   - Share API para compartir photos
   - File System Access API para saves
   - Contact Picker API para tags

5. **Analytics Avanzados**
   - PWA-specific metrics
   - Installation funnel analysis
   - Offline usage patterns

---

## 📚 Recursos y Referencias

### Documentación Oficial
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

### Testing PWA
- [PWA Test Suite](https://github.com/GoogleChrome/lighthouse/blob/master/docs/scoring.md)
- [Web Platform Tests](https://web-platform-tests.org/)

### Best Practices
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Camera in PWAs](https://web.dev/media-capabilities/)

---

## 📝 Checklist de Implementación

### Configuración Base
- [ ] Instalar vite-plugin-pwa
- [ ] Configurar manifest.json
- [ ] Setup service worker básico
- [ ] Crear iconos PWA (múltiples tamaños)

### Funcionalidad Core
- [ ] Install prompt personalizado
- [ ] Update notifications
- [ ] Offline indicator
- [ ] Cache strategies optimizadas

### Camera & UX
- [ ] Camera permission handling
- [ ] PWA-specific camera features
- [ ] Performance optimizations
- [ ] Cross-platform testing

### Testing & Deploy
- [ ] PWA testing suite
- [ ] Lighthouse audit
- [ ] Performance benchmarks
- [ ] Production deployment

---

**Estado Actual**: 📋 Pendiente de implementación  
**Próxima Acción**: Completar testing roadmap, luego iniciar Fase 1 PWA  
**Responsable**: Equipo de desarrollo  
**Prioridad**: Alta (después de testing)

---

*Este roadmap se integra perfectamente con el testing-roadmap.md existente y debe implementarse una vez que la suite de pruebas esté funcionando correctamente.*