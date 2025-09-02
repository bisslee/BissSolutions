import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  overlayColor?: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <div class="carousel-container">
        <div
          *ngFor="let slide of slides; let i = index"
          class="carousel-slide"
          [class.active]="currentSlide === i"
          [style.background-image]="'url(' + slide.image + ')'"
        >
          <div class="slide-bg"></div>
          <div
            class="slide-overlay"
            [style.background]="slide.overlayColor || 'linear-gradient(135deg, rgba(30, 64, 175, 0.8), rgba(37, 99, 235, 0.6))'"
          ></div>
          <div class="slide-content">
            <h1>{{ slide.title }}</h1>
            <p class="subtitle">{{ slide.subtitle }}</p>
            <p class="description">{{ slide.description }}</p>
            <a [href]="slide.buttonLink" class="btn btn-primary">
              {{ slide.buttonText }}
            </a>
          </div>
        </div>

        <div class="carousel-controls">
          <button
            class="carousel-btn prev"
            (click)="prevSlide()"
            aria-label="Slide anterior"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <button
            class="carousel-btn next"
            (click)="nextSlide()"
            aria-label="Próximo slide"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>

        <div class="carousel-indicators">
          <button
            *ngFor="let slide of slides; let i = index"
            class="indicator"
            [class.active]="currentSlide === i"
            (click)="goToSlide(i)"
            [attr.aria-label]="'Ir para slide ' + (i + 1)"
          ></button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      height: 70vh;
      min-height: 500px;
      position: relative;
      overflow: hidden;
      background: #f8fafc; /* Fallback background */
    }

    .carousel-container {
      height: 100%;
      position: relative;
    }

    .carousel-slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0;
      transition: opacity 0.8s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
    }

    .carousel-slide.active {
      opacity: 1;
      z-index: 2;
    }

    .slide-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
    }

    .slide-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .slide-content {
      text-align: center;
      color: white;
      z-index: 2;
      position: relative;
      max-width: 800px;
      padding: 2rem;
      animation: fadeInUp 1s ease-out;
    }

    .slide-content h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .slide-content .subtitle {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    .slide-content .description {
      font-size: 1.125rem;
      margin-bottom: 2rem;
      line-height: 1.6;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    .carousel-controls {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
      z-index: 3;
    }

    .carousel-btn {
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.3);
      color: white;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .carousel-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.5);
      transform: scale(1.1);
    }

    .carousel-btn i {
      font-size: 1.25rem;
    }

    .carousel-indicators {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 0.75rem;
      z-index: 3;
    }

    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .indicator.active {
      background: white;
      transform: scale(1.2);
    }

    .indicator:hover {
      background: rgba(255, 255, 255, 0.8);
    }

    .btn {
      display: inline-block;
      padding: 1rem 2rem;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1.125rem;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
    }

    .btn-primary {
      background: #2563eb;
      color: white;
    }

    .btn-primary:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .hero {
        height: 60vh;
        min-height: 400px;
      }

      .slide-content h1 {
        font-size: 2.5rem;
      }

      .slide-content .subtitle {
        font-size: 1.25rem;
      }

      .slide-content .description {
        font-size: 1rem;
      }

      .carousel-controls {
        padding: 0 1rem;
      }

      .carousel-btn {
        width: 45px;
        height: 45px;
      }

      .carousel-indicators {
        bottom: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .slide-content h1 {
        font-size: 2rem;
      }

      .slide-content .subtitle {
        font-size: 1.125rem;
      }

      .slide-content .description {
        font-size: 0.875rem;
      }

      .carousel-btn {
        width: 40px;
        height: 40px;
      }

      .carousel-btn i {
        font-size: 1rem;
      }
    }
  `]
})
export class CarouselComponent implements OnInit, OnDestroy {
  private _slides: CarouselSlide[] = [
    {
      id: 1,
      image: '/images/slides/solucoes.jpg', // Exemplo - será sobrescrito pela API
      title: 'Soluções Tecnológicas Inovadoras',
      subtitle: 'Transformando o futuro digital',
      description: 'Oferecemos soluções personalizadas para impulsionar o crescimento do seu negócio com tecnologia de ponta.',
      buttonText: 'Saiba Mais',
      buttonLink: '/servicos',
      overlayColor: 'linear-gradient(135deg, rgba(30, 64, 175, 0.8), rgba(5, 150, 105, 0.6))'
    },
    {
      id: 2,
      image: '/images/slides/software.jpg', // Exemplo - será sobrescrito pela API
      title: 'Consultoria Especializada',
      subtitle: 'Expertise em Tecnologia',
      description: 'Nossa equipe de especialistas está pronta para guiar sua empresa rumo ao sucesso digital.',
      buttonText: 'Conheça Nossa Equipe',
      buttonLink: '/empresa',
      overlayColor: 'linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(37, 99, 235, 0.6))'
    },
    {
      id: 3,
      image: '/images/slides/consultoria.jpg', // Exemplo - será sobrescrito pela API
      title: 'Resultados Comprovados',
      subtitle: 'Cases de Sucesso',
      description: 'Veja como ajudamos outras empresas a alcançarem seus objetivos com nossas soluções.',
      buttonText: 'Ver Cases',
      buttonLink: '/clientes',
      overlayColor: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8), rgba(37, 99, 235, 0.6))'
    }

  ];

  @Input()
  set slides(value: CarouselSlide[]) {
    if (value && value.length > 0) {
      this._slides = value;
    }
  }

  get slides(): CarouselSlide[] {
    return this._slides;
  }

  @Input() autoPlay: boolean = true;
  @Input() autoPlayInterval: number = 5000;

  currentSlide: number = 0;
  private autoPlayTimer?: any;

  ngOnInit(): void {
    // Verificar se as imagens existem
    this.slides.forEach((slide, index) => {
      this.checkImageExists(slide.image, index);
    });

    // Garantir que sempre tenha um slide ativo
    if (this.slides.length > 0) {
      this.currentSlide = 0;
    }

    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  private checkImageExists(imagePath: string, slideIndex: number): void {
    const img = new Image();
    img.onload = () => {
      // Imagem carregada com sucesso
    };
    img.onerror = () => {
      console.error(`❌ Slide ${slideIndex} image failed to load:`, imagePath);
    };
    img.src = imagePath;
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  nextSlide(): void {
    if (this.slides.length > 0) {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }
  }

  prevSlide(): void {
    if (this.slides.length > 0) {
      this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    }
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.currentSlide = index;
    }
  }

  startAutoPlay(): void {
    this.stopAutoPlay(); // Parar timer anterior se existir
    this.autoPlayTimer = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval);
  }

  stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }

  onMouseEnter(): void {
    if (this.autoPlay) {
      this.stopAutoPlay();
    }
  }

  onMouseLeave(): void {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }
}
