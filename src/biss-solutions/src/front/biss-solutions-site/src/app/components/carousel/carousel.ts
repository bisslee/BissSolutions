import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImageOptimizationService } from '../../services/image-optimization.service';

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  overlayColor: string;
}

@Component({
  selector: 'app-carousel',
  imports: [RouterModule, CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css'
})
export class Carousel implements OnInit, OnDestroy {
  currentSlide = 0;
  private autoSlideInterval: any;

  constructor(private imageOptimizationService: ImageOptimizationService) {}

  slides: CarouselSlide[] = [
    {
      id: 0,
      image: '/images/services/landing-pages.jpg',
      title: '🎄 Pacote Promocional de Final de Ano - R$ 200,00',
      subtitle: '🎁 Landing Page Profissional + Hospedagem 1 ano + 5 e-mails personalizados. Tudo que você precisa para começar a vender online!',
      buttonText: 'Aproveite Agora',
      buttonLink: '/services/pacote-completo',
      overlayColor: 'rgba(220, 38, 127, 0.5)'
    },
    {
      id: 1,
      image: '/images/services/development.jpg',
      title: 'Desenvolvimento de Software Personalizado',
      subtitle: 'Soluções em Angular, .NET, Python e tecnologias modernas com mais de 20 anos de experiência',
      buttonText: 'Conheça Nossos Serviços',
      buttonLink: '/services',
      overlayColor: 'rgba(37, 99, 235, 0.4)'
    },
    {
      id: 2,
      image: '/images/services/consulting.jpg',
      title: 'Mais de 20 Anos de Experiência em TI',
      subtitle: 'Consultoria especializada para transformação digital e otimização de processos',
      buttonText: 'Conheça Nossa empresa',
      buttonLink: '/company',
      overlayColor: 'rgba(16, 185, 129, 0.4)'
    },
    {
      id: 3,
      image: '/images/services/analytics.jpg',
      title: 'Cases de Sucesso Comprovados',
      subtitle: 'Projetos realizados para empresas de diversos setores com resultados excepcionais',
      buttonText: 'Ver Nossos clientes',
      buttonLink: '/clients',
      overlayColor: 'rgba(245, 158, 11, 0.4)'
    },
    {
      id: 4,
      image: '/images/services/cloud.jpg',
      title: 'Produtos Gratuitos e Open Source',
      subtitle: 'Bibliotecas e templates gratuitos para a comunidade de desenvolvedores',
      buttonText: 'Conheça Nossos produtos',
      buttonLink: '/products',
      overlayColor: 'rgba(139, 92, 246, 0.4)'
    }
  ];

  ngOnInit() {
    this.startAutoSlide();
    this.preloadCarouselImages();
  }

  /**
   * Preload das imagens do carrossel para melhor performance
   */
  private preloadCarouselImages(): void {
    this.slides.forEach((slide, index) => {
      // Preload apenas a primeira imagem (atual) e a próxima
      if (index === this.currentSlide || index === (this.currentSlide + 1) % this.slides.length) {
        const img = new Image();
        img.src = slide.image;
      }
    });
  }

  /**
   * Otimiza URL da imagem para WebP se suportado
   */
  getOptimizedImageUrl(imageUrl: string): string {
    // Por enquanto, retorna sempre a imagem original para garantir que funcione
    return imageUrl;
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  previousSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  private startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // 5 segundos
  }

  private stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
}
