import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalPageComponent, InternalPageData } from '../../components/internal-page/internal-page.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, InternalPageComponent],
  template: `
    <app-internal-page [pageData]="pageData">
      <!-- Conteúdo dos Termos de Uso -->
      <div class="terms-content">
        <div class="terms-section">
          <h2>Termos de Uso</h2>
          <p class="last-updated">Última atualização: {{ lastUpdated }}</p>

          <div class="terms-text">
            <p>
              Bem-vindo ao site da Biss Solutions. Ao acessar e utilizar este site, você concorda em cumprir
              e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer
              parte destes termos, não deve utilizar nosso site.
            </p>
          </div>
        </div>

        <div class="terms-section">
          <h3>1. Aceitação dos Termos</h3>
          <div class="terms-text">
            <p>
              Ao acessar e utilizar este site, você confirma que leu, entendeu e concorda em cumprir
              estes Termos de Uso, bem como todas as leis e regulamentos aplicáveis. Estes termos
              constituem um acordo entre você e a Biss Solutions.
            </p>
          </div>
        </div>

        <div class="terms-section">
          <h3>2. Uso do Site</h3>
          <div class="terms-text">
            <h4>2.1 Uso Permitido</h4>
            <p>Você pode utilizar nosso site para:</p>
            <ul>
              <li>Navegar e visualizar informações sobre nossos serviços</li>
              <li>Entrar em contato conosco através dos formulários disponíveis</li>
              <li>Acessar recursos e materiais informativos</li>
              <li>Utilizar ferramentas e funcionalidades disponibilizadas</li>
            </ul>

            <h4>2.2 Uso Proibido</h4>
            <p>É estritamente proibido:</p>
            <ul>
              <li>Utilizar o site para fins ilegais ou fraudulentos</li>
              <li>Tentar acessar áreas restritas ou sistemas sem autorização</li>
              <li>Interferir no funcionamento do site ou servidores</li>
              <li>Distribuir malware, vírus ou código malicioso</li>
              <li>Coletar informações pessoais de outros usuários sem consentimento</li>
              <li>Utilizar bots, crawlers ou scripts automatizados sem permissão</li>
            </ul>
          </div>
        </div>

        <div class="terms-section">
          <h3>3. Propriedade Intelectual</h3>
          <div class="terms-text">
            <p>
              Todo o conteúdo deste site, incluindo mas não se limitando a textos, imagens, gráficos,
              logotipos, ícones, software e design, é propriedade da Biss Solutions ou de nossos
              licenciadores e está protegido por leis de direitos autorais, marcas registradas e
              outras leis de propriedade intelectual.
            </p>
            <p>
              É expressamente proibida a reprodução, distribuição, modificação ou uso comercial de
              qualquer conteúdo sem autorização prévia por escrito da Biss Solutions.
            </p>
          </div>
        </div>

        <div class="terms-section">
          <h3>4. Privacidade e Proteção de Dados</h3>
          <div class="terms-text">
            <p>
              Sua privacidade é importante para nós. O uso de informações pessoais coletadas através
              deste site está sujeito à nossa Política de Privacidade, que faz parte integrante
              destes Termos de Uso.
            </p>
            <p>
              Ao utilizar nosso site, você concorda com a coleta e uso de informações conforme
              descrito em nossa Política de Privacidade.
            </p>
          </div>
        </div>

        <div class="terms-section">
          <h3>5. Limitação de Responsabilidade</h3>
          <div class="terms-text">
            <p>
              A Biss Solutions se esforça para manter as informações do site precisas e atualizadas,
              mas não garante a precisão, completude ou atualidade de qualquer informação.
            </p>
            <p>
              Em nenhuma circunstância a Biss Solutions será responsável por:</p>
            <ul>
              <li>Danos diretos, indiretos, incidentais ou consequenciais</li>
              <li>Perda de lucros, dados ou oportunidades de negócio</li>
              <li>Interrupção do serviço ou indisponibilidade do site</li>
              <li>Danos causados por terceiros ou eventos fora de nosso controle</li>
            </ul>
          </div>
        </div>

        <div class="terms-section">
          <h3>6. Disponibilidade do Site</h3>
          <div class="terms-text">
            <p>
              Nos esforçamos para manter o site disponível 24 horas por dia, 7 dias por semana,
              mas não garantimos disponibilidade contínua. O site pode estar temporariamente
              indisponível devido a manutenção, atualizações ou circunstâncias técnicas.
            </p>
            <p>
              Reservamo-nos o direito de modificar, suspender ou descontinuar o site ou qualquer
              funcionalidade a qualquer momento, sem aviso prévio.
            </p>
          </div>
        </div>

        <div class="terms-section">
          <h3>7. Links para Terceiros</h3>
          <div class="terms-text">
            <p>
              Nosso site pode conter links para sites de terceiros. Esses links são fornecidos
              apenas para sua conveniência e não constituem endosso ou aprovação do conteúdo
              desses sites.
            </p>
            <p>
              A Biss Solutions não tem controle sobre o conteúdo ou políticas de privacidade
              de sites de terceiros e não se responsabiliza por eles.
            </p>
          </div>
        </div>

        <div class="terms-section">
          <h3>8. Modificações dos Termos</h3>
          <div class="terms-text">
            <p>
              Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento.
              As modificações entrarão em vigor imediatamente após sua publicação no site.
            </p>
            <p>
              É sua responsabilidade revisar periodicamente estes termos. O uso contínuo do
              site após as modificações constitui aceitação dos novos termos.
            </p>
          </div>
        </div>

        <div class="terms-section">
          <h3>9. Lei Aplicável e Jurisdição</h3>
          <div class="terms-text">
            <p>
              Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa relacionada
              a estes termos ou ao uso do site será resolvida nos tribunais da comarca de São Paulo, SP.
            </p>
            <p>
              Se qualquer disposição destes termos for considerada inválida ou inexequível,
              as demais disposições permanecerão em pleno vigor e efeito.
            </p>
          </div>
        </div>

        <div class="terms-section">
          <h3>10. Contato</h3>
          <div class="terms-text">
            <p>
              Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
            </p>
            <div class="contact-info">
              <p><strong>E-mail:</strong> <a href="mailto:legal@biss.com.br">legal@biss.com.br</a></p>
              <p><strong>Telefone:</strong> +55 11 9573-9399</p>
              <p><strong>Endereço:</strong> Rua Avanhandava, 459 - Cj 512, Bela Vista, São Paulo/SP</p>
            </div>
          </div>
        </div>

        <div class="terms-footer">
          <p>
            Ao utilizar nosso site, você confirma que leu, entendeu e concorda com estes Termos de Uso
            em sua totalidade.
          </p>
        </div>
      </div>
    </app-internal-page>
  `,
  styles: [`
    .terms-content {
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.7;
    }

    .terms-section {
      margin-bottom: 2.5rem;
    }

    .terms-section h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 1rem 0;
      text-align: center;
    }

    .terms-section h3 {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 1rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e2e8f0;
    }

    .terms-section h4 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #374151;
      margin: 1.5rem 0 0.75rem 0;
    }

    .last-updated {
      text-align: center;
      color: #6b7280;
      font-style: italic;
      margin: 0 0 2rem 0;
      font-size: 0.95rem;
    }

    .terms-text {
      color: #374151;
      font-size: 1rem;
    }

    .terms-text p {
      margin: 0 0 1rem 0;
    }

    .terms-text ul {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }

    .terms-text li {
      margin-bottom: 0.5rem;
    }

    .contact-info {
      background: #f8fafc;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #3b82f6;
      margin: 1rem 0;
    }

    .contact-info p {
      margin: 0 0 0.5rem 0;
    }

    .contact-info a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
    }

    .contact-info a:hover {
      text-decoration: underline;
    }

    .terms-footer {
      background: #f1f5f9;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      margin-top: 3rem;
      border: 1px solid #e2e8f0;
    }

    .terms-footer p {
      margin: 0;
      color: #475569;
      font-weight: 500;
    }

    /* Responsivo */
    @media (max-width: 768px) {
      .terms-content {
        padding: 0 1rem;
      }

      .terms-section h2 {
        font-size: 2rem;
      }

      .terms-section h3 {
        font-size: 1.5rem;
      }

      .terms-section h4 {
        font-size: 1.125rem;
      }

      .contact-info {
        padding: 1rem;
      }

      .terms-footer {
        padding: 1.5rem;
        margin-top: 2rem;
      }
    }

    @media (max-width: 480px) {
      .terms-section h2 {
        font-size: 1.75rem;
      }

      .terms-section h3 {
        font-size: 1.375rem;
      }

      .terms-text {
        font-size: 0.95rem;
      }

      .contact-info {
        padding: 0.75rem;
      }

      .terms-footer {
        padding: 1rem;
      }
    }
  `]
})
export class TermsComponent {
  lastUpdated = '15 de Janeiro de 2025';

  pageData: InternalPageData = {
    title: 'Termos de Uso',
    subtitle: 'Condições para utilização do nosso site e serviços',
    backgroundImage: '/images/slides/slide2.jpg',
    breadcrumbItems: [
      { label: 'Home', route: '/home' },
      { label: 'Termos de Uso', route: '/terms', active: true }
    ]
  };
}
