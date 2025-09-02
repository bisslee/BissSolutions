import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InternalPageComponent, InternalPageData } from '../../../components/internal-page/internal-page.component';
import { ContactFormComponent } from '../../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-software-development',
  standalone: true,
  imports: [CommonModule, RouterModule, InternalPageComponent, ContactFormComponent],
  template: `
    <app-internal-page [pageData]="pageData">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <h1>Desenvolvimento de Software</h1>
            <p class="hero-subtitle">
              Soluções personalizadas com mais de 20 anos de experiência em tecnologia
            </p>
            <div class="hero-buttons">
              <button (click)="openContactModal()" class="btn btn-primary">Solicitar Orçamento</button>
              <button (click)="scrollToTechnologies()" class="btn btn-secondary">Ver Tecnologias</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Experiência Section -->
      <section class="section experience-section">
        <div class="container">
          <div class="section-header">
            <h2>Experiência Comprovada</h2>
            <p>Mais de duas décadas desenvolvendo soluções para diversos setores</p>
          </div>

          <div class="grid experience-grid">
            <div class="card">
              <div class="card-icon">
                <i class="fas fa-building"></i>
              </div>
              <h3>Setores Atendidos</h3>
              <ul class="list">
                <li>Bancário e Financeiro</li>
                <li>Varejo e E-commerce</li>
                <li>Saúde e Medicina</li>
                <li>Entretenimento e Mídia</li>
                <li>Logística e Transporte</li>
              </ul>
            </div>

            <div class="card">
              <div class="card-icon">
                <i class="fas fa-users"></i>
              </div>
              <h3>Liderança Técnica</h3>
              <ul class="list">
                <li>Gestão de equipes de desenvolvimento</li>
                <li>Mentoring e capacitação técnica</li>
                <li>Arquitetura de soluções</li>
                <li>Gestão de projetos ágeis</li>
              </ul>
            </div>

            <div class="card">
              <div class="card-icon">
                <i class="fas fa-rocket"></i>
              </div>
              <h3>Projetos Realizados</h3>
              <ul class="list">
                <li>Migração de sistemas legados</li>
                <li>Desenvolvimento de microserviços</li>
                <li>APIs REST e integrações</li>
                <li>Sistemas de alta performance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Tecnologias Section -->
      <section id="tecnologias" class="technologies-section">
        <div class="container">
          <div class="section-header">
            <h2>Tecnologias e Ferramentas</h2>
            <p>Stack completo para desenvolvimento de soluções robustas e escaláveis</p>
          </div>

          <div class="tech-categories">
            <div class="tech-category">
              <h3><i class="fas fa-code"></i> Linguagens de Programação</h3>
              <div class="tech-tags">
                <span class="tech-tag">.NET 6/8/9</span>
                <span class="tech-tag">C#</span>
                <span class="tech-tag">Python</span>
                <span class="tech-tag">Java</span>
                <span class="tech-tag">JavaScript</span>
                <span class="tech-tag">TypeScript</span>
                <span class="tech-tag">PHP</span>
              </div>
            </div>

            <div class="tech-category">
              <h3><i class="fas fa-layer-group"></i> Frameworks e Bibliotecas</h3>
              <div class="tech-tags">
                <span class="tech-tag">ASP.NET Core</span>
                <span class="tech-tag">Django</span>
                <span class="tech-tag">Node.js</span>
                <span class="tech-tag">Angular</span>
                <span class="tech-tag">React.js</span>
                <span class="tech-tag">Vue.js</span>
                <span class="tech-tag">Next.js</span>
                <span class="tech-tag">Service Fabric</span>
              </div>
            </div>

            <div class="tech-category">
              <h3><i class="fas fa-database"></i> Bancos de Dados</h3>
              <div class="tech-tags">
                <span class="tech-tag">SQL Server</span>
                <span class="tech-tag">Oracle</span>
                <span class="tech-tag">PostgreSQL</span>
                <span class="tech-tag">MySQL</span>
                <span class="tech-tag">MongoDB</span>
                <span class="tech-tag">Redis</span>
              </div>
            </div>

            <div class="tech-category">
              <h3><i class="fas fa-cloud"></i> Arquitetura e DevOps</h3>
              <div class="tech-tags">
                <span class="tech-tag">Microserviços</span>
                <span class="tech-tag">CQRS</span>
                <span class="tech-tag">DDD</span>
                <span class="tech-tag">Docker</span>
                <span class="tech-tag">Kubernetes</span>
                <span class="tech-tag">CI/CD</span>
              </div>
            </div>

            <div class="tech-category">
              <h3><i class="fas fa-exchange-alt"></i> Integração e Mensageria</h3>
              <div class="tech-tags">
                <span class="tech-tag">Apache Kafka</span>
                <span class="tech-tag">Google Pub/Sub</span>
                <span class="tech-tag">RabbitMQ</span>
                <span class="tech-tag">APIs REST</span>
                <span class="tech-tag">WebServices</span>
              </div>
            </div>

            <div class="tech-category">
              <h3><i class="fas fa-vial"></i> Testes e Qualidade</h3>
              <div class="tech-tags">
                <span class="tech-tag">TDD</span>
                <span class="tech-tag">BDD</span>
                <span class="tech-tag">SpecFlow</span>
                <span class="tech-tag">NUnit</span>
                <span class="tech-tag">xUnit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Metodologias Section -->
      <section class="methodologies-section">
        <div class="container">
          <div class="section-header">
            <h2>Metodologias e Práticas</h2>
            <p>Abordagens comprovadas para entrega de qualidade e valor</p>
          </div>

          <div class="methodologies-grid">
            <div class="methodology-card">
              <div class="methodology-icon">
                <i class="fas fa-sync-alt"></i>
              </div>
              <h3>Agile & Scrum</h3>
              <p>Desenvolvimento iterativo com entregas contínuas e feedback constante do cliente</p>
            </div>

            <div class="methodology-card">
              <div class="methodology-icon">
                <i class="fas fa-code-branch"></i>
              </div>
              <h3>Test-Driven Development</h3>
              <p>Desenvolvimento orientado a testes para garantir qualidade e confiabilidade do código</p>
            </div>

            <div class="methodology-card">
              <div class="methodology-icon">
                <i class="fas fa-comments"></i>
              </div>
              <h3>Behavior-Driven Development</h3>
              <p>Desenvolvimento baseado em comportamentos para alinhar código com requisitos de negócio</p>
            </div>

            <div class="methodology-card">
              <div class="methodology-icon">
                <i class="fas fa-cogs"></i>
              </div>
              <h3>DevOps & CI/CD</h3>
              <p>Automação de processos de build, teste e deploy para entrega contínua</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Serviços Específicos Section -->
      <section class="section specific-services-section">
        <div class="container">
          <div class="section-header">
            <h2>Serviços Específicos</h2>
            <p>Soluções personalizadas para suas necessidades específicas</p>
          </div>

          <div class="services-list">
            <div class="service-item">
              <div class="service-icon">
                <i class="fas fa-mobile-alt"></i>
              </div>
              <div class="service-content">
                <h3>Desenvolvimento Mobile</h3>
                <p>Aplicativos nativos para Android e iOS, além de soluções cross-platform com React Native</p>
              </div>
            </div>

            <div class="service-item">
              <div class="service-icon">
                <i class="fas fa-globe"></i>
              </div>
              <div class="service-content">
                <h3>Desenvolvimento Web</h3>
                <p>Sites responsivos, aplicações web progressivas e sistemas web complexos</p>
              </div>
            </div>

            <div class="service-item">
              <div class="service-icon">
                <i class="fas fa-server"></i>
              </div>
              <div class="service-content">
                <h3>APIs e Backend</h3>
                <p>Desenvolvimento de APIs RESTful, microserviços e sistemas backend robustos</p>
              </div>
            </div>

            <div class="service-item">
              <div class="service-icon">
                <i class="fas fa-database"></i>
              </div>
              <div class="service-content">
                <h3>Banco de Dados</h3>
                <p>Modelagem, otimização e migração de bancos de dados relacionais e NoSQL</p>
              </div>
            </div>

            <div class="service-item">
              <div class="service-icon">
                <i class="fas fa-sync"></i>
              </div>
              <div class="service-content">
                <h3>Migração de Sistemas</h3>
                <p>Modernização de sistemas legados para tecnologias atuais e arquiteturas modernas</p>
              </div>
            </div>

            <div class="service-item">
              <div class="service-icon">
                <i class="fas fa-puzzle-piece"></i>
              </div>
              <div class="service-content">
                <h3>Integrações</h3>
                <p>Conectividade entre sistemas, APIs de terceiros e soluções de mensageria</p>
              </div>
            </div>
          </div>
        </div>
      </section>

            <!-- CTA Section -->
      <section class="section cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>Pronto para transformar sua ideia em realidade?</h2>
            <p>
              Com mais de 20 anos de experiência, posso ajudar você a desenvolver soluções
              que realmente fazem a diferença para seu negócio.
            </p>
            <div class="cta-buttons">
              <button (click)="openContactModal()" class="btn btn-primary">Iniciar Projeto</button>
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
    styleUrls: ['./software-development.component.css']
})
export class SoftwareDevelopmentComponent {
  isContactModalOpen = false;

  pageData: InternalPageData = {
    title: 'Desenvolvimento de Software',
    subtitle: 'Soluções personalizadas com mais de 20 anos de experiência em tecnologia',
    backgroundImage: '/images/services/software-development.jpg',
    breadcrumbItems: [
      { label: 'Home', route: '/home' },
      { label: 'Serviços', route: '/servicos' },
      { label: 'Desenvolvimento de Software', route: '/servicos/desenvolvimento-software', active: true }
    ]
  };

  openContactModal(): void {
    this.isContactModalOpen = true;
  }

  closeContactModal(): void {
    this.isContactModalOpen = false;
  }

  scrollToTechnologies(): void {
    const technologiesSection = document.getElementById('tecnologias');
    if (technologiesSection) {
      technologiesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
