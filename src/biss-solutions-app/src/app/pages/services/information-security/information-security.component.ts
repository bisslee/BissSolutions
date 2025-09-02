import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InternalPageComponent, InternalPageData } from '../../../components/internal-page/internal-page.component';
import { ContactFormComponent } from '../../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-information-security',
  standalone: true,
  imports: [CommonModule, RouterModule, InternalPageComponent, ContactFormComponent],
  template: `
    <app-internal-page [pageData]="pageData">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <h1>Segurança da Informação</h1>
            <p class="hero-subtitle">
              Proteção avançada para seus dados e sistemas com soluções de segurança de última geração
            </p>
            <div class="hero-buttons">
              <button (click)="openContactModal()" class="btn btn-primary">Auditar Segurança</button>
              <button (click)="scrollToServices()" class="btn btn-secondary">Ver Soluções</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Serviços Section -->
      <section id="servicos" class="services-section">
        <div class="container">
          <div class="section-header">
            <h2>Nossas Soluções de Segurança</h2>
            <p>Proteção completa para sua infraestrutura digital</p>
          </div>

          <div class="services-grid">
            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-search"></i>
              </div>
              <h3>Auditoria de Segurança</h3>
              <p>Avaliação completa de vulnerabilidades e análise de riscos em sua infraestrutura</p>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-fire"></i>
              </div>
              <h3>Implementação de Firewalls</h3>
              <p>Configuração e gerenciamento de firewalls de próxima geração para proteção avançada</p>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-lock"></i>
              </div>
              <h3>Criptografia de Dados</h3>
              <p>Implementação de criptografia em repouso e em trânsito para máxima proteção</p>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-users"></i>
              </div>
              <h3>Treinamento da Equipe</h3>
              <p>Capacitação em segurança da informação e conscientização sobre ameaças cibernéticas</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>Pronto para proteger seus dados?</h2>
            <p>
              Nossa equipe de especialistas em segurança está pronta para implementar
              soluções robustas que protegem seu negócio contra ameaças cibernéticas.
            </p>
            <div class="cta-buttons">
              <button (click)="openContactModal()" class="btn btn-primary">Iniciar Auditoria</button>
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
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
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
      color: #ef4444;
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
      background: #ef4444;
      color: white;
    }

    .btn-primary:hover {
      background: #dc2626;
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
export class InformationSecurityComponent {
  isContactModalOpen = false;

  pageData: InternalPageData = {
    title: 'Segurança da Informação',
    subtitle: 'Proteção avançada para seus dados e sistemas com soluções de segurança de última geração',
    backgroundImage: '/images/services/security.jpg',
    breadcrumbItems: [
      { label: 'Home', route: '/home' },
      { label: 'Serviços', route: '/servicos' },
      { label: 'Segurança da Informação', route: '/servicos/seguranca', active: true }
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
