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
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
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
