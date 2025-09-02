import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ImageSource {
  src: string;
  format: 'webp' | 'jpg' | 'png' | 'avif';
  media?: string;
}

@Component({
  selector: 'app-optimized-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './optimized-image.component.html',
  styleUrls: ['./optimized-image.component.css']
})
export class OptimizedImageComponent implements OnInit {
  @Input() src!: string;
  @Input() alt: string = '';
  @Input() loading: 'lazy' | 'eager' = 'lazy';
  @Input() cssClass: string = '';
  @Input() customStyles: string = '';
  @Input() quality: number = 80;
  @Input() formats: string[] = ['webp', 'jpg'];
  @Input() sizes: number[] = [320, 640, 960, 1280, 1920];

  webpSources: ImageSource[] = [];
  fallbackSrc: string = '';
  isLoaded: boolean = false;
  hasError: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.generateImageSources();
    this.setupIntersectionObserver();
  }

  private generateImageSources(): void {
    const baseUrl = this.src;
    const extension = this.getFileExtension(baseUrl);

    // Gera sources para diferentes formatos e tamanhos
    this.webpSources = [];

    // WebP sources
    if (this.formats.includes('webp')) {
      this.sizes.forEach(size => {
        this.webpSources.push({
          src: this.generateOptimizedUrl(baseUrl, 'webp', size),
          format: 'webp',
          media: this.generateMediaQuery(size)
        });
      });
    }

    // Fallback para o formato original
    this.fallbackSrc = this.generateOptimizedUrl(baseUrl, extension, this.sizes[0]);
  }

  private generateOptimizedUrl(baseUrl: string, format: string, size: number): string {
    // Aqui você pode integrar com um serviço de otimização de imagem
    // como Cloudinary, ImageKit, ou implementar localmente
    const baseName = baseUrl.replace(/\.[^/.]+$/, '');

    if (format === 'webp') {
      return `${baseName}-${size}w.webp`;
    }

    return `${baseName}-${size}w.${format}`;
  }

  private getFileExtension(url: string): string {
    return url.split('.').pop()?.toLowerCase() || 'jpg';
  }

  private generateMediaQuery(size: number): string {
    if (size === this.sizes[0]) return '';
    return `(min-width: ${size}px)`;
  }

  private setupIntersectionObserver(): void {
    if ('IntersectionObserver' in window && this.loading === 'lazy') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage();
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(this.elementRef.nativeElement);
    } else {
      // Fallback para navegadores sem IntersectionObserver
      this.loadImage();
    }
  }

  private loadImage(): void {
    // A imagem já está sendo carregada pelo browser
    // Este método pode ser usado para analytics ou outras funcionalidades
  }

  onImageLoad(): void {
    this.isLoaded = true;
    this.hasError = false;

    // Track image load para analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'image_load', {
        'event_category': 'performance',
        'event_label': this.src,
        'value': 1
      });
    }
  }

  onImageError(): void {
    this.hasError = true;
    this.isLoaded = false;

    // Track image error para analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'image_error', {
        'event_category': 'performance',
        'event_label': this.src,
        'value': 1
      });
    }
  }

  // Método para pré-carregar imagem
  preload(): void {
    const img = new Image();
    img.src = this.fallbackSrc;
  }

  // Método para limpar cache (útil para desenvolvimento)
  clearCache(): void {
    this.isLoaded = false;
    this.hasError = false;
  }
}
