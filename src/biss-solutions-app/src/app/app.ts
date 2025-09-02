import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  HeaderComponent,
  FooterComponent,
  ContactFloatComponent,
  WhatsappFloatComponent,
  ContactFormData,
  ToasterComponent
} from './components';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ContactFloatComponent,
    WhatsappFloatComponent,
    ToasterComponent
  ],
  template: `
    <app-header (menuItemClick)="onMenuItemClick($event)"></app-header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <app-footer></app-footer>

    <!-- Botões Flutuantes -->
    <app-whatsapp-float
      phoneNumber="5511952729399"
      message="Olá! Gostaria de saber mais sobre os serviços da Biss Solutions."
    ></app-whatsapp-float>

    <app-contact-float
      (contactFormSubmit)="onContactFormSubmit($event)"
    ></app-contact-float>

    <!-- Toaster para mensagens -->
    <app-toaster></app-toaster>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 200px);
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    // Reset meta tags para valores padrão
    this.seoService.resetMetaTags();

    // Monitora mudanças de rota para atualizar SEO
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Track page view no Google Analytics
        this.seoService.trackEvent('page_view', 'navigation', event.urlAfterRedirects);
      });
  }

  onMenuItemClick(item: any): void {
    // Track menu clicks
    this.seoService.trackEvent('click', 'menu', item.label);
  }

  onContactFormSubmit(formData: ContactFormData): void {
    // Track form submissions
    this.seoService.trackEvent('form_submit', 'contact', 'contact_form');

    // Track LinkedIn conversion se configurado
    this.seoService.trackLinkedInConversion('515541083');
  }
}
