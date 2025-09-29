export const IMAGE_CONFIG = {
  // Configurações para diferentes tipos de imagem
  types: {
    hero: {
      quality: 90,
      loading: 'eager' as const,
      sizes: '100vw',
      format: 'webp'
    },
    card: {
      quality: 85,
      loading: 'lazy' as const,
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      format: 'webp'
    },
    logo: {
      quality: 95,
      loading: 'eager' as const,
      sizes: '(max-width: 768px) 50px, 60px',
      format: 'png'
    },
    gallery: {
      quality: 80,
      loading: 'lazy' as const,
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw',
      format: 'webp'
    }
  },

  // Breakpoints para imagens responsivas
  breakpoints: {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
    large: 1920
  },

  // Imagens críticas que devem ser preloadadas
  criticalImages: [
    '/images/logo-tech-azul.png',
    '/images/services/development.jpg',
    '/images/services/consulting.jpg'
  ],

  // Fallbacks para imagens que falharam ao carregar
  fallbacks: {
    logo: '/images/placeholders/logo-placeholder.png',
    project: '/images/placeholders/project-placeholder.png',
    service: '/images/placeholders/service-placeholder.png',
    client: '/images/placeholders/client-placeholder.png'
  },

  // Configurações de lazy loading
  lazyLoading: {
    rootMargin: '50px 0px',
    threshold: 0.1
  },

  // Configurações de performance
  performance: {
    enableWebP: true,
    enableAvif: false, // AVIF tem suporte limitado ainda
    enableLazyLoading: true,
    enablePreloading: true,
    enableCompression: true
  }
};

export interface ImageOptimizationOptions {
  type: 'hero' | 'card' | 'logo' | 'gallery';
  width?: number;
  height?: number;
  quality?: number;
  loading?: 'lazy' | 'eager';
  format?: 'webp' | 'png' | 'jpg' | 'avif';
  sizes?: string;
  fallback?: string;
}
