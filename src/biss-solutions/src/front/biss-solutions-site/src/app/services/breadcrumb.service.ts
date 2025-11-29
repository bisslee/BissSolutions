import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface BreadcrumbItem {
  label: string;
  url: string;
  isActive?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<BreadcrumbItem[]>([]);
  public breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor() {}

  // Definir breadcrumbs para uma página
  setBreadcrumbs(items: BreadcrumbItem[]): void {
    this.breadcrumbsSubject.next(items);
  }

  // Adicionar item ao breadcrumb atual
  addBreadcrumb(item: BreadcrumbItem): void {
    const currentBreadcrumbs = this.breadcrumbsSubject.value;
    this.breadcrumbsSubject.next([...currentBreadcrumbs, item]);
  }

  // Limpar breadcrumbs
  clearBreadcrumbs(): void {
    this.breadcrumbsSubject.next([]);
  }

  // Breadcrumbs pré-definidos para páginas específicas
  getBreadcrumbsForPage(route: string): BreadcrumbItem[] {
    const baseBreadcrumb: BreadcrumbItem = {
      label: 'Home',
      url: '/'
    };

    switch (route) {
      case 'company':
        return [
          baseBreadcrumb,
          { label: 'Empresa', url: '/company', isActive: true }
        ];

      case 'services':
        return [
          baseBreadcrumb,
          { label: 'Serviços', url: '/services', isActive: true }
        ];

      case 'services/development':
        return [
          baseBreadcrumb,
          { label: 'Serviços', url: '/services' },
          { label: 'Desenvolvimento', url: '/services/development', isActive: true }
        ];

      case 'services/consulting':
        return [
          baseBreadcrumb,
          { label: 'Serviços', url: '/services' },
          { label: 'Consultoria', url: '/services/consulting', isActive: true }
        ];

      case 'services/cloud':
        return [
          baseBreadcrumb,
          { label: 'Serviços', url: '/services' },
          { label: 'Cloud', url: '/services/cloud', isActive: true }
        ];

      case 'services/security':
        return [
          baseBreadcrumb,
          { label: 'Serviços', url: '/services' },
          { label: 'Segurança', url: '/services/security', isActive: true }
        ];

      case 'services/support':
        return [
          baseBreadcrumb,
          { label: 'Serviços', url: '/services' },
          { label: 'Suporte', url: '/services/support', isActive: true }
        ];

      case 'services/analytics':
        return [
          baseBreadcrumb,
          { label: 'Serviços', url: '/services' },
          { label: 'Analytics', url: '/services/analytics', isActive: true }
        ];

      case 'services/hosting':
        return [
          baseBreadcrumb,
          { label: 'Serviços', url: '/services' },
          { label: 'Hospedagem', url: '/services/hosting', isActive: true }
        ];

      case 'services/landing-pages':
        return [
          baseBreadcrumb,
          { label: 'Serviços', url: '/services' },
          { label: 'Landing Pages', url: '/services/landing-pages', isActive: true }
        ];

      case 'services/pacote-completo':
        return [
          baseBreadcrumb,
          { label: 'Serviços', url: '/services' },
          { label: 'Pacote Completo', url: '/services/pacote-completo', isActive: true }
        ];

      case 'products':
        return [
          baseBreadcrumb,
          { label: 'Produtos', url: '/products', isActive: true }
        ];

      case 'clients':
        return [
          baseBreadcrumb,
          { label: 'Clientes', url: '/clients', isActive: true }
        ];

      case 'contact':
        return [
          baseBreadcrumb,
          { label: 'Contato', url: '/contact', isActive: true }
        ];

      case 'about':
        return [
          baseBreadcrumb,
          { label: 'Sobre', url: '/about', isActive: true }
        ];

      case 'privacy':
        return [
          baseBreadcrumb,
          { label: 'Política de Privacidade', url: '/privacy', isActive: true }
        ];

      case 'terms':
        return [
          baseBreadcrumb,
          { label: 'Termos de Uso', url: '/terms', isActive: true }
        ];

      default:
        return [baseBreadcrumb];
    }
  }

  // Gerar Schema.org JSON-LD para breadcrumbs
  generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: `https://biss.com.br${item.url}`
      }))
    };
  }
}
