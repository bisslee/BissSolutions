import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InternalPageComponent, InternalPageData } from '../../components/internal-page/internal-page.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { ServiceCardComponent, ServiceCard } from '../../components/service-card/service-card.component';



@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, InternalPageComponent, ContactFormComponent, ServiceCardComponent],
  template: `
    <app-internal-page [pageData]="pageData">
      <!-- Services Grid -->
      <section class="services-section">
        <div class="container">
          <div class="services-grid">
            <app-service-card
              *ngFor="let service of services"
              [service]="service"
            ></app-service-card>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>Precisa de uma solução personalizada?</h2>
            <p>
              Nossa equipe está pronta para entender suas necessidades e criar
              soluções sob medida para o seu negócio.
            </p>
            <div class="cta-buttons">
              <button (click)="openContactModal()" class="btn btn-primary">Fale Conosco</button>
              <a routerLink="/empresa" class="btn btn-secondary">Conheça Nossa Empresa</a>
            </div>
          </div>
        </div>
      </section>
    </app-internal-page>

    <!-- Modal de Contato -->
    <div class="contact-modal" [class.active]="isContactModalOpen">
      <div class="modal-overlay" (click)="closeContactModal()"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>Entre em Contato</h3>
          <button class="modal-close" (click)="closeContactModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <app-contact-form></app-contact-form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .services-section {
      padding: 5rem 0;
      background: #f8fafc;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }



    .cta-section {
      background: linear-gradient(135deg, #1f2937, #374151);
      color: white;
      padding: 5rem 0;
      text-align: center;
    }

    .cta-content h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 1rem 0;
    }

    .cta-content p {
      font-size: 1.125rem;
      max-width: 600px;
      margin: 0 auto 2rem;
      line-height: 1.6;
      opacity: 0.9;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-block;
      padding: 1rem 2rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border-color: white;
    }

    .btn-secondary:hover {
      background: white;
      color: #1f2937;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.25rem;
      }

      .services-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .service-card {
        padding: 2rem;
      }

      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }

      .btn {
        width: 100%;
        max-width: 300px;
      }
    }

    @media (max-width: 480px) {
      .hero {
        padding: 4rem 0;
      }

      .hero-content h1 {
        font-size: 2rem;
      }

      .service-card {
        padding: 1.5rem;
      }
    }

    /* Modal de Contato */
    .contact-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .contact-modal.active {
      opacity: 1;
      visibility: visible;
    }

    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
    }

    .modal-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.9);
      background: white;
      border-radius: 16px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease;
    }

    .contact-modal.active .modal-content {
      transform: translate(-50%, -50%) scale(1);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      border-bottom: 1px solid #e2e8f0;
    }

    .modal-header h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #64748b;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: all 0.2s ease;
    }

    .modal-close:hover {
      background: #f1f5f9;
      color: #1e293b;
    }

    .modal-body {
      padding: 2rem;
    }

    @media (max-width: 768px) {
      .modal-content {
        width: 95%;
        margin: 1rem;
      }

      .modal-header {
        padding: 1rem 1.5rem;
      }

      .modal-body {
        padding: 1.5rem;
      }
    }
  `]
})
export class ServicesComponent {
  isContactModalOpen = false;



  pageData: InternalPageData = {
    title: 'Nossos Serviços',
    subtitle: 'Soluções tecnológicas personalizadas para impulsionar o crescimento do seu negócio',
    backgroundImage: '/images/services/workgroup.jpg',
    breadcrumbItems: [
      { label: 'Home', route: '/home' },
      { label: 'Serviços', route: '/servicos', active: true }
    ]
  };

  services: ServiceCard[] = [
    {
      id: 1,
      icon: 'fas fa-code',
      title: 'Desenvolvimento de Software',
      description: 'Soluções personalizadas com mais de 20 anos de experiência em .NET, Python, Java e tecnologias web/mobile.',
      features: [
        'APIs REST e Microserviços',
        'Sistemas Web e Mobile',
        'Migração de Sistemas Legados',
        'Arquitetura CQRS e DDD'
      ],
      buttonText: 'Saiba Mais',
      buttonLink: '/servicos/desenvolvimento-software',
      color: '#667eea'
    },
    {
      id: 2,
      icon: 'fas fa-users',
      title: 'Consultoria em TI',
      description: 'Nossa equipe de especialistas analisa sua infraestrutura e propõe melhorias para otimizar processos e reduzir custos.',
      features: [
        'Auditoria de Sistemas',
        'Planejamento Estratégico',
        'Otimização de Processos',
        'Migração de Tecnologias'
      ],
      buttonText: 'Saiba Mais',
      buttonLink: '/servicos/consultoria',
      color: '#10b981'
    },
    {
      id: 3,
      icon: 'fas fa-cloud',
      title: 'Soluções em Cloud',
      description: 'Implementamos e gerenciamos soluções cloud para aumentar a flexibilidade e escalabilidade da sua empresa.',
      features: [
        'Migração para Cloud',
        'Infraestrutura como Serviço',
        'Backup e Recuperação',
        'Monitoramento e Segurança'
      ],
      buttonText: 'Saiba Mais',
      buttonLink: '/servicos/cloud',
      color: '#f59e0b'
    },
    {
      id: 4,
      icon: 'fas fa-shield-alt',
      title: 'Segurança da Informação',
      description: 'Protegemos seus dados e sistemas com soluções avançadas de segurança e compliance.',
      features: [
        'Auditoria de Segurança',
        'Implementação de Firewalls',
        'Criptografia de Dados',
        'Treinamento da Equipe'
      ],
      buttonText: 'Saiba Mais',
      buttonLink: '/servicos/seguranca',
      color: '#ef4444'
    },
    {
      id: 5,
      icon: 'fas fa-headset',
      title: 'Suporte Técnico',
      description: 'Oferecemos suporte 24/7 para garantir que seus sistemas funcionem sempre de forma eficiente.',
      features: [
        'Suporte 24/7',
        'Monitoramento Proativo',
        'Resolução Rápida',
        'Relatórios de Performance'
      ],
      buttonText: 'Saiba Mais',
      buttonLink: '/servicos/suporte',
      color: '#8b5cf6'
    },
    {
      id: 6,
      icon: 'fas fa-chart-line',
      title: 'Analytics e BI',
      description: 'Transformamos seus dados em insights valiosos para tomada de decisões estratégicas.',
      features: [
        'Dashboards Interativos',
        'Relatórios Automatizados',
        'Análise Preditiva',
        'Integração de Dados'
      ],
      buttonText: 'Saiba Mais',
      buttonLink: '/servicos/analytics',
      color: '#06b6d4'
    }
  ];





  openContactModal(): void {
    this.isContactModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeContactModal(): void {
    this.isContactModalOpen = false;
    document.body.style.overflow = 'auto';
  }
}
