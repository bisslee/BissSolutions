import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageOptimizationService, ImageConfig } from '../../services/image-optimization.service';

@Component({
  selector: 'app-optimized-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="image-container" [class.loading]="isLoading" [class.error]="hasError">
      <img
        #imageRef
        [src]="placeholderSrc"
        [alt]="imageConfig.alt"
        [width]="imageConfig.width"
        [height]="imageConfig.height"
        [loading]="imageConfig.loading"
        [sizes]="imageConfig.sizes"
        [srcset]="imageConfig.srcset"
        [class.fade-in]="!isLoading && !hasError"
        (load)="onImageLoad()"
        (error)="onImageError()"
        [attr.data-src]="imageConfig.src"
      />
      
      <!-- Loading placeholder -->
      <div class="loading-placeholder" *ngIf="isLoading">
        <div class="loading-spinner"></div>
      </div>
      
      <!-- Error placeholder -->
      <div class="error-placeholder" *ngIf="hasError">
        <i class="ri-image-line"></i>
        <span>Imagem não encontrada</span>
      </div>
    </div>
  `,
  styles: [`
    .image-container {
      position: relative;
      overflow: hidden;
      background: #f3f4f6;
      border-radius: 8px;
    }
    
    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.3s ease;
      opacity: 0;
    }
    
    .image-container img.fade-in {
      opacity: 1;
    }
    
    .loading-placeholder {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f9fafb;
    }
    
    .loading-spinner {
      width: 24px;
      height: 24px;
      border: 2px solid #e5e7eb;
      border-top: 2px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    .error-placeholder {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #fef2f2;
      color: #ef4444;
      font-size: 14px;
    }
    
    .error-placeholder i {
      font-size: 2rem;
      margin-bottom: 8px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .loading-spinner {
        width: 20px;
        height: 20px;
      }
      
      .error-placeholder {
        font-size: 12px;
      }
      
      .error-placeholder i {
        font-size: 1.5rem;
      }
    }
  `]
})
export class OptimizedImageComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() type: 'hero' | 'card' | 'logo' | 'gallery' = 'card';
  @Input() width?: number;
  @Input() height?: number;
  @Input() loading: 'lazy' | 'eager' = 'lazy';
  @Input() quality: number = 85;
  @Input() fallbackSrc?: string;

  @ViewChild('imageRef') imageRef!: ElementRef<HTMLImageElement>;

  imageConfig: ImageConfig = {
    src: '',
    alt: ''
  };
  
  isLoading = true;
  hasError = false;
  placeholderSrc = '';
  
  private observer?: IntersectionObserver;

  constructor(private imageOptimizationService: ImageOptimizationService) {}

  ngOnInit(): void {
    this.initializeImage();
  }

  ngAfterViewInit(): void {
    this.setupLazyLoading();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initializeImage(): void {
    this.imageConfig = this.imageOptimizationService.getImageConfigByType(
      this.type,
      this.src,
      this.alt
    );

    // Override with custom properties if provided
    if (this.width) this.imageConfig.width = this.width;
    if (this.height) this.imageConfig.height = this.height;
    if (this.loading) this.imageConfig.loading = this.loading;

    // Generate placeholder
    this.placeholderSrc = this.imageOptimizationService.generatePlaceholder(
      this.width || 400,
      this.height || 300
    );
  }

  private setupLazyLoading(): void {
    if (this.imageConfig.loading === 'lazy' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage();
            this.observer?.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px 0px'
      });

      this.observer.observe(this.imageRef.nativeElement);
    } else {
      this.loadImage();
    }
  }

  private loadImage(): void {
    const img = this.imageRef.nativeElement;
    if (img.dataset['src']) {
      img.src = img.dataset['src'];
    }
  }

  onImageLoad(): void {
    this.isLoading = false;
    this.hasError = false;
  }

  onImageError(): void {
    this.isLoading = false;
    this.hasError = true;
    
    // Try fallback if provided
    if (this.fallbackSrc) {
      const img = this.imageRef.nativeElement;
      img.src = this.fallbackSrc;
      this.hasError = false;
      this.isLoading = true;
    }
  }
}
