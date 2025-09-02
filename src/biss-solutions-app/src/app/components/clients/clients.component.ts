import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CLIENTS_DATA, CLIENTS_CONFIG } from './clients.config';

export interface ClientService {
  name: string;
  category: string;
}

export interface Client {
  id: number;
  name: string;
  logo: string;
  website?: string;
  description: string;
  version: string;
  services: ClientService[];
  projectImage?: string;
  projectImageAlt?: string;
}

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="clients-section">
      <div class="container">
        <div class="section-header" *ngIf="title || description">
          <h2 *ngIf="title" class="section-title">{{ title }}</h2>
          <p *ngIf="description" class="section-description">{{ description }}</p>
        </div>

        <div class="clients-grid">
          <div
            *ngFor="let client of clients"
            class="client-item"
            [class.has-project-image]="client.projectImage"
          >
            <div class="client-content">
              <div class="client-header">
                <div class="client-logo">
                  <img
                    [src]="client.logo"
                    [alt]="'Logo ' + client.name"
                    loading="lazy"
                    (error)="onImageError($event)"
                  />
                </div>
                <div class="client-info">
                  <h3 class="client-name">{{ client.name }}</h3>
                  <p class="client-version">{{ client.version }}</p>
                  <p class="client-description">{{ client.description }}</p>
                </div>
              </div>

              <div class="client-services">
                <h4 class="services-title">Serviços Prestados:</h4>
                <div class="services-tags">
                  <span
                    *ngFor="let service of client.services"
                    class="service-tag"
                    [class]="'service-' + service.category.toLowerCase().replace(' ', '-')"
                  >
                    {{ service.name }}
                  </span>
                </div>
              </div>

              <div class="client-project" *ngIf="client.projectImage">
                <h4 class="project-title">Projeto Realizado:</h4>
                <div class="project-image">
                  <img
                    [src]="client.projectImage"
                    [alt]="client.projectImageAlt || 'Projeto ' + client.name"
                    loading="lazy"
                    (error)="onProjectImageError($event)"
                  />
                </div>
              </div>
            </div>

            <div class="client-actions" *ngIf="client.website">
              <a
                [href]="client.website"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline"
                [attr.aria-label]="'Visitar site do ' + client.name"
              >
                <i class="fas fa-external-link-alt"></i>
                Visitar Site
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .clients-section {
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

    .clients-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .client-item {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      border: 2px solid transparent;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      min-height: 400px;
    }

    .client-item:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      border-color: #2563eb;
    }

    .client-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .client-header {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .client-logo {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      border-radius: 12px;
      background: #f3f4f6;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .client-logo img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 8px;
    }

    .client-info {
      flex: 1;
    }

    .client-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 0.5rem 0;
      line-height: 1.3;
    }

    .client-version {
      font-size: 0.875rem;
      color: #2563eb;
      background: #eff6ff;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      display: inline-block;
      margin: 0 0 0.75rem 0;
      font-weight: 600;
    }

    .client-description {
      color: #6b7280;
      line-height: 1.6;
      margin: 0;
      font-size: 0.95rem;
    }

    .client-services {
      margin-bottom: 1.5rem;
    }

    .services-title {
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
      margin: 0 0 1rem 0;
    }

    .services-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .service-tag {
      padding: 0.375rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      color: white;
      background: #6b7280;
    }

    .service-design { background: #8b5cf6; }
    .service-ux { background: #06b6d4; }
    .service-site { background: #10b981; }
    .service-apis { background: #f59e0b; }
    .service-integracao { background: #ef4444; }
    .service-player { background: #8b5cf6; }
    .service-banco-de-dados { background: #059669; }
    .service-hospedagem { background: #7c3aed; }
    .service-wordpress-instalacao { background: #0891b2; }
    .service-configuracao-de-template { background: #dc2626; }
    .service-migracao-de-servidor { background: #ea580c; }
    .service-sso { background: #be185d; }
    .service-aplicativo { background: #059669; }

    .client-project {
      margin-bottom: 1.5rem;
    }

    .project-title {
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
      margin: 0 0 1rem 0;
    }

    .project-image {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .project-image img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .client-item:hover .project-image img {
      transform: scale(1.05);
    }

    .client-actions {
      text-align: center;
      margin-top: auto;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.875rem;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      cursor: pointer;
    }

    .btn-outline {
      color: #2563eb;
      border-color: #2563eb;
      background: transparent;
    }

    .btn-outline:hover {
      color: white;
      background: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
    }

    .btn i {
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .clients-section {
        padding: 3rem 0;
      }

      .section-title {
        font-size: 2rem;
      }

      .section-description {
        font-size: 1rem;
      }

      .clients-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .client-item {
        padding: 1.5rem;
        min-height: 350px;
      }

      .client-header {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }

      .client-logo {
        align-self: center;
      }

      .client-name {
        font-size: 1.25rem;
      }
    }

    @media (max-width: 480px) {
      .clients-section {
        padding: 2rem 0;
      }

      .section-title {
        font-size: 1.75rem;
      }

      .client-item {
        padding: 1rem;
        min-height: 300px;
      }

      .client-logo {
        width: 60px;
        height: 60px;
      }

      .client-name {
        font-size: 1.125rem;
      }

      .services-tags {
        justify-content: center;
      }
    }
  `]
})
export class ClientsComponent {
  @Input() title: string = CLIENTS_CONFIG.defaultTitle;
  @Input() description: string = CLIENTS_CONFIG.defaultDescription;
  @Input() clients: Client[] = CLIENTS_DATA;

  onImageError(event: any): void {
    // Substitui a imagem com erro por um ícone
    const img = event.target;
    img.style.display = 'none';

    const logoContainer = img.parentElement;
    logoContainer.innerHTML = '<i class="fas fa-building" style="font-size: 2rem; color: #6b7280;"></i>';
  }

  onProjectImageError(event: any): void {
    // Substitui a imagem do projeto com erro por um placeholder
    const img = event.target;
    img.style.display = 'none';

    const projectContainer = img.parentElement;
    projectContainer.innerHTML = '<div style="height: 200px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; color: #9ca3af;"><i class="fas fa-image" style="font-size: 3rem;"></i></div>';
  }
}
