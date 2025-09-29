import { Injectable } from '@angular/core';

export interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcset?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageOptimizationService {

  constructor() { }

  /**
   * Gera configuração otimizada para imagens
   */
  getOptimizedImageConfig(
    src: string, 
    alt: string, 
    options: {
      width?: number;
      height?: number;
      loading?: 'lazy' | 'eager';
      sizes?: string;
      quality?: number;
    } = {}
  ): ImageConfig {
    const {
      width,
      height,
      loading = 'lazy',
      sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      quality = 85
    } = options;

    // Gera srcset para diferentes tamanhos
    const srcset = this.generateSrcSet(src, quality);
    
    // Converte para WebP se suportado
    const webpSrc = this.convertToWebP(src);
    const webpSrcset = webpSrc ? this.generateSrcSet(webpSrc, quality) : null;

    return {
      src: webpSrc || src,
      alt: this.optimizeAltText(alt),
      width,
      height,
      loading,
      sizes,
      srcset: webpSrcset || srcset
    };
  }

  /**
   * Gera srcset para diferentes resoluções
   */
  private generateSrcSet(baseSrc: string, quality: number = 85): string {
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    const srcsetParts: string[] = [];

    sizes.forEach(size => {
      // Para imagens que não são logos (que devem manter proporção)
      if (!this.isLogoImage(baseSrc)) {
        srcsetParts.push(`${this.getOptimizedImageUrl(baseSrc, size, quality)} ${size}w`);
      }
    });

    return srcsetParts.join(', ');
  }

  /**
   * Converte URL da imagem para WebP
   */
  convertToWebP(src: string): string | null {
    // Verifica se o navegador suporta WebP
    if (!this.supportsWebP()) {
      return src; // Retorna a imagem original se não suporta WebP
    }

    // Se já é WebP, retorna como está
    if (src.toLowerCase().includes('.webp')) {
      return src;
    }

    // Converte para WebP
    const extension = this.getFileExtension(src);
    return src.replace(`.${extension}`, '.webp');
  }

  /**
   * Verifica se o navegador suporta WebP
   */
  private supportsWebP(): boolean {
    // Para o carrossel, vamos usar sempre a imagem original por enquanto
    // para garantir que funcione em todos os navegadores
    return false;
  }

  /**
   * Gera URL otimizada da imagem
   */
  private getOptimizedImageUrl(src: string, width: number, quality: number = 85): string {
    // Para imagens estáticas, retorna como está
    // Em produção, você poderia usar um serviço como Cloudinary, ImageKit, etc.
    return src;
  }

  /**
   * Verifica se é uma imagem de logo
   */
  private isLogoImage(src: string): boolean {
    const logoKeywords = ['logo', 'icon', 'favicon'];
    return logoKeywords.some(keyword => src.toLowerCase().includes(keyword));
  }

  /**
   * Otimiza texto alternativo para SEO
   */
  private optimizeAltText(alt: string): string {
    // Remove caracteres especiais e normaliza
    return alt
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Gera configuração para imagem de fundo otimizada
   */
  getOptimizedBackgroundImage(src: string, quality: number = 85): string {
    const webpSrc = this.convertToWebP(src);
    return `url('${webpSrc || src}')`;
  }

  /**
   * Preload de imagens críticas
   */
  preloadCriticalImages(imageUrls: string[]): void {
    imageUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }

  /**
   * Lazy loading com Intersection Observer
   */
  setupLazyLoading(): void {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset['src']) {
              img.src = img.dataset['src'];
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      });

      // Observa todas as imagens com data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Gera configuração para diferentes tipos de imagem
   */
  getImageConfigByType(type: 'hero' | 'card' | 'logo' | 'gallery', src: string, alt: string): ImageConfig {
    const configs = {
      hero: {
        loading: 'eager' as const,
        sizes: '100vw',
        quality: 90
      },
      card: {
        loading: 'lazy' as const,
        sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
        quality: 85
      },
      logo: {
        loading: 'eager' as const,
        sizes: '(max-width: 768px) 50px, 60px',
        quality: 95
      },
      gallery: {
        loading: 'lazy' as const,
        sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw',
        quality: 80
      }
    };

    return this.getOptimizedImageConfig(src, alt, configs[type]);
  }

  /**
   * Adiciona fallback para imagens que falharam ao carregar
   */
  addImageFallback(img: HTMLImageElement, fallbackSrc: string): void {
    img.onerror = () => {
      img.src = fallbackSrc;
      img.onerror = null; // Remove o handler para evitar loop infinito
    };
  }

  /**
   * Gera placeholder base64 para lazy loading
   */
  generatePlaceholder(width: number, height: number, color: string = '#f3f4f6'): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
    }
    
    return canvas.toDataURL();
  }

  /**
   * Otimiza imagens do carousel
   */
  getCarouselImageConfig(src: string, alt: string, isActive: boolean = false): ImageConfig {
    return this.getOptimizedImageConfig(src, alt, {
      loading: isActive ? 'eager' : 'lazy',
      sizes: '100vw',
      quality: 90
    });
  }

  /**
   * Otimiza imagens de produtos
   */
  getProductImageConfig(src: string, alt: string): ImageConfig {
    return this.getOptimizedImageConfig(src, alt, {
      loading: 'lazy',
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      quality: 85
    });
  }

  /**
   * Otimiza imagens de clientes
   */
  getClientImageConfig(src: string, alt: string, type: 'logo' | 'project' = 'logo'): ImageConfig {
    const config = type === 'logo' 
      ? this.getImageConfigByType('logo', src, alt)
      : this.getImageConfigByType('card', src, alt);
    
    return config;
  }

  /**
   * Verifica se a imagem está no viewport
   */
  isImageInViewport(img: HTMLImageElement): boolean {
    const rect = img.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Obtém extensão do arquivo
   */
  private getFileExtension(filename: string): string {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  }
}
