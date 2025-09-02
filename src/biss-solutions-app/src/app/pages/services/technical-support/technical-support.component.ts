import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InternalPageComponent, InternalPageData } from '../../../components/internal-page/internal-page.component';
import { ContactFormComponent } from '../../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-technical-support',
  standalone: true,
  imports: [CommonModule, RouterModule, InternalPageComponent, ContactFormComponent],
  template: `
    <app-internal-page [pageData]="pageData">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <h1>Suporte Técnico</h1>
            <p class="hero-subtitle">
              Suporte especializado 24/7 para manter seus sistemas funcionando perfeitamente
            </p>
            <div class="hero-buttons">
              <button (click)="openContactModal()" class="btn btn-primary">Solicitar Suporte</button>
              <button (click)="scrollToServices()" class="btn btn-secondary">Ver Serviços</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Serviços Section -->
      <section id="servicos" class="services-section">
        <div class="container">
          <div class="section-header">
            <h2>Nossos Serviços de Suporte</h2>
            <p>Soluções rápidas e eficientes para todos os seus problemas técnicos</p>
          </div>

          <div class="services-grid">
            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-headset"></i>
              </div>
              <h3>Suporte Remoto</h3>
              <p>Atendimento técnico remoto para resolução rápida de problemas sem deslocamento</p>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-tools"></i>
              </div>
              <h3>Manutenção Preventiva</h3>
              <p>Monitoramento contínuo e manutenção preventiva para evitar falhas no sistema</p>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-clock"></i>
              </div>
              <h3>Suporte 24/7</h3>
              <p>Disponibilidade total para emergências técnicas a qualquer hora do dia</p>
            </div>

            <div class="service-card">
              <div class="service-icon">
                <i class="fas fa-users"></i>
              </div>
              <h3>Treinamento da Equipe</h3>
              <p>Capacitação de usuários para melhor utilização dos sistemas e ferramentas</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>Precisa de suporte técnico imediato?</h2>
            <p>
              Nossa equipe especializada está disponível 24/7 para resolver
              seus problemas técnicos e manter seus sistemas funcionando.
            </p>
            <div class="cta-buttons">
              <button (click)="openContactModal()" class="btn btn-primary">Solicitar Suporte</button>
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
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    .hero-section { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 6rem 0; text-align: center; }
    .hero-content h1 { font-size: 3.5rem; font-weight: 700; margin-bottom: 1rem; }
    .hero-subtitle { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; }
    .hero-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .services-section { padding: 5rem 0; background: #f8fafc; }
    .section-header { text-align: center; margin-bottom: 3rem; }
    .section-header h2 { font-size: 2.5rem; font-weight: 700; color: #1f2937; margin-bottom: 1rem; }
    .section-header p { font-size: 1.125rem; color: #6b7280; max-width: 600px; margin: 0 auto; }
    .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .service-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); text-align: center; transition: transform 0.3s ease; }
    .service-card:hover { transform: translateY(-4px); }
    .service-icon { font-size: 3rem; color: #8b5cf6; margin-bottom: 1rem; }
    .service-card h3 { font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-bottom: 1rem; }
    .service-card p { color: #6b7280; line-height: 1.6; }
    .cta-section { padding: 5rem 0; background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; text-align: center; }
    .cta-content h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; }
    .cta-content p { font-size: 1.125rem; margin-bottom: 2rem; opacity: 0.9; max-width: 600px; margin-left: auto; margin-right: auto; }
    .cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn { padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; text-decoration: none; display: inline-block; transition: all 0.3s ease; border: none; cursor: pointer; font-size: 1rem; }
    .btn-primary { background: #8b5cf6; color: white; }
    .btn-primary:hover { background: #7c3aed; transform: translateY(-2px); }
    .btn-secondary { background: transparent; color: white; border: 2px solid white; }
    .btn-secondary:hover { background: white; color: #1f2937; transform: translateY(-2px); }
    .contact-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000; display: none; }
    .contact-modal.active { display: block; }
    .modal-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); }
    .modal-content { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border-radius: 12px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; }
    .modal-header { padding: 1.5rem; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
    .modal-header h3 { margin: 0; color: #1f2937; }
    .modal-close { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #6b7280; }
    .modal-body { padding: 1.5rem; }
    @media (max-width: 768px) { .hero-content h1 { font-size: 2.5rem; } .hero-subtitle { font-size: 1.125rem; } .hero-buttons { flex-direction: column; align-items: center; } .services-grid { grid-template-columns: 1fr; } .cta-buttons { flex-direction: column; align-items: center; } }
    @media (max-width: 480px) { .hero-content h1 { font-size: 2rem; } .section-header h2 { font-size: 2rem; } .cta-content h2 { font-size: 2rem; } }
  `]
})
export class TechnicalSupportComponent {
  isContactModalOpen = false;
  pageData: InternalPageData = {
    title: 'Suporte Técnico',
    subtitle: 'Suporte especializado 24/7 para manter seus sistemas funcionando perfeitamente',
    backgroundImage: '/images/services/support.jpg',
    breadcrumbItems: [
      { label: 'Home', route: '/home' },
      { label: 'Serviços', route: '/servicos' },
      { label: 'Suporte Técnico', route: '/servicos/suporte', active: true }
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
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
