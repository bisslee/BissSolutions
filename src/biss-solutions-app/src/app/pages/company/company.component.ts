import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalPageComponent, InternalPageData } from '../../components/internal-page/internal-page.component';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, InternalPageComponent],
  template: `
    <app-internal-page [pageData]="pageData">
      <!-- Conteúdo específico da página de empresa -->
      <div class="empresa-content">
        <div class="empresa-grid">
          <!-- Sobre a Empresa -->
          <div class="empresa-section">
            <h2>Sobre a Biss Solutions</h2>
            <p>
              A Biss Solutions é uma empresa especializada em criar, otimizar e evoluir processos
              e sistemas com soluções ágeis e inovadoras. Nossa missão é transformar ideias em
              realidade digital, impulsionando o crescimento dos nossos clientes através da
              tecnologia de ponta.
            </p>
            <p>
              Com anos de experiência no mercado, nossa equipe de especialistas está comprometida
              em entregar soluções personalizadas que atendem às necessidades específicas de cada
              negócio, garantindo qualidade, eficiência e resultados mensuráveis.
            </p>
          </div>

          <!-- Nossos Valores -->
          <div class="empresa-section">
            <h2>Nossos Valores</h2>
            <ul class="valores-list">
              <li><strong>Inovação:</strong> Sempre buscamos as melhores soluções tecnológicas</li>
              <li><strong>Qualidade:</strong> Compromisso com a excelência em tudo que fazemos</li>
              <li><strong>Confiança:</strong> Construímos relacionamentos duradouros</li>
              <li><strong>Agilidade:</strong> Resposta rápida e eficiente às necessidades</li>
              <li><strong>Transparência:</strong> Comunicação clara e honesta</li>
            </ul>
          </div>

          <!-- Nossa Visão -->
          <div class="empresa-section">
            <h2>Nossa Visão</h2>
            <p>
              Ser reconhecida como uma das principais empresas de tecnologia do Brasil,
              conhecida pela inovação, qualidade e compromisso com o sucesso dos clientes.
            </p>
          </div>

          <!-- Nossa Missão -->
          <div class="empresa-section">
            <h2>Nossa Missão</h2>
            <p>
              Ser referência em soluções tecnológicas, oferecendo serviços de excelência que
              impulsionem a transformação digital das empresas, contribuindo para o sucesso
              e crescimento sustentável dos nossos clientes.
            </p>
          </div>
        </div>
      </div>

    </app-internal-page>
  `,
  styles: [`
    .empresa-content {
      max-width: 1000px;
      margin: 0 auto;
    }

    .empresa-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 3rem;
    }

    .empresa-section h2 {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 1.5rem 0;
      border-bottom: 3px solid #3b82f6;
      padding-bottom: 0.5rem;
    }

    .empresa-section p {
      font-size: 1rem;
      line-height: 1.7;
      color: #475569;
      margin: 0 0 1rem 0;
    }

    .valores-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .valores-list li {
      padding: 0.75rem 0;
      border-bottom: 1px solid #e2e8f0;
      font-size: 1rem;
      line-height: 1.6;
      color: #475569;
    }

    .valores-list li:last-child {
      border-bottom: none;
    }

    .valores-list strong {
      color: #1e293b;
    }

    /* Responsivo */
    @media (max-width: 768px) {
      .empresa-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .empresa-section h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }

      .empresa-section p {
        font-size: 0.95rem;
      }
    }

    @media (max-width: 480px) {
      .empresa-grid {
        gap: 1.5rem;
      }

      .empresa-section h2 {
        font-size: 1.375rem;
      }

      .empresa-section p {
        font-size: 0.9rem;
      }

      .valores-list li {
        font-size: 0.9rem;
        padding: 0.5rem 0;
      }
    }
  `]
})
export class CompanyComponent {
  pageData: InternalPageData = {
    title: 'Nossa Empresa',
    subtitle: 'Conheça a história, missão e valores da Biss Solutions',
    backgroundImage: '/images/services/consulting.jpg',
    breadcrumbItems: [
      { label: 'Home', route: '/home' },
      { label: 'Empresa', route: '/empresa', active: true }
    ]
  };
}
