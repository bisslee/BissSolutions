import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InternalPageComponent, InternalPageData } from '../../components/internal-page/internal-page.component';

interface Product {
  id: string;
  name: string;
  description: string;
  type: 'nuget' | 'template' | 'library';
  category: string;
  price: 'free' | 'paid';
  downloadCount: number;
  lastUpdated: string;
  version: string;
  features: string[];
  nugetUrl: string;
  githubUrl?: string;
  documentationUrl?: string;
  tags: string[];
  icon: string;
  featured?: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, InternalPageComponent],
  template: `
    <app-internal-page [pageData]="pageData">
      <!-- Filtros e busca -->
      <section class="products-filters">
        <div class="container">
          <div class="filters-row">
            <div class="search-box">
              <input
                type="text"
                placeholder="Buscar produtos..."
                [(ngModel)]="searchTerm"
                (input)="filterProducts()"
                class="search-input"
              >
              <i class="search-icon">🔍</i>
            </div>

                        <div class="filter-selects">
              <div class="filter-select">
                <label for="type-select" class="filter-label">Tipo</label>
                <select
                  id="type-select"
                  [(ngModel)]="selectedType"
                  (change)="filterProducts()"
                  class="category-select"
                >
                  <option *ngFor="let type of productTypes" [value]="type">
                    {{ type }}
                  </option>
                </select>
              </div>

              <div class="filter-select">
                <label for="category-select" class="filter-label">Categoria</label>
                <select
                  id="category-select"
                  [(ngModel)]="selectedCategory"
                  (change)="filterProducts()"
                  class="category-select"
                >
                  <option *ngFor="let category of categories" [value]="category">
                    {{ category }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Lista de produtos -->
      <section class="products-grid">
        <div class="container">
          <div class="products-list">
            <div
              *ngFor="let product of filteredProducts"
              class="product-card"
              [class.featured]="product.featured"
            >
              <div class="product-header">
                <div class="product-icon">
                  <img [src]="product.icon" [alt]="product.name" class="icon-img">
                </div>
                <div class="product-badge" [class]="product.price">
                  {{ product.price === 'free' ? 'Gratuito' : 'Pago' }}
                </div>
              </div>

              <div class="product-content">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-description">{{ product.description }}</p>

                <div class="product-meta">
                  <span class="version">v{{ product.version }}</span>
                  <span class="downloads">{{ product.downloadCount.toLocaleString() }} downloads</span>
                  <span class="updated">Atualizado {{ product.lastUpdated }}</span>
                </div>

                <div class="product-features">
                  <span
                    *ngFor="let feature of product.features.slice(0, 3)"
                    class="feature-tag"
                  >
                    {{ feature }}
                  </span>
                </div>

                <div class="product-tags">
                  <span
                    *ngFor="let tag of product.tags.slice(0, 4)"
                    class="tag"
                  >
                    {{ tag }}
                  </span>
                </div>

                <!-- Destaques especiais para o template -->
                <div *ngIf="product.id === 'biss-microservice-template'" class="product-highlights">
                  <div class="highlight-item">
                    <span class="highlight-icon">⚡</span>
                    <span class="highlight-text">73% melhoria no tempo de resposta</span>
                  </div>
                  <div class="highlight-item">
                    <span class="highlight-icon">🛡️</span>
                    <span class="highlight-text">Rate limiting e security headers</span>
                  </div>
                  <div class="highlight-item">
                    <span class="highlight-icon">📊</span>
                    <span class="highlight-text">Health checks e observabilidade</span>
                  </div>
                </div>

                <!-- Destaques para o logger -->
                <div *ngIf="product.id === 'biss-multisink-logger'" class="product-highlights">
                  <div class="highlight-item">
                    <span class="highlight-icon">📝</span>
                    <span class="highlight-text">Suporte a 12+ destinos de log</span>
                  </div>
                  <div class="highlight-item">
                    <span class="highlight-icon">🔧</span>
                    <span class="highlight-text">Configuração via appsettings.json</span>
                  </div>
                  <div class="highlight-item">
                    <span class="highlight-icon">📱</span>
                    <span class="highlight-text">Integração com Serilog</span>
                  </div>
                </div>
              </div>

              <div class="product-actions">
                <a
                  [href]="product.nugetUrl"
                  target="_blank"
                  class="btn btn-primary"
                >
                  <i class="nuget-icon">📦</i>
                  Instalar via NuGet
                </a>

                <div class="secondary-actions">
                  <a
                    *ngIf="product.documentationUrl"
                    [href]="product.documentationUrl"
                    target="_blank"
                    class="btn btn-secondary"
                  >
                    📚 Documentação
                  </a>
                  <a
                    *ngIf="product.githubUrl"
                    [href]="product.githubUrl"
                    target="_blank"
                    class="btn btn-secondary"
                  >
                    🐙 GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Mensagem quando não há produtos -->
          <div *ngIf="filteredProducts.length === 0" class="no-products">
            <div class="no-products-content">
              <i class="no-products-icon">🔍</i>
              <h3>Nenhum produto encontrado</h3>
              <p>Tente ajustar os filtros ou termos de busca</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA para desenvolvedores -->
      <section class="products-cta">
        <div class="container">
          <div class="cta-content">
            <h2>Contribua com a Comunidade</h2>
            <p>
              Todos os nossos produtos são de código aberto e gratuitos.
              Contribua com issues, pull requests ou sugestões!
            </p>
            <div class="cta-buttons">
              <a href="https://github.com/biss-solutions" target="_blank" class="btn btn-primary">
                🐙 Ver no GitHub
              </a>
              <a href="/contato" class="btn btn-secondary">
                💬 Sugerir Produto
              </a>
            </div>
          </div>
        </div>
      </section>
    </app-internal-page>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .products-filters {
      background: white;
      padding: 2rem 0;
      border-bottom: 1px solid #e2e8f0;
    }

    .filters-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
    }

    .search-box {
      position: relative;
      flex: 1;
      max-width: 400px;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 2px solid #e2e8f0;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #64748b;
    }

    .filter-selects {
      display: flex;
      gap: 1rem;
    }

    .filter-select {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .filter-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.25rem;
    }

    .category-select {
      padding: 0.75rem 1rem;
      border: 2px solid #e2e8f0;
      background: white;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.875rem;
      min-width: 150px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
      padding-right: 2.5rem;
    }

    .category-select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .category-select:hover {
      border-color: #3b82f6;
    }

    .products-grid {
      padding: 3rem 0;
      background: #f8fafc;
    }

    .products-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .product-card {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      border: 1px solid #e2e8f0;
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    .product-card.featured {
      border: 2px solid #3b82f6;
      background: linear-gradient(135deg, #f8fafc, #eff6ff);
    }

    .product-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .product-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    .product-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .product-badge.free {
      background: #dcfce7;
      color: #166534;
    }

    .product-badge.paid {
      background: #fef3c7;
      color: #92400e;
    }

    .product-content {
      margin-bottom: 1.5rem;
    }

    .product-name {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: #1e293b;
    }

    .product-description {
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .product-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: #64748b;
    }

    .product-features {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    .feature-tag {
      background: #eff6ff;
      color: #1e40af;
      padding: 0.25rem 0.5rem;
      border-radius: 0.375rem;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .product-tags {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    .tag {
      background: #f1f5f9;
      color: #475569;
      padding: 0.25rem 0.5rem;
      border-radius: 0.375rem;
      font-size: 0.75rem;
    }

    .product-highlights {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }

    .highlight-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #eff6ff;
      color: #1e40af;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .highlight-icon {
      font-size: 1rem;
    }

    .highlight-text {
      font-size: 0.875rem;
    }

    .product-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      text-align: center;
      justify-content: center;
    }

    .btn-primary {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
    }

    .btn-secondary {
      background: #f8fafc;
      color: #475569;
      border: 1px solid #e2e8f0;
    }

    .btn-secondary:hover {
      background: #e2e8f0;
      color: #1e293b;
    }

    .secondary-actions {
      display: flex;
      gap: 0.5rem;
    }

    .secondary-actions .btn {
      flex: 1;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    .no-products {
      text-align: center;
      padding: 4rem 0;
    }

    .no-products-content {
      max-width: 400px;
      margin: 0 auto;
    }

    .no-products-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      display: block;
    }

    .no-products h3 {
      color: #64748b;
      margin-bottom: 0.5rem;
    }

    .no-products p {
      color: #94a3b8;
    }

    .products-cta {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: white;
      padding: 4rem 0;
      text-align: center;
    }

    .cta-content h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #60a5fa, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .cta-content p {
      font-size: 1.125rem;
      color: #cbd5e1;
      max-width: 600px;
      margin: 0 auto 2rem;
      line-height: 1.6;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* Responsividade */
    @media (max-width: 768px) {
      .filters-row {
        flex-direction: column;
        gap: 1rem;
      }

      .search-box {
        max-width: 100%;
      }

      .filter-selects {
        flex-direction: column;
        gap: 0.5rem;
      }

      .products-list {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .product-card {
        padding: 1.5rem;
      }

      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }

      .cta-content h2 {
        font-size: 2rem;
      }
    }
  `]
})
export class ProductsComponent {
  searchTerm: string = '';
  selectedType: string = 'Todos';
  selectedCategory: string = 'Todos';

  productTypes: string[] = ['Todos', 'NuGet', 'Templates', 'Bibliotecas'];
  categories: string[] = ['Todos', 'Logging', 'Microserviços', 'Performance', 'Segurança'];

  pageData: InternalPageData = {
    title: 'Nossos Produtos',
    subtitle: 'Soluções de código aberto e gratuitas para a comunidade .NET',
    backgroundImage: '/images/products/banner.jpg',
    breadcrumbItems: [
      { label: 'Home', route: '/home' },
      { label: 'Produtos', route: '/produtos' }
    ]
  };

  products: Product[] = [
    {
      id: 'biss-multisink-logger',
      name: 'Biss.MultiSinkLogger',
      description: 'Biblioteca completa para logging em aplicações .NET com suporte a múltiplos destinos (Console, File, SQL Server, MongoDB, CosmosDB, PostgreSQL, MySQL, SQLite, RabbitMQ, Sentry, Slack, NewRelic e mais).',
      type: 'nuget',
      category: 'Logging',
      price: 'free',
      downloadCount: 256,
      lastUpdated: '27/01/2025',
      version: '1.0.1',
      features: ['Multi-destino', 'Serilog', 'Performance', 'Configurável'],
      nugetUrl: 'https://www.nuget.org/packages/Biss.MultiSinkLogger',
      documentationUrl: 'https://www.nuget.org/packages/Biss.MultiSinkLogger',
      tags: ['logging', 'serilog', 'dotnet', 'Biss'],
      icon: '/images/products/MultiSinkLogger-Transparent-logo.png'
    },
    {
      id: 'biss-microservice-template',
      name: 'Biss.Solutions.MicroService.Template.Net9',
      description: 'Template completo para criação de microserviços em .NET 9 com Clean Architecture, CQRS, Domain-Driven Design, Specification Pattern e otimizações avançadas de performance. Inclui cache em memória, compressão de resposta, rate limiting e health checks.',
      type: 'template',
      category: 'Microserviços',
      price: 'free',
      downloadCount: 380,
      lastUpdated: '29/07/2025',
      version: '2.1.0',
      features: ['Clean Architecture', 'CQRS', 'DDD', 'Performance'],
      nugetUrl: 'https://www.nuget.org/packages/Biss.Solutions.MicroService.Template.Net9/',
      documentationUrl: 'https://www.nuget.org/packages/Biss.Solutions.MicroService.Template.Net9/',
      tags: ['c#', 'dotnet', 'api', 'microservice', 'template', 'clean architecture', 'cqrs', 'mediatr', 'fluentvalidation', 'swagger', 'efcore', 'test', 'xunit', 'performance', 'caching', 'compression', 'security', 'rate-limiting', 'structured-logging', 'observability'],
      icon: '/images/products/Template-API-logo.png'
    }
  ];

  filteredProducts: Product[] = this.products;

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(this.searchTerm.toLowerCase()));

      const matchesType = this.selectedType === 'Todos' ||
        (this.selectedType === 'NuGet' && product.type === 'nuget') ||
        (this.selectedType === 'Templates' && product.type === 'template') ||
        (this.selectedType === 'Bibliotecas' && product.type === 'library');
      const matchesCategory = this.selectedCategory === 'Todos' || product.category === this.selectedCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }


}
