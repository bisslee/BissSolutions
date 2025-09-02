import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CarouselComponent,
  SectionBlockComponent,
  PartnersComponent,
  SectionBlock
} from '../../components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    SectionBlockComponent,
    PartnersComponent
  ],
  template: `
    <!-- Hero Section com Carrossel -->
    <app-carousel
      [slides]="carouselSlides"
      [autoPlayInterval]="7000">
    </app-carousel>

    <!-- Seção de Serviços -->
    <section class="services-section">
      <div class="container">
        <div class="section-header">
          <h2>Nossos Serviços</h2>
          <p>Soluções tecnológicas personalizadas para impulsionar seu negócio</p>
        </div>

        <div class="services-grid">
          <app-section-block
            *ngFor="let service of services"
            [block]="service"
          ></app-section-block>
        </div>
      </div>
    </section>

    <!-- Seção de Parceiros -->
    <app-partners
      title="Nossos Parceiros"
      description="Empresas que confiam em nossas soluções"
    ></app-partners>
  `,
  styles: [`
    .services-section {
      padding: 5rem 0;
      background: white;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 1rem 0;
    }

    .section-header p {
      font-size: 1.125rem;
      color: #6b7280;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    @media (max-width: 768px) {
      .services-section {
        padding: 3rem 0;
      }

      .section-header h2 {
        font-size: 2rem;
      }

      .section-header p {
        font-size: 1rem;
      }

      .services-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
  `]
})
export class HomeComponent {
  carouselSlides = [
    {
      id: 1,
      image: '/images/slides/solucoes.jpg',
      title: 'Soluções Tecnológicas Inovadoras',
      subtitle: 'Transformando o futuro digital',
      description: 'Oferecemos soluções personalizadas para impulsionar o crescimento do seu negócio com tecnologia de ponta.',
      buttonText: 'Saiba Mais',
      buttonLink: '/servicos',
      overlayColor: 'linear-gradient(135deg, rgba(30, 64, 175, 0.8), rgba(5, 150, 105, 0.6))'
    },
    {
      id: 2,
      image: '/images/slides/software.jpg',
      title: 'Consultoria Especializada',
      subtitle: 'Expertise em Tecnologia',
      description: 'Nossa equipe de especialistas está pronta para guiar sua empresa rumo ao sucesso digital.',
      buttonText: 'Conheça Nossa Equipe',
      buttonLink: '/empresa',
      overlayColor: 'linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(37, 99, 235, 0.6))'
    },
    {
      id: 3,
      image: '/images/slides/consultoria.jpg',
      title: 'Resultados Comprovados',
      subtitle: 'Cases de Sucesso',
      description: 'Veja como ajudamos outras empresas a alcançarem seus objetivos com nossas soluções.',
      buttonText: 'Ver Cases',
      buttonLink: '/clients',
      overlayColor: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8),rgba(30, 64, 175, 0.8))'
    }
  ];

  services: SectionBlock[] = [
    {
      id: 1,
      image: '/images/services/development.jpg',
      title: 'Desenvolvimento de Software',
      text: 'Criamos aplicações personalizadas, sistemas web e mobile que atendem às necessidades específicas do seu negócio.',
      buttonText: 'Saiba Mais',
      buttonLink: '/servicos/desenvolvimento-software'
    },
    {
      id: 2,
      image: '/images/services/consulting.jpg',
      title: 'Consultoria em TI',
      text: 'Nossa equipe de especialistas analisa sua infraestrutura e propõe melhorias para otimizar processos e reduzir custos.',
      buttonText: 'Saiba Mais',
      buttonLink: '/servicos/consultoria'
    },
    {
      id: 3,
      image: '/images/services/cloud.jpg',
      title: 'Soluções em Cloud',
      text: 'Implementamos e gerenciamos soluções cloud para aumentar a flexibilidade e escalabilidade da sua empresa.',
      buttonText: 'Saiba Mais',
      buttonLink: '/servicos/cloud'
    },
    {
      id: 4,
      image: '/images/services/security.jpg',
      title: 'Segurança da Informação',
      text: 'Protegemos seus dados e sistemas com soluções avançadas de segurança e compliance.',
      buttonText: 'Saiba Mais',
      buttonLink: '/servicos/seguranca'
    },
    {
      id: 5,
      image: '/images/services/support.jpg',
      title: 'Suporte Técnico',
      text: 'Oferecemos suporte 24/7 para garantir que seus sistemas funcionem sempre de forma eficiente.',
      buttonText: 'Saiba Mais',
      buttonLink: '/servicos/suporte'
    },
    {
      id: 6,
      image: '/images/services/analytics.jpg',
      title: 'Analytics e BI',
      text: 'Transformamos seus dados em insights valiosos para tomada de decisões estratégicas.',
      buttonText: 'Saiba Mais',
      buttonLink: '/servicos/analytics'
    }
  ];
}
