import { Injectable } from '@angular/core';

export interface ImageOptimizationOptions {
  quality: number;
  format: 'webp' | 'jpg' | 'png' | 'avif';
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  compression?: 'lossy' | 'lossless';
}

export interface OptimizedImage {
  src: string;
  srcset: string;
  sizes: string;
  webp: string;
  avif?: string;
  fallback: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageOptimizationService {

  private readonly DEFAULT_QUALITY = 80;
  private readonly DEFAULT_SIZES = [320, 640, 960, 1280, 1920];
  private readonly BREAKPOINTS = {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
    large: 1440,
    xlarge: 1920
  };

  constructor() {}

  /**
   * Otimiza uma imagem com múltiplos formatos e tamanhos
   */
  optimizeImage(
    originalSrc: string,
    options: Partial<ImageOptimizationOptions> = {}
  ): OptimizedImage {
    const opts = this.mergeOptions(options);

    return {
      src: this.generateOptimizedUrl(originalSrc, opts),
      srcset: this.generateSrcSet(originalSrc, opts),
      sizes: this.generateSizes(),
      webp: this.generateWebPUrl(originalSrc, opts),
      avif: this.generateAvifUrl(originalSrc, opts),
      fallback: this.generateFallbackUrl(originalSrc, opts)
    };
  }

  /**
   * Gera URL otimizada para um formato específico
   */
  generateOptimizedUrl(
    originalSrc: string,
    options: ImageOptimizationOptions
  ): string {
    const baseUrl = this.getBaseUrl(originalSrc);
    const params = this.buildOptimizationParams(options);

    // Aqui você pode integrar com serviços como:
    // - Cloudinary
    // - ImageKit
    // - Cloudflare Images
    // - AWS CloudFront + Lambda@Edge

    return `${baseUrl}?${params}`;
  }

  /**
   * Gera srcset para diferentes tamanhos
   */
  generateSrcSet(
    originalSrc: string,
    options: ImageOptimizationOptions
  ): string {
    return this.DEFAULT_SIZES
      .map(size => {
        const url = this.generateOptimizedUrl(originalSrc, { ...options, width: size });
        return `${url} ${size}w`;
      })
      .join(', ');
  }

  /**
   * Gera sizes para CSS
   */
  generateSizes(): string {
    return `
      (max-width: 320px) 320px,
      (max-width: 768px) 640px,
      (max-width: 1024px) 960px,
      (max-width: 1440px) 1280px,
      1920px
    `.replace(/\s+/g, ' ').trim();
  }

  /**
   * Gera URL WebP
   */
  generateWebPUrl(
    originalSrc: string,
    options: ImageOptimizationOptions
  ): string {
    return this.generateOptimizedUrl(originalSrc, { ...options, format: 'webp' });
  }

  /**
   * Gera URL AVIF (formato mais moderno)
   */
  generateAvifUrl(
    originalSrc: string,
    options: ImageOptimizationOptions
  ): string {
    return this.generateOptimizedUrl(originalSrc, { ...options, format: 'avif' });
  }

  /**
   * Gera URL de fallback
   */
  generateFallbackUrl(
    originalSrc: string,
    options: ImageOptimizationOptions
  ): string {
    const fallbackFormat = options.format === 'webp' ? 'jpg' : options.format;
    return this.generateOptimizedUrl(originalSrc, { ...options, format: fallbackFormat });
  }

  /**
   * Pré-carrega imagens críticas
   */
  preloadImage(src: string, options: Partial<ImageOptimizationOptions> = {}): void {
    const opts = this.mergeOptions(options);
    const optimizedUrl = this.generateOptimizedUrl(src, opts);

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizedUrl;
    document.head.appendChild(link);
  }

  /**
   * Lazy load com Intersection Observer
   */
  setupLazyLoading(
    images: HTMLImageElement[],
    options: Partial<ImageOptimizationOptions> = {}
  ): void {
    if (!('IntersectionObserver' in window)) {
      // Fallback para navegadores antigos
      this.loadAllImages(images, options);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          this.loadImage(img, options);
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    images.forEach(img => observer.observe(img));
  }

  /**
   * Carrega uma imagem específica
   */
  private loadImage(
    img: HTMLImageElement,
    options: Partial<ImageOptimizationOptions>
  ): void {
    const originalSrc = img.dataset['src'] || img['src'];
    if (!originalSrc) return;

    const optimized = this.optimizeImage(originalSrc, options);

    // Adiciona sources para diferentes formatos
    if (this.supportsWebP()) {
      img.src = optimized['webp'];
    } else {
      img.src = optimized['fallback'];
    }

    // Adiciona srcset se disponível
    if (optimized['srcset']) {
      img.srcset = optimized['srcset'];
      img.sizes = optimized['sizes'];
    }

    // Remove atributos de lazy loading
    img.classList.remove('lazy');
    img.classList.add('loaded');
  }

  /**
   * Carrega todas as imagens (fallback)
   */
  private loadAllImages(
    images: HTMLImageElement[],
    options: Partial<ImageOptimizationOptions>
  ): void {
    images.forEach(img => this.loadImage(img, options));
  }

  /**
   * Verifica suporte a WebP
   */
  private supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  /**
   * Verifica suporte a AVIF
   */
  private supportsAvif(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  }

  /**
   * Obtém URL base da imagem
   */
  private getBaseUrl(src: string): string {
    return src.split('?')[0];
  }

  /**
   * Constrói parâmetros de otimização
   */
  private buildOptimizationParams(options: ImageOptimizationOptions): string {
    const params = new URLSearchParams();

    if (options.width) params.append('w', options.width.toString());
    if (options.height) params.append('h', options.height.toString());
    if (options.quality) params.append('q', options.quality.toString());
    if (options.format) params.append('f', options.format);
    if (options.fit) params.append('fit', options.fit);
    if (options.compression) params.append('c', options.compression);

    return params.toString();
  }

  /**
   * Mescla opções padrão com opções fornecidas
   */
  private mergeOptions(options: Partial<ImageOptimizationOptions>): ImageOptimizationOptions {
    return {
      quality: this.DEFAULT_QUALITY,
      format: 'webp',
      fit: 'cover',
      compression: 'lossy',
      ...options
    };
  }

  /**
   * Comprime imagem no cliente (para desenvolvimento)
   */
  async compressImage(
    file: File,
    quality: number = 0.8
  ): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => resolve(blob!),
          'image/jpeg',
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Converte para WebP no cliente (para desenvolvimento)
   */
  async convertToWebP(
    file: File,
    quality: number = 0.8
  ): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => resolve(blob!),
          'image/webp',
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  }
}
