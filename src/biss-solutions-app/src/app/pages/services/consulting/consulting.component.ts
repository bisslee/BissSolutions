import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InternalPageComponent, InternalPageData } from '../../../components/internal-page/internal-page.component';
import { ContactFormComponent } from '../../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-consulting',
  standalone: true,
  imports: [CommonModule, RouterModule, InternalPageComponent, ContactFormComponent],
  template: `
    <app-internal-page [pageData]="pageData">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <h1>Consultoria em TI</h1>
            <p class="hero-subtitle">
              Análise estratégica e otimização de processos para maximizar a eficiência da sua empresa
            </p>
            <div class="hero-buttons">
              <button (click)="openContactModal()" class="btn btn-primary">Solicitar Consultoria</button>
              <button (click)="scrollToServices()" class="btn btn-secondary">Ver Serviços</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Serviços Section -->
      <section id="servicos" class="services-section">
        <div class="container">
          <div class="section-header">
            <h2>Nossos Serviços de Consultoria</h2>
            <p>Soluções estratégicas para transformar sua infraestrutura de TI</p>
          </div>

          <div class="services-grid">
            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-search"></i>
              </div>
              <h3>Auditoria de Sistemas</h3>
              <p>Avaliação completa da infraestrutura atual, identificando pontos de melhoria e oportunidades de otimização</p>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-route"></i>
              </div>
              <h3>Planejamento Estratégico</h3>
              <p>Desenvolvimento de roadmap tecnológico alinhado com os objetivos de negócio da sua empresa</p>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-cogs"></i>
              </div>
              <h3>Otimização de Processos</h3>
              <p>Reengenharia de fluxos de trabalho para aumentar produtividade e reduzir custos operacionais</p>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-exchange-alt"></i>
              </div>
              <h3>Migração de Tecnologias</h3>
              <p>Planejamento e execução de migrações para tecnologias mais modernas e eficientes</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>Pronto para otimizar sua infraestrutura de TI?</h2>
            <p>
              Nossa equipe de especialistas está pronta para analisar seus sistemas
              e propor melhorias que realmente fazem a diferença.
            </p>
            <div class="cta-buttons">
              <button (click)="openContactModal()" class="btn btn-primary">Iniciar Consultoria</button>
              <button (click)="openContactModal()" class="btn btn-secondary">Falar com Especialista</button>
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

    /* Hero Section */
    .hero-section {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 6rem 0;
      text-align: center;
    }

    .hero-content h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* Services Section */
    .services-section {
      padding: 5rem 0;
      background: #f8fafc;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .section-header p {
      font-size: 1.125rem;
      color: #6b7280;
      max-width: 600px;
      margin: 0 auto;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .service-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }

    .service-card:hover {
      transform: translateY(-4px);
    }

    .service-icon {
      font-size: 3rem;
      color: #10b981;
      margin-bottom: 1rem;
    }

    .service-card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .service-card p {
      color: #6b7280;
      line-height: 1.6;
    }

    /* CTA Section */
    .cta-section {
      padding: 5rem 0;
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
      color: white;
      text-align: center;
    }

    .cta-content h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .cta-content p {
      font-size: 1.125rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* Buttons */
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      display: inline-block;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }

    .btn-primary {
      background: #10b981;
      color: white;
    }

    .btn-primary:hover {
      background: #059669;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border: 2px solid white;
    }

    .btn-secondary:hover {
      background: white;
      color: #1f2937;
      transform: translateY(-2px);
    }

    /* Contact Modal */
    .contact-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      display: none;
    }

    .contact-modal.active {
      display: block;
    }

    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h3 {
      margin: 0;
      color: #1f2937;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #6b7280;
    }

    .modal-body {
      padding: 1.5rem;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.125rem;
      }

      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }

      .services-grid {
        grid-template-columns: 1fr;
      }

      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }
    }

    @media (max-width: 480px) {
      .hero-content h1 {
        font-size: 2rem;
      }

      .section-header h2 {
        font-size: 2rem;
      }

      .cta-content h2 {
        font-size: 2rem;
      }
    }
  `]
})
export class ConsultingComponent {
  isContactModalOpen = false;

  pageData: InternalPageData = {
    title: 'Consultoria em TI',
    subtitle: 'Análise estratégica e otimização de processos para maximizar a eficiência da sua empresa',
    backgroundImage: '/images/services/consulting.jpg',
    breadcrumbItems: [
      { label: 'Home', route: '/home' },
      { label: 'Serviços', route: '/servicos' },
      { label: 'Consultoria em TI', route: '/servicos/consultoria', active: true }
    ]
  };

  openContactModal(): void {
    this.isContactModalOpen = true;
  }

  closeContactModal(): void {
    this.isContactModalOpen = false;
  }

  scrollToServices(): void {
    const servicesSection = document.getElementById('servicos');
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
