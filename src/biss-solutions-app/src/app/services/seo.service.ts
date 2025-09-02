import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SEOMetaData {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private title: Title
  ) { }

  /**
   * Atualiza as meta tags da página
   */
  updateMetaTags(metaData: SEOMetaData): void {
    // Title da página
    this.title.setTitle(metaData.title);

    // Meta tags básicas
    this.meta.updateTag({ name: 'description', content: metaData.description });
    if (metaData.keywords) {
      this.meta.updateTag({ name: 'keywords', content: metaData.keywords });
    }
    if (metaData.author) {
      this.meta.updateTag({ name: 'author', content: metaData.author });
    }

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: metaData.ogTitle || metaData.title });
    this.meta.updateTag({ property: 'og:description', content: metaData.ogDescription || metaData.description });
    if (metaData.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: metaData.ogImage });
    }
    if (metaData.ogUrl) {
      this.meta.updateTag({ property: 'og:url', content: metaData.ogUrl });
    }

    // Canonical URL
    if (metaData.canonicalUrl) {
      this.updateCanonicalUrl(metaData.canonicalUrl);
    }

    // Google Analytics - Page View
    this.trackPageView(metaData.title);
  }

  /**
   * Atualiza a URL canônica
   */
  private updateCanonicalUrl(url: string): void {
    // Remove canonical existente
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Adiciona nova canonical
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = url;
    document.head.appendChild(canonical);
  }

  /**
   * Track page view no Google Analytics
   */
  private trackPageView(pageTitle: string): void {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'G-2GXS114MJC', {
        'page_title': pageTitle,
        'page_location': window.location.href,
        'custom_map': {
          'dimension1': 'user_type',
          'dimension2': 'service_category'
        }
      });
    }
  }

  /**
   * Track eventos customizados
   */
  trackEvent(action: string, category: string, label?: string, value?: number): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value
      });
    }
  }

  /**
   * Track conversões (Google Ads)
   */
  trackConversion(conversionId: string, conversionLabel: string): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        'send_to': `AW-${conversionId}/${conversionLabel}`
      });
    }
  }

  /**
   * Track LinkedIn conversions
   */
  trackLinkedInConversion(conversionId: string): void {
    if (typeof lintrk !== 'undefined') {
      lintrk('track', { conversion_id: conversionId });
    }
  }

  /**
   * Reset meta tags para valores padrão
   */
  resetMetaTags(): void {
    const defaultMeta: SEOMetaData = {
      title: 'Biss Solutions - Especialistas em Desenvolvimento de Software e Soluções em TI',
      description: 'Biss Solutions - Especializada em criar, otimizar e evoluir processos e sistemas com soluções ágeis e inovadoras. Desenvolvimento de software, sites web, aplicações web, soluções em cloud, consultoria em TI, segurança da informação e suporte técnico 24/7.',
      keywords: 'Biss Solutions, desenvolvimento de software, sites web, aplicações web, soluções em cloud, consultoria em TI, segurança da informação, suporte técnico, otimização de processos, desenvolvimento ágil, São Paulo, Brasil',
      author: 'Biss Solutions',
      ogTitle: 'Biss Solutions - Especialistas em Desenvolvimento de Software e Soluções em TI',
      ogDescription: 'Especializada em criar, otimizar e evoluir processos e sistemas com soluções ágeis e inovadoras. Desenvolvimento de software, sites web, aplicações web e soluções em cloud.',
      ogUrl: 'https://biss.com.br'
    };

    this.updateMetaTags(defaultMeta);
  }
}
