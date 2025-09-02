import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface MenuItem {
  label: string;
  route: string;
  children?: MenuItem[];
}

export type MenuStyle = 'header' | 'footer';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="nav" [class.menu-open]="isMenuOpen">
      <ul class="nav-menu" [ngClass]="{
        'nav-menu-header': style === 'header',
        'nav-menu-footer': style === 'footer'
      }">
        <li *ngFor="let item of menuItems">
          <a
            [routerLink]="item.route"
            routerLinkActive="active"
            class="nav-link"
            [ngClass]="{
              'nav-link-header': style === 'header',
              'nav-link-footer': style === 'footer'
            }"
            (click)="onMenuItemClick(item)"
          >
            {{ item.label }}
          </a>
          <ul *ngIf="item.children && item.children.length > 0" class="submenu">
            <li *ngFor="let child of item.children">
              <a
                [routerLink]="child.route"
                routerLinkActive="active"
                class="nav-link"
                [ngClass]="{
                  'nav-link-header': style === 'header',
                  'nav-link-footer': style === 'footer'
                }"
                (click)="onMenuItemClick(child)"
              >
                {{ child.label }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    /* Estilos base do menu */
    .nav-menu {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-menu li {
      margin: 0;
    }

    .nav-link {
      text-decoration: none;
      transition: color 0.3s ease;
      position: relative;
      display: block;
    }

    /* Estilos específicos para header */
    .nav-menu-header {
      display: flex;
      align-items: center;
    }

    .nav-menu-header li {
      margin-left: 30px;
    }

    .nav-menu-header li:first-child {
      margin-left: 0;
    }

    .nav-link-header {
      color: #1e293b;
      font-weight: 500;
      padding: 0.5rem 0;
    }

    .nav-link-header:hover,
    .nav-link-header.active {
      color: #2563eb;
    }

    .nav-link-header::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background: #2563eb;
      transition: width 0.3s ease;
    }

    .nav-link-header:hover::after,
    .nav-link-header.active::after {
      width: 100%;
    }

    /* Estilos específicos para footer */
    .nav-menu-footer {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .nav-menu-footer li {
      margin-bottom: 0.75rem;
      width: 100%;
    }

    .nav-link-footer {
      color: #cbd5e1;
      font-weight: 400;
      font-size: 0.875rem;
      padding: 0;
    }

    .nav-link-footer:hover {
      color: #f8fafc;
    }

    /* Responsividade */
    @media (max-width: 768px) {
      .nav-menu-header {
        position: fixed;
        top: 80px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 80px);
        background: white;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 50px;
        transition: left 0.3s ease;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        z-index: 1000;
      }

      .nav-menu-header.active {
        left: 0;
      }

      .nav-menu-header li {
        margin: 20px 0;
      }

      .nav-link-header {
        padding: 1rem;
        border-bottom: 1px solid #f3f4f6;
        border-radius: 0;
      }

      /* Footer menu não precisa de estilos mobile especiais */
      .nav-menu-footer {
        position: static;
        background: transparent;
        box-shadow: none;
        padding: 0;
        height: auto;
        width: auto;
        left: 0;
      }

      .nav-menu-footer li {
        margin-bottom: 0.75rem;
      }

      .nav-link-footer {
        padding: 0;
        border-bottom: none;
      }
    }
  `]
})
export class MenuComponent implements OnInit {
  @Input() menuItems: MenuItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Empresa', route: '/empresa' },
    { label: 'Clientes', route: '/clients' },
    { label: 'Produtos', route: '/produtos' },
    { label: 'Serviços', route: '/servicos' },
    { label: 'Sobre', route: '/sobre' },
    // { label: 'Notícias', route: '/noticias' },
    // { label: 'Blog', route: '/blog' },
    { label: 'Contato', route: '/contato' }
  ];

  @Input() isMenuOpen: boolean = false;
  @Input() style: MenuStyle = 'header';
  @Output() menuItemClick = new EventEmitter<MenuItem>();

  ngOnInit() {
    console.log('MenuComponent initialized with style:', this.style);
  }

  onMenuItemClick(item: MenuItem): void {
    this.menuItemClick.emit(item);
  }
}
