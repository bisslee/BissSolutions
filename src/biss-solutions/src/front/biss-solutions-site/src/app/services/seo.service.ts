import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SchemaService } from './schema.service';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private baseUrl = 'https://biss.com.br';
  private defaultImage = '/images/favicon_io/android-chrome-192x192.png';

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document,
    private schemaService: SchemaService
  ) {}

  updateSEO(seoData: SEOData): void {
    // Update title
    this.title.setTitle(seoData.title);

    // Update meta description
    this.meta.updateTag({ name: 'description', content: seoData.description });

    // Update keywords if provided
    if (seoData.keywords) {
      this.meta.updateTag({ name: 'keywords', content: seoData.keywords });
    }

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: seoData.title });
    this.meta.updateTag({ property: 'og:description', content: seoData.description });
    this.meta.updateTag({ property: 'og:image', content: seoData.image || this.defaultImage });
    this.meta.updateTag({ property: 'og:url', content: seoData.url || this.baseUrl });
    this.meta.updateTag({ property: 'og:type', content: seoData.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Biss Solutions' });
    this.meta.updateTag({ property: 'og:locale', content: 'pt_BR' });

    // Twitter Cards
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seoData.title });
    this.meta.updateTag({ name: 'twitter:description', content: seoData.description });
    this.meta.updateTag({ name: 'twitter:image', content: seoData.image || this.defaultImage });
    this.meta.updateTag({ name: 'twitter:site', content: '@BissSolutions' });

    // Canonical URL
    this.updateCanonicalUrl(seoData.url);
  }

  updateSEOWithSchema(seoData: SEOData, addSchemas: boolean = true): void {
    this.updateSEO(seoData);
    
    if (addSchemas) {
      // Always add organization and website schemas
      this.schemaService.addOrganizationSchema();
      this.schemaService.addWebsiteSchema();
    }
  }

  // Método para preload de imagens críticas
  preloadCriticalImages(): void {
    const criticalImages = [
      '/images/favicon_io/android-chrome-192x192.png',
      '/images/services/development.jpg',
      '/images/services/consulting.jpg',
      '/images/services/analytics.jpg',
      '/images/services/cloud.jpg'
    ];

    criticalImages.forEach(src => {
      const link = this.document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      this.document.head.appendChild(link);
    });
  }

  private updateCanonicalUrl(url?: string): void {
    const canonicalUrl = url || this.baseUrl;
    
    // Remove existing canonical link
    const existingLink = this.document.querySelector('link[rel="canonical"]');
    if (existingLink) {
      existingLink.remove();
    }

    // Add new canonical link
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canonicalUrl);
    this.document.head.appendChild(link);
  }

  // Predefined SEO configurations for each page
  getHomeSEO(): SEOData {
    return {
      title: 'Desenvolvimento de Software | Biss Solutions - 20+ Anos de Experiência',
      description: 'Mais de 20 anos desenvolvendo soluções tecnológicas personalizadas. Desenvolvimento .NET, Angular, consultoria TI, cloud e segurança da informação em São Paulo.',
      keywords: 'desenvolvimento de software, consultoria TI, Angular, .NET, desenvolvimento web, São Paulo, transformação digital',
      url: this.baseUrl,
      type: 'website'
    };
  }

  getServicesSEO(): SEOData {
    return {
      title: 'Serviços de TI | Desenvolvimento .NET, Angular, Consultoria | Biss Solutions',
      description: 'Serviços completos em tecnologia: desenvolvimento de software, consultoria TI, soluções cloud, segurança da informação e suporte técnico especializado.',
      keywords: 'serviços TI, desenvolvimento software, consultoria tecnológica, cloud computing, segurança informação',
      url: `${this.baseUrl}/services`,
      type: 'website'
    };
  }

  getClientsSEO(): SEOData {
    return {
      title: 'Cases de Sucesso | Projetos Desenvolvidos | Biss Solutions',
      description: 'Conheça os cases de sucesso e projetos desenvolvidos pela Biss Solutions. Mais de 20 anos criando soluções tecnológicas para empresas de diversos setores.',
      keywords: 'cases de sucesso, projetos desenvolvidos, portfolio, clientes, desenvolvimento software',
      url: `${this.baseUrl}/clients`,
      type: 'website'
    };
  }

  getProductsSEO(): SEOData {
    return {
      title: 'Templates .NET Gratuitos | NuGet Packages | Produtos Open Source | Biss Solutions',
      description: 'Produtos gratuitos e open source: templates para microserviços .NET 9, bibliotecas de logging, e soluções para desenvolvedores. Downloads gratuitos no NuGet.',
      keywords: 'templates .NET, microserviços, NuGet packages, open source, bibliotecas .NET, desenvolvimento gratuito',
      url: `${this.baseUrl}/products`,
      type: 'website'
    };
  }

  getCompanySEO(): SEOData {
    return {
      title: 'Sobre a Biss Solutions | 20+ Anos Desenvolvendo Software | São Paulo',
      description: 'Conheça a Biss Solutions: mais de 20 anos de experiência em desenvolvimento de software, consultoria TI e transformação digital. Missão, visão e valores.',
      keywords: 'sobre Biss Solutions, empresa TI, história, missão, visão, valores, São Paulo',
      url: `${this.baseUrl}/company`,
      type: 'website'
    };
  }

  getContactSEO(): SEOData {
    return {
      title: 'Contato | Orçamento Desenvolvimento Software | Biss Solutions',
      description: 'Entre em contato com a Biss Solutions. Solicite orçamento para desenvolvimento de software, consultoria TI e soluções tecnológicas personalizadas.',
      keywords: 'contato Biss Solutions, orçamento desenvolvimento, consultoria TI, telefone, email, São Paulo',
      url: `${this.baseUrl}/contact`,
      type: 'website'
    };
  }

  getServiceDetailSEO(serviceName: string, description: string): SEOData {
    return {
      title: `${serviceName} | Serviço Especializado | Biss Solutions`,
      description: `${description} Mais de 20 anos de experiência. Entre em contato para orçamento personalizado.`,
      keywords: `${serviceName.toLowerCase()}, desenvolvimento software, consultoria TI, Biss Solutions`,
      url: `${this.baseUrl}/services/${serviceName.toLowerCase()}`,
      type: 'service'
    };
  }

  getAboutSEO(): SEOData {
    return {
      title: 'Tecnologias do Site | Angular 17, .NET, PWA | Biss Solutions',
      description: 'Conheça as tecnologias utilizadas no desenvolvimento deste site: Angular 17, PWA, SEO otimizado, design responsivo e arquitetura moderna.',
      keywords: 'tecnologias site, Angular 17, PWA, desenvolvimento web, arquitetura software, SEO',
      url: `${this.baseUrl}/about`,
      type: 'website'
    };
  }

  getPrivacySEO(): SEOData {
    return {
      title: 'Política de Privacidade | LGPD | Biss Solutions',
      description: 'Política de privacidade da Biss Solutions em conformidade com a LGPD. Como coletamos, usamos e protegemos suas informações pessoais.',
      keywords: 'política privacidade, LGPD, proteção dados, Biss Solutions',
      url: `${this.baseUrl}/privacy`,
      type: 'website'
    };
  }

  getTermsSEO(): SEOData {
    return {
      title: 'Termos de Uso | Condições de Serviço | Biss Solutions',
      description: 'Termos de uso e condições para utilização dos serviços da Biss Solutions. Leia nossos termos e condições antes de utilizar nossos serviços.',
      keywords: 'termos uso, condições serviço, Biss Solutions, termos contrato',
      url: `${this.baseUrl}/terms`,
      type: 'website'
    };
  }
}
