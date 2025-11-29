import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  contactPoint: {
    "@type": string;
    telephone: string;
    email: string;
    contactType: string;
  };
  sameAs: string[];
}

export interface ServiceSchema {
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  hasOfferCatalog: {
    name: string;
    itemListElement: Array<{
      name: string;
      description: string;
    }>;
  };
}

export interface WebsiteSchema {
  name: string;
  url: string;
  description: string;
  inLanguage: string;
  isPartOf: string;
}

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private baseUrl = 'https://biss.com.br';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public addJsonLd(jsonLd: any, id: string): void {
    // Remove existing schema with same ID
    const existingScript = this.document.getElementById(id);
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script element
    const script = this.document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    
    // Add to head
    this.document.head.appendChild(script);
  }

  addOrganizationSchema(): void {
    const organizationSchema: OrganizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Biss Solutions",
      "url": this.baseUrl,
      "logo": `${this.baseUrl}/images/favicon_io/android-chrome-192x192.png`,
      "description": "Mais de 20 anos desenvolvendo soluções tecnológicas personalizadas. Desenvolvimento de software, consultoria TI, cloud computing e segurança da informação.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rua Avanhandava, 459 - Cj 512",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "addressCountry": "BR"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-11-95273-9399",
        "email": "contato@biss.com.br",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://linkedin.com/company/bisssolutions",
        "https://github.com/biss-solutions"
      ]
    };

    this.addJsonLd(organizationSchema, 'organization-schema');
  }

  addServiceSchema(): void {
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Desenvolvimento de Software e Consultoria TI",
      "description": "Serviços completos em tecnologia da informação: desenvolvimento de software personalizado, consultoria em TI, soluções cloud, segurança da informação e suporte técnico.",
      "provider": {
        "@type": "Organization",
        "name": "Biss Solutions",
        "url": this.baseUrl
      },
      "areaServed": {
        "@type": "Country",
        "name": "Brasil"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Serviços de TI",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Desenvolvimento de Software",
              "description": "Soluções personalizadas em .NET, Angular, Python e tecnologias modernas"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Consultoria em TI",
              "description": "Análise estratégica e otimização de processos para transformação digital"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Soluções em Cloud",
              "description": "Migração e gerenciamento de infraestrutura na nuvem"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Segurança da Informação",
              "description": "Proteção e compliance para dados e aplicações"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Suporte Técnico",
              "description": "Suporte especializado 24/7 para aplicações"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Analytics e BI",
              "description": "Transformação de dados em insights para tomada de decisões"
            }
          }
        ]
      }
    };

    this.addJsonLd(serviceSchema, 'service-schema');
  }

  addWebsiteSchema(): void {
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Biss Solutions",
      "url": this.baseUrl,
      "description": "Site oficial da Biss Solutions - Desenvolvimento de software e consultoria em TI",
      "inLanguage": "pt-BR",
      "isPartOf": {
        "@type": "Organization",
        "name": "Biss Solutions"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${this.baseUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };

    this.addJsonLd(websiteSchema, 'website-schema');
  }

  addBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>): void {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };

    this.addJsonLd(breadcrumbSchema, 'breadcrumb-schema');
  }

  addFAQSchema(faqs: Array<{question: string, answer: string}>): void {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    this.addJsonLd(faqSchema, 'faq-schema');
  }

  addProductSchema(productName: string, description: string, downloadUrl: string): void {
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": productName,
      "description": description,
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": ".NET",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock"
      },
      "downloadUrl": downloadUrl,
      "author": {
        "@type": "Organization",
        "name": "Biss Solutions",
        "url": this.baseUrl
      },
      "softwareVersion": "Latest",
      "datePublished": "2024-01-01"
    };

    this.addJsonLd(productSchema, 'product-schema');
  }

  addLocalBusinessSchema(): void {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${this.baseUrl}/#organization`,
      "name": "Biss Solutions - Desenvolvimento de Software em São Paulo",
      "alternateName": "Biss Solutions Software",
      "image": `${this.baseUrl}/images/favicon_io/android-chrome-192x192.png`,
      "telephone": "+55-11-95273-9399",
      "email": "contato@biss.com.br",
      "description": "Empresa de desenvolvimento de software com mais de 20 anos de experiência em São Paulo, SP. Especialistas em Angular, .NET, Python, cloud computing e consultoria em TI.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rua Avanhandava, 459 - Cj 512",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "postalCode": "01311-000",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-23.5454",
        "longitude": "-46.6333"
      },
      "url": this.baseUrl,
      "priceRange": "R$ $",
      "openingHours": [
        "Mo-Fr 09:00-19:00"
      ],
      "currenciesAccepted": "BRL",
      "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
      "areaServed": [
        {
          "@type": "City",
          "name": "São Paulo",
          "containedIn": {
            "@type": "State",
            "name": "São Paulo"
          }
        },
        {
          "@type": "Country",
          "name": "Brasil"
        }
      ],
      "serviceType": [
        "Desenvolvimento de Software",
        "Consultoria em TI",
        "Soluções em Cloud",
        "Desenvolvimento .NET",
        "Desenvolvimento Angular"
      ],
      "keywords": "desenvolvimento de software São Paulo, empresa de TI SP, consultoria TI São Paulo, desenvolvimento .NET SP, Angular São Paulo"
    };

    this.addJsonLd(localBusinessSchema, 'local-business-schema');
  }

  // Method to add all essential schemas
  addAllSchemas(): void {
    this.addOrganizationSchema();
    this.addWebsiteSchema();
    this.addServiceSchema();
    this.addLocalBusinessSchema();
  }

  // Method to remove all schemas
  removeAllSchemas(): void {
    const schemaIds = [
      'organization-schema',
      'service-schema',
      'website-schema',
      'breadcrumb-schema',
      'faq-schema',
      'product-schema',
      'local-business-schema'
    ];

    schemaIds.forEach(id => {
      const script = this.document.getElementById(id);
      if (script) {
        script.remove();
      }
    });
  }
}
