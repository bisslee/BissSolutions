import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InternalPageComponent, InternalPageData } from '../../components/internal-page/internal-page.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, InternalPageComponent],
  template: `
    <app-internal-page [pageData]="pageData">
      <!-- Arquitetura do Site -->
      <section class="architecture-section">
        <div class="container">
          <div class="architecture-content">
            <h2>Arquitetura do Site</h2>
            <p class="intro-text">
              Este site foi desenvolvido com as mais modernas tecnologias web, seguindo as melhores práticas
              de desenvolvimento e arquitetura de software.
            </p>

            <!-- Stack Tecnológico -->
            <div class="tech-stack">
              <h3>Stack Tecnológico</h3>
              <div class="tech-grid">
                <div class="tech-item">
                  <div class="tech-icon">⚡</div>
                  <h4>Angular 20.2.1</h4>
                  <p>Framework frontend moderno com Standalone Components, Signals e Server-Side Rendering</p>
                </div>
                <div class="tech-item">
                  <div class="tech-icon">🎨</div>
                  <h4>Tailwind CSS</h4>
                  <p>Framework CSS utility-first para design responsivo e moderno</p>
                </div>
                <div class="tech-item">
                  <div class="tech-icon">📱</div>
                  <h4>PWA</h4>
                  <p>Progressive Web App com Service Worker para experiência offline</p>
                </div>
                <div class="tech-item">
                  <div class="tech-icon">🔍</div>
                  <h4>SEO Otimizado</h4>
                  <p>Meta tags, Schema.org, Open Graph e otimizações para motores de busca</p>
                </div>
                <div class="tech-item">
                  <div class="tech-icon">⚡</div>
                  <h4>Performance</h4>
                  <p>Lazy loading, code splitting e otimizações de carregamento</p>
                </div>
                <div class="tech-item">
                  <div class="tech-icon">🛡️</div>
                  <h4>Segurança</h4>
                  <p>Content Security Policy, HTTPS e práticas de segurança web</p>
                </div>
              </div>
            </div>

            <!-- Arquitetura de Componentes -->
            <div class="architecture-diagram">
              <h3>Arquitetura de Componentes</h3>
              <div class="diagram-container">
                <div class="diagram-level">
                  <h4>Presentation Layer</h4>
                  <div class="components">
                    <span class="component">Header</span>
                    <span class="component">Footer</span>
                    <span class="component">Navigation</span>
                    <span class="component">Pages</span>
                  </div>
                </div>
                <div class="diagram-arrow">↓</div>
                <div class="diagram-level">
                  <h4>Business Logic Layer</h4>
                  <div class="components">
                    <span class="component">Services</span>
                    <span class="component">Components</span>
                    <span class="component">Guards</span>
                    <span class="component">Interceptors</span>
                  </div>
                </div>
                <div class="diagram-arrow">↓</div>
                <div class="diagram-level">
                  <h4>Data Layer</h4>
                  <div class="components">
                    <span class="component">HTTP Client</span>
                    <span class="component">Local Storage</span>
                    <span class="component">Service Worker</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Características Técnicas -->
            <div class="technical-features">
              <h3>Características Técnicas</h3>
              <div class="features-grid">
                <div class="feature-card">
                  <h4>🚀 Performance</h4>
                  <ul>
                    <li>Lazy loading de rotas</li>
                    <li>Code splitting automático</li>
                    <li>Tree shaking</li>
                    <li>Minificação e compressão</li>
                  </ul>
                </div>
                <div class="feature-card">
                  <h4>📱 Responsividade</h4>
                  <ul>
                    <li>Mobile-first design</li>
                    <li>Breakpoints otimizados</li>
                    <li>Touch-friendly interface</li>
                    <li>Cross-browser compatibility</li>
                  </ul>
                </div>
                <div class="feature-card">
                  <h4>🔧 Manutenibilidade</h4>
                  <ul>
                    <li>Standalone components</li>
                    <li>TypeScript strict mode</li>
                    <li>ESLint + Prettier</li>
                    <li>Modular architecture</li>
                  </ul>
                </div>
                <div class="feature-card">
                  <h4>🌐 Acessibilidade</h4>
                  <ul>
                    <li>WCAG 2.1 compliance</li>
                    <li>Semantic HTML</li>
                    <li>Keyboard navigation</li>
                    <li>Screen reader support</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Próximos Passos -->
            <div class="roadmap">
              <h3>Roadmap de Desenvolvimento</h3>
              <div class="roadmap-timeline">
                <div class="timeline-item">
                  <div class="timeline-marker">1</div>
                  <div class="timeline-content">
                    <h4>API Admin</h4>
                    <p>Desenvolvimento de API administrativa para gerenciamento de conteúdo</p>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-marker">2</div>
                  <div class="timeline-content">
                    <h4>SSO (Single Sign-On)</h4>
                    <p>Implementação de autenticação única para todos os serviços</p>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-marker">3</div>
                  <div class="timeline-content">
                    <h4>LinkHub</h4>
                    <p>Centralizador de links e recursos da empresa</p>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-marker">4</div>
                  <div class="timeline-content">
                    <h4>ContaComigo</h4>
                    <p>Sistema de gestão de contas e usuários</p>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-marker">5</div>
                  <div class="timeline-content">
                    <h4>Meu Blog</h4>
                    <p>Plataforma de blog integrada com CMS</p>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-marker">6</div>
                  <div class="timeline-content">
                    <h4>Social Integration</h4>
                    <p>Integração completa com redes sociais</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Estatísticas -->
            <div class="stats">
              <h3>Estatísticas do Projeto</h3>
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-number">18</div>
                  <div class="stat-label">Componentes</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">8</div>
                  <div class="stat-label">Páginas</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">4</div>
                  <div class="stat-label">Serviços</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">100%</div>
                  <div class="stat-label">TypeScript</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </app-internal-page>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .architecture-content {
      padding: 2rem 0;
    }

    .architecture-content h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 1rem;
      text-align: center;
    }

    .intro-text {
      font-size: 1.125rem;
      color: #64748b;
      text-align: center;
      max-width: 800px;
      margin: 0 auto 3rem;
      line-height: 1.6;
    }

    .tech-stack {
      margin-bottom: 4rem;
    }

    .tech-stack h3 {
      font-size: 2rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 2rem;
      text-align: center;
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .tech-item {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      text-align: center;
      transition: all 0.3s ease;
    }

    .tech-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .tech-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .tech-item h4 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.75rem;
    }

    .tech-item p {
      color: #64748b;
      line-height: 1.6;
    }

    .architecture-diagram {
      margin-bottom: 4rem;
    }

    .architecture-diagram h3 {
      font-size: 2rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 2rem;
      text-align: center;
    }

    .diagram-container {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }

    .diagram-level {
      margin-bottom: 1rem;
    }

    .diagram-level h4 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #3b82f6;
      margin-bottom: 0.75rem;
    }

    .components {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .component {
      background: #eff6ff;
      color: #1e40af;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .diagram-arrow {
      text-align: center;
      font-size: 1.5rem;
      color: #3b82f6;
      margin: 1rem 0;
    }

    .technical-features {
      margin-bottom: 4rem;
    }

    .technical-features h3 {
      font-size: 2rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 2rem;
      text-align: center;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }

    .feature-card h4 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 1rem;
    }

    .feature-card ul {
      list-style: none;
      padding: 0;
    }

    .feature-card li {
      color: #64748b;
      margin-bottom: 0.5rem;
      padding-left: 1.5rem;
      position: relative;
    }

    .feature-card li::before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: bold;
    }

    .roadmap {
      margin-bottom: 4rem;
    }

    .roadmap h3 {
      font-size: 2rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 2rem;
      text-align: center;
    }

    .roadmap-timeline {
      position: relative;
      padding-left: 2rem;
    }

    .roadmap-timeline::before {
      content: "";
      position: absolute;
      left: 1rem;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
    }

    .timeline-item {
      position: relative;
      margin-bottom: 2rem;
      padding-left: 2rem;
    }

    .timeline-marker {
      position: absolute;
      left: -1.5rem;
      top: 0;
      width: 2rem;
      height: 2rem;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .timeline-content {
      background: white;
      padding: 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
    }

    .timeline-content h4 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }

    .timeline-content p {
      color: #64748b;
      line-height: 1.6;
    }

    .stats {
      margin-bottom: 2rem;
    }

    .stats h3 {
      font-size: 2rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 2rem;
      text-align: center;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }

    .stat-item {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      text-align: center;
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 700;
      color: #3b82f6;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1rem;
      color: #64748b;
      font-weight: 500;
    }

    /* Responsividade */
    @media (max-width: 768px) {
      .architecture-content h2 {
        font-size: 2rem;
      }

      .tech-grid {
        grid-template-columns: 1fr;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .components {
        justify-content: center;
      }

      .roadmap-timeline {
        padding-left: 1rem;
      }

      .timeline-item {
        padding-left: 1.5rem;
      }

      .timeline-marker {
        left: -1rem;
      }
    }
  `]
})
export class AboutComponent {
  pageData: InternalPageData = {
    title: 'Sobre o Site',
    subtitle: 'Arquitetura, tecnologias e roadmap de desenvolvimento',
    backgroundImage: '/images/about/aboutjpg',
    breadcrumbItems: [
      { label: 'Home', route: '/home' },
      { label: 'Sobre', route: '/sobre' }
    ]
  };
}
