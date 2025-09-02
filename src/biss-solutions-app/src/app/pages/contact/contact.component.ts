import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalPageComponent, InternalPageData } from '../../components/internal-page/internal-page.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { SocialComponent } from '../../components/social/social.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, InternalPageComponent, ContactFormComponent, SocialComponent],
  template: `
    <app-internal-page [pageData]="pageData">
      <!-- Conteúdo da página de contato -->
      <div class="contato-content">
        <div class="contato-grid">
          <!-- Informações de Contato -->
          <div class="contato-info">
            <h2>Entre em Contato</h2>
            <p class="contato-description">
              Estamos aqui para ajudar! Entre em contato conosco para discutir suas necessidades
              e descobrir como podemos impulsionar seu negócio com soluções tecnológicas inovadoras.
            </p>

            <!-- Detalhes de Contato -->
            <div class="contato-details">
              <div class="contato-item">
                <div class="contato-icon">
                  <i class="ri-mail-line"></i>
                </div>
                <div class="contato-text">
                  <h3>Email</h3>
                  <p>contato@biss.com.br</p>
                  <p>comercial@biss.com.br</p>
                </div>
              </div>

              <div class="contato-item">
                <div class="contato-icon">
                  <i class="ri-phone-line"></i>
                </div>
                <div class="contato-text">
                  <h3>Telefone</h3>
                  <p>+55 11 9573-9399</p>
                  <p>Seg-Sex: 10:00-20:00</p>
                </div>
              </div>

                             <div class="contato-item">
                 <div class="contato-icon">
                   <i class="ri-map-pin-line"></i>
                 </div>
                 <div class="contato-text">
                   <h3>Endereço</h3>
                   <p>Rua Avanhandava, 459 - Cj 512</p>
                   <p>Bela Vista - São Paulo/SP</p>
                   <p>CEP: 01311-000</p>
                 </div>
               </div>

              <div class="contato-item">
                <div class="contato-icon">
                  <i class="ri-time-line"></i>
                </div>
                <div class="contato-text">
                  <h3>Horário de Funcionamento</h3>
                  <p>Segunda a Sexta: 10:00 às 20:00</p>
                  <p>Sábados: 9:00 às 13:00</p>
                  <p>Domingos: Fechado</p>
                </div>
              </div>
            </div>

            <!-- Redes Sociais -->
            <div class="contato-social">
              <h3>Siga-nos nas Redes Sociais</h3>
              <p>Fique por dentro das novidades e tendências tecnológicas</p>
              <app-social></app-social>
            </div>
          </div>

          <!-- Formulário de Contato -->
          <div class="contato-form-section">
            <app-contact-form></app-contact-form>
          </div>
        </div>

        <!-- Mapa do Google -->
        <div class="contato-mapa">
          <h2>Nossa Localização</h2>
          <p>Visite nossa sede no coração de São Paulo</p>
          <div class="mapa-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1828.7182961684307!2d-46.647152737960134!3d-23.55275824785863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce592229d4505f%3A0x9c8ca117edafffc!2sBiss%20Solutions!5e0!3m2!1spt-BR!2sbr!4v1756403107647!5m2!1spt-BR!2sbr"
              width="100%"
              height="450"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Localização da Biss Solutions - Rua Avanhandava, 459"
            ></iframe>
          </div>
        </div>
      </div>
    </app-internal-page>
  `,
  styles: [`
    .contato-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .contato-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      margin-bottom: 4rem;
    }

    .contato-info h2,
    .contato-form-section h2,
    .contato-mapa h2 {
      font-size: 2rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 1rem 0;
    }

    .contato-description {
      font-size: 1.125rem;
      line-height: 1.7;
      color: #475569;
      margin: 0 0 2rem 0;
    }

    .contato-details {
      margin-bottom: 2rem;
    }

    .contato-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 8px;
      border-left: 4px solid #3b82f6;
    }

    .contato-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .contato-icon i {
      font-size: 1.25rem;
    }

    .contato-text h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 0.5rem 0;
    }

    .contato-text p {
      font-size: 0.95rem;
      color: #64748b;
      margin: 0 0 0.25rem 0;
      line-height: 1.5;
    }

    .contato-social {
      background: #f1f5f9;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
    }

    .contato-social h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 0.5rem 0;
    }

    .contato-social p {
      font-size: 0.95rem;
      color: #64748b;
      margin: 0 0 1rem 0;
    }

    .contato-form-section {
      background: #f8fafc;
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }

    .contato-form-section p {
      font-size: 1rem;
      color: #64748b;
      margin: 0 0 1.5rem 0;
    }

    .contato-mapa {
      text-align: center;
      margin-top: 3rem;
    }

    .contato-mapa h2 {
      margin-bottom: 0.5rem;
    }

    .contato-mapa p {
      font-size: 1.125rem;
      color: #64748b;
      margin: 0 0 2rem 0;
    }

    .mapa-container {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    /* Responsivo */
    @media (max-width: 768px) {
      .contato-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .contato-info h2,
      .contato-form-section h2,
      .contato-mapa h2 {
        font-size: 1.75rem;
      }

      .contato-description {
        font-size: 1rem;
      }

      .contato-item {
        padding: 0.75rem;
      }

      .contato-icon {
        width: 40px;
        height: 40px;
      }

      .contato-icon i {
        font-size: 1.125rem;
      }

      .contato-form-section {
        padding: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .contato-grid {
        gap: 1.5rem;
      }

      .contato-info h2,
      .contato-form-section h2,
      .contato-mapa h2 {
        font-size: 1.5rem;
      }

      .contato-item {
        flex-direction: column;
        text-align: center;
        gap: 0.75rem;
      }

      .contato-form-section {
        padding: 1rem;
      }

      .mapa-container iframe {
        height: 300px;
      }
    }
  `]
})
export class ContactComponent {
  pageData: InternalPageData = {
    title: 'Contato',
    subtitle: 'Entre em contato conosco e descubra como podemos ajudar seu negócio',
    backgroundImage: '/images/services/profissional.jpg',
    breadcrumbItems: [
      { label: 'Home', route: '/home' },
      { label: 'Contato', route: '/contato', active: true }
    ]
  };
}
