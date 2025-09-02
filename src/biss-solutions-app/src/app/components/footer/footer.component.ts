import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SocialComponent } from '../social/social.component';
import { MenuComponent, MenuItem } from '../menu/menu.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, SocialComponent, MenuComponent],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-logo">
              <a routerLink="/" [attr.aria-label]="'Ir para página inicial'">
                <img src="/images/logo-tech-cinza.png" alt="Biss Solutions">
              </a>
            </div>
            <div class="footer-info">
              <p><i class="ri-map-pin-line"></i> Rua Avanhandava, 459 - Cj 512<br>São Paulo - SP</p>
              <p><i class="ri-phone-line"></i> +55 11 9573-9399</p>
              <p><i class="ri-mail-line"></i> contato@biss.com.br</p>
              <p><i class="ri-time-line"></i> Seg-Sex 10:00-20:00</p>
            </div>
          </div>
          <div class="footer-section">
            <h3>Links Rápidos</h3>
            <app-menu
              [style]="'footer'"
              (menuItemClick)="onMenuItemClick($event)"
            ></app-menu>
          </div>
          <div class="footer-section">
            <h3>Redes Sociais</h3>
            <app-social class="social-links-footer"></app-social>
            <div class="footer-links">
              <a routerLink="/sobre">Sobre o Site</a>&nbsp;
              <a routerLink="/privacy">Política de Privacidade</a>&nbsp;
              <a routerLink="/terms">Termos de Uso</a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <p>&copy; 2025 Biss Solutions. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1e293b;
      color: white;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 3rem;
      padding: 3rem 0;
    }

    .footer-section h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #f8fafc;
    }

    .footer-logo a {
      display: block;
      text-decoration: none;
      transition: opacity 0.3s ease;
    }

    .footer-logo a:hover {
      opacity: 0.8;
    }

    .footer-logo img {
      height: 80px;
      width: auto;
      margin-bottom: 1rem;
      object-fit: contain;
    }

    .footer-info p {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      line-height: 1.5;
      color: #cbd5e1;
    }

    .footer-info i {
      color: #64748b;
      width: 16px;
      margin-top: 0.125rem;
    }

    .footer-links {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .footer-links li {
      margin-bottom: 0.75rem;
    }

    .footer-links a {
      color: #cbd5e1;
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: #f8fafc;
    }

    .social-links-footer {
      margin-bottom: 1.5rem;
    }

    .footer-bottom {
      background: #0f172a;
      padding: 1.5rem 0;
      border-top: 1px solid #334155;
      text-align: center;
    }

    .footer-bottom p {
      margin: 0;
      color: #64748b;
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 2rem 0;
      }

      .footer-section h3 {
        font-size: 1.125rem;
        margin-bottom: 1rem;
      }

      .footer-logo img {
        height: 70px;
      }

      .footer-info p {
        font-size: 0.8125rem;
        margin-bottom: 0.75rem;
      }
    }

    @media (max-width: 480px) {
      .footer-content {
        padding: 1.5rem 0;
      }

      .footer-section h3 {
        font-size: 1rem;
      }

      .footer-logo img {
        height: 60px;
      }

      .footer-info p {
        font-size: 0.75rem;
      }

      .footer-bottom {
        padding: 1rem 0;
      }
    }
  `]
})
export class FooterComponent {
  onMenuItemClick(item: MenuItem): void {
    // Aqui você pode adicionar lógica adicional se necessário
    console.log('Footer menu item clicked:', item);
  }
}
