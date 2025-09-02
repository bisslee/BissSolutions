import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Partner {
  id: number;
  name: string;
  logo: string;
  website: string;
  description?: string;
}

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="partners-section">
      <div class="container">
        <div class="section-header" *ngIf="title || description">
          <h2 *ngIf="title" class="section-title">{{ title }}</h2>
          <p *ngIf="description" class="section-description">{{ description }}</p>
        </div>

        <div class="partners-grid">
          <div
            *ngFor="let partner of partners"
            class="partner-item"
            (click)="openPartnerWebsite(partner.website)"
            [attr.aria-label]="'Visitar site do ' + partner.name"
            tabindex="0"
            (keydown.enter)="openPartnerWebsite(partner.website)"
            (keydown.space)="openPartnerWebsite(partner.website)"
          >
            <div class="partner-logo">
              <img
                [src]="partner.logo"
                [alt]="'Logo ' + partner.name"
                loading="lazy"
              />
            </div>
            <div class="partner-info" *ngIf="showPartnerNames">
              <h4 class="partner-name">{{ partner.name }}</h4>
              <p *ngIf="partner.description" class="partner-description">
                {{ partner.description }}
              </p>
            </div>
            <div class="partner-overlay">
              <i class="fas fa-external-link-alt"></i>
              <span>Visitar Site</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .partners-section {
      padding: 4rem 0;
      background: #f8fafc;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 1rem 0;
    }

    .section-description {
      font-size: 1.125rem;
      color: #6b7280;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .partners-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      align-items: center;
    }

    .partner-item {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border: 2px solid transparent;
    }

    .partner-item:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      border-color: #2563eb;
    }

    .partner-item:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .partner-logo {
      margin-bottom: 1rem;
      position: relative;
      z-index: 2;
    }

    .partner-logo img {
      max-width: 120px;
      max-height: 80px;
      width: auto;
      height: auto;
      transition: all 0.3s ease;
      object-fit: contain;
    }

    .partner-item:hover .partner-logo img {
      transform: scale(1.1);
    }

    .partner-info {
      position: relative;
      z-index: 2;
    }

    .partner-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: #374151;
      margin: 0 0 0.5rem 0;
    }

    .partner-description {
      font-size: 0.875rem;
      color: #6b7280;
      line-height: 1.5;
      margin: 0;
    }

    .partner-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.9), rgba(16, 185, 129, 0.9));
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 3;
    }

    .partner-item:hover .partner-overlay {
      opacity: 1;
    }

    .partner-overlay i {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .partner-overlay span {
      font-weight: 600;
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .partners-section {
        padding: 3rem 0;
      }

      .section-title {
        font-size: 2rem;
      }

      .section-description {
        font-size: 1rem;
      }

      .partners-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1.5rem;
      }

      .partner-item {
        padding: 1.5rem;
      }

      .partner-logo img {
        max-width: 100px;
        max-height: 60px;
      }
    }

    @media (max-width: 480px) {
      .partners-section {
        padding: 2rem 0;
      }

      .section-title {
        font-size: 1.75rem;
      }

      .partners-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      .partner-item {
        padding: 1rem;
      }

      .partner-logo img {
        max-width: 80px;
        max-height: 50px;
      }

      .partner-name {
        font-size: 1rem;
      }
    }
  `]
})
export class PartnersComponent {
  @Input() title: string = 'Nossos Parceiros';
  @Input() description: string = 'Empresas que confiam em nossas soluções';
  @Input() showPartnerNames: boolean = true;
  @Input() partners: Partner[] = [
    {
      id: 1,
      name: 'Dint Studio',
      logo: '/images/partners/parceiro-dint.jpg',
      website: 'https://dintstudio.com.br',
      description: 'Especialista em design para web e aplicativos'
    },
    {
      id: 2,
      name: 'Aelan Studio',
      logo: '/images/partners/parceiro-aelan-studio.png',
      website: 'https://www.aelanstudio.com/',
      description: 'Especialistas em aplicatiovos Mobile'
    },
    {
      id: 3,
      name: 'Host Azul',
      logo: '/images/partners/parceiro-hostazul.png',
      website: 'https://hostazul.com.br',
      description: 'Soluções em hospedagem de sites',
    },
    {
      id: 4,
      name: 'JMBA Soluções',
      logo: '/images/partners/parceiro-jmba.png',
      website: 'https://www.jmbasolucoes.com.br/',
      description: 'Inovação e confiança em soluções completas de TI',
    }
  ];

  openPartnerWebsite(website: string): void {
    window.open(website, '_blank', 'noopener,noreferrer');
  }

  onImageError(event: any): void {
    // Remove a imagem com erro e mostra o ícone
    event.target.style.display = 'none';
    const partnerItem = event.target.closest('.partner-item');
    const partnerIcon = partnerItem.querySelector('.partner-icon');
    if (partnerIcon) {
      partnerIcon.style.display = 'flex';
    }
  }
}
