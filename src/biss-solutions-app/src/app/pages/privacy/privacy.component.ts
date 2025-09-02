import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalPageComponent, InternalPageData } from '../../components/internal-page/internal-page.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, InternalPageComponent],
  template: `
    <app-internal-page [pageData]="pageData">
      <!-- Conteúdo da Política de Privacidade -->
      <div class="privacy-content">
        <div class="privacy-section">
          <h2>Política de Privacidade</h2>
          <p class="last-updated">Última atualização: {{ lastUpdated }}</p>

          <div class="privacy-text">
            <p>
              A Biss Solutions está comprometida em proteger a privacidade e os dados pessoais de nossos usuários,
              clientes e visitantes. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e
              protegemos suas informações pessoais.
            </p>
          </div>
        </div>

        <div class="privacy-section">
          <h3>1. Informações que Coletamos</h3>
          <div class="privacy-text">
            <h4>1.1 Informações de Contato</h4>
            <ul>
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone</li>
              <li>Nome da empresa</li>
            </ul>

            <h4>1.2 Informações de Navegação</h4>
            <ul>
              <li>Endereço IP</li>
              <li>Tipo de navegador</li>
              <li>Sistema operacional</li>
              <li>Páginas visitadas</li>
              <li>Tempo de permanência</li>
            </ul>

            <h4>1.3 Cookies e Tecnologias Similares</h4>
            <p>
              Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site,
              analisar o tráfego e personalizar o conteúdo.
            </p>
          </div>
        </div>

        <div class="privacy-section">
          <h3>2. Como Utilizamos suas Informações</h3>
          <div class="privacy-text">
            <p>Utilizamos suas informações pessoais para:</p>
            <ul>
              <li>Responder a suas solicitações e consultas</li>
              <li>Fornecer nossos serviços e soluções</li>
              <li>Enviar comunicações relacionadas aos nossos serviços</li>
              <li>Melhorar nossos produtos e serviços</li>
              <li>Cumprir obrigações legais e regulamentares</li>
              <li>Prevenir fraudes e garantir a segurança</li>
            </ul>
          </div>
        </div>

        <div class="privacy-section">
          <h3>3. Compartilhamento de Informações</h3>
          <div class="privacy-text">
            <p>
              <strong>Não vendemos, alugamos ou compartilhamos suas informações pessoais</strong> com terceiros,
              exceto nas seguintes situações:
            </p>
            <ul>
              <li>Com seu consentimento explícito</li>
              <li>Para prestadores de serviços que nos auxiliam na operação do site</li>
              <li>Quando exigido por lei ou processo legal</li>
              <li>Para proteger nossos direitos e propriedade</li>
            </ul>
          </div>
        </div>

        <div class="privacy-section">
          <h3>4. Segurança dos Dados</h3>
          <div class="privacy-text">
            <p>
              Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger
              suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
            <p>
              Nossas medidas de segurança incluem:
            </p>
            <ul>
              <li>Criptografia de dados em trânsito e em repouso</li>
              <li>Controle de acesso baseado em função</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backups regulares e seguros</li>
              <li>Treinamento de funcionários sobre privacidade</li>
            </ul>
          </div>
        </div>

        <div class="privacy-section">
          <h3>5. Retenção de Dados</h3>
          <div class="privacy-text">
            <p>
              Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades
              descritas nesta política, a menos que um período de retenção mais longo seja exigido ou
              permitido por lei.
            </p>
          </div>
        </div>

        <div class="privacy-section">
          <h3>6. Seus Direitos</h3>
          <div class="privacy-text">
            <p>Você tem os seguintes direitos relacionados aos seus dados pessoais:</p>
            <ul>
              <li><strong>Acesso:</strong> Solicitar informações sobre quais dados temos sobre você</li>
              <li><strong>Correção:</strong> Solicitar a correção de dados incorretos ou incompletos</li>
              <li><strong>Exclusão:</strong> Solicitar a exclusão de seus dados pessoais</li>
              <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
              <li><strong>Oposição:</strong> Opor-se ao processamento de seus dados</li>
              <li><strong>Revogação:</strong> Revogar consentimentos anteriormente fornecidos</li>
            </ul>
          </div>
        </div>

        <div class="privacy-section">
          <h3>7. Transferências Internacionais</h3>
          <div class="privacy-text">
            <p>
              Suas informações pessoais podem ser transferidas e processadas em países diferentes do seu
              país de residência. Quando fazemos essas transferências, garantimos que seus dados sejam
              protegidos de acordo com esta política e as leis aplicáveis.
            </p>
          </div>
        </div>

        <div class="privacy-section">
          <h3>8. Menores de Idade</h3>
          <div class="privacy-text">
            <p>
              Nosso site não é destinado a menores de 18 anos. Não coletamos intencionalmente informações
              pessoais de menores de idade. Se você é um pai ou responsável e acredita que seu filho nos
              forneceu informações pessoais, entre em contato conosco.
            </p>
          </div>
        </div>

        <div class="privacy-section">
          <h3>9. Alterações nesta Política</h3>
          <div class="privacy-text">
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Quando fizermos alterações
              significativas, notificaremos você por e-mail ou através de um aviso em nosso site.
              Recomendamos que você revise esta política regularmente.
            </p>
          </div>
        </div>

        <div class="privacy-section">
          <h3>10. Contato</h3>
          <div class="privacy-text">
            <p>
              Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados pessoais,
              entre em contato conosco:
            </p>
            <div class="contact-info">
              <p><strong>E-mail:</strong> <a href="mailto:privacidade@biss.com.br">privacidade@biss.com.br</a></p>
              <p><strong>Telefone:</strong> +55 11 9573-9399</p>
              <p><strong>Endereço:</strong> Rua Avanhandava, 459 - Cj 512, Bela Vista, São Paulo/SP</p>
            </div>
          </div>
        </div>

        <div class="privacy-footer">
          <p>
            Esta Política de Privacidade está em conformidade com a Lei Geral de Proteção de Dados (LGPD)
            e outras leis de privacidade aplicáveis.
          </p>
        </div>
      </div>
    </app-internal-page>
  `,
  styles: [`
    .privacy-content {
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.7;
    }

    .privacy-section {
      margin-bottom: 2.5rem;
    }

    .privacy-section h2 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 1rem 0;
      text-align: center;
    }

    .privacy-section h3 {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 1rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e2e8f0;
    }

    .privacy-section h4 {
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

    .privacy-text {
      color: #374151;
      font-size: 1rem;
    }

    .privacy-text p {
      margin: 0 0 1rem 0;
    }

    .privacy-text ul {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }

    .privacy-text li {
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

    .privacy-footer {
      background: #f1f5f9;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      margin-top: 3rem;
      border: 1px solid #e2e8f0;
    }

    .privacy-footer p {
      margin: 0;
      color: #475569;
      font-weight: 500;
    }

    /* Responsivo */
    @media (max-width: 768px) {
      .privacy-content {
        padding: 0 1rem;
      }

      .privacy-section h2 {
        font-size: 2rem;
      }

      .privacy-section h3 {
        font-size: 1.5rem;
      }

      .privacy-section h4 {
        font-size: 1.125rem;
      }

      .contact-info {
        padding: 1rem;
      }

      .privacy-footer {
        padding: 1.5rem;
        margin-top: 2rem;
      }
    }

    @media (max-width: 480px) {
      .privacy-section h2 {
        font-size: 1.75rem;
      }

      .privacy-section h3 {
        font-size: 1.375rem;
      }

      .privacy-text {
        font-size: 0.95rem;
      }

      .contact-info {
        padding: 0.75rem;
      }

      .privacy-footer {
        padding: 1rem;
      }
    }
  `]
})
export class PrivacyComponent {
  lastUpdated = '15 de Janeiro de 2025';

  pageData: InternalPageData = {
    title: 'Política de Privacidade',
    subtitle: 'Como protegemos e tratamos seus dados pessoais',
    backgroundImage: '/images/slides/slide1.jpg',
    breadcrumbItems: [
      { label: 'Home', route: '/home' },
      { label: 'Política de Privacidade', route: '/privacy', active: true }
    ]
  };
}
