import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent, MenuItem } from '../menu/menu.component';
import { SocialComponent } from '../social/social.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenuComponent, SocialComponent],
  template: `
    <header class="header">
      <!-- Top Bar -->
      <div class="top-bar">
        <div class="container">
          <div class="top-bar-content">
            <div class="contact-info">
              <span>
                <i class="fas fa-phone"></i>
                (11) 95273-9399
              </span>
              <span>
                <i class="fas fa-envelope"></i>
                contato@biss.com.br
              </span>
              <span>
                <i class="fas fa-clock"></i>
                Seg-Sex: 8h às 18h
              </span>
            </div>
            <app-social></app-social>
          </div>
        </div>
      </div>

      <!-- Main Navigation -->
      <div class="header-main">
        <div class="container">
          <div class="header-content">
            <div class="logo">
              <a routerLink="/" [attr.aria-label]="'Ir para página inicial'">
                <img src="/images/logo-tech-azul.png" alt="Biss Solutions" />
              </a>
            </div>

            <app-menu
              [isMenuOpen]="isMenuOpen"
              [style]="'header'"
              (menuItemClick)="onMenuItemClick($event)"
            ></app-menu>

            <button
              class="nav-toggle"
              [class.active]="isMenuOpen"
              (click)="toggleMenu()"
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: white;
    }

    .top-bar {
      background: #0f172a;
      color: white;
      padding: 0.5rem 0;
      font-size: 0.875rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .top-bar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .contact-info {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    .contact-info span {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .contact-info i {
      font-size: 0.75rem;
      opacity: 0.8;
    }

    .header-main {
      background: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 1rem 0;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }



    .logo a {
      display: block;
      text-decoration: none;
      transition: opacity 0.3s ease;
    }

    .logo a:hover {
      opacity: 0.8;
    }

    .logo img {
      height: 60px;
      width: auto;
      object-fit: contain;
    }

    .nav-toggle {
      display: none;
      flex-direction: column;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      gap: 4px;
    }

    .nav-toggle span {
      width: 25px;
      height: 3px;
      background: #1e40af;
      transition: all 0.3s ease;
      border-radius: 2px;
    }

    .nav-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .nav-toggle.active span:nth-child(2) {
      opacity: 0;
    }

    .nav-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }

    @media (max-width: 768px) {
      .top-bar-content {
        flex-direction: column;
        gap: 0.75rem;
        text-align: center;
      }

      .contact-info {
        flex-direction: column;
        gap: 0.5rem;
      }

      .contact-info span {
        font-size: 0.75rem;
      }

      .nav-toggle {
        display: flex;
      }

      .logo img {
        height: 50px;
      }
    }

    @media (max-width: 480px) {
      .top-bar {
        padding: 0.375rem 0;
      }

      .header-main {
        padding: 0.75rem 0;
      }

      .logo img {
        height: 45px;
      }

      .contact-info span {
        font-size: 0.6875rem;
      }
    }
  `]
})
export class HeaderComponent {
  @Output() menuItemClick = new EventEmitter<MenuItem>();

  isMenuOpen: boolean = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onMenuItemClick(item: MenuItem): void {
    this.menuItemClick.emit(item);
    this.isMenuOpen = false; // Fecha o menu mobile após clicar
  }
}
