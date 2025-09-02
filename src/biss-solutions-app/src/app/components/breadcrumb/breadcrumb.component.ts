import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  route?: string;
  active?: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol class="breadcrumb-list">
        <li
          *ngFor="let item of breadcrumbItems; let first = first; let last = last"
          class="breadcrumb-item"
          [class.active]="item.active || last"
        >
          <ng-container *ngIf="item.route && !last; else textOnly">
            <a [routerLink]="item.route" class="breadcrumb-link">
              <i *ngIf="first" class="ri-home-line"></i>
              {{ item.label }}
            </a>
          </ng-container>
          <ng-template #textOnly>
            <span class="breadcrumb-text">
              <i *ngIf="first" class="ri-home-line"></i>
              {{ item.label }}
            </span>
          </ng-template>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb {
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      padding: 1rem 0;
    }

    .breadcrumb-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .breadcrumb-item {
      display: flex;
      align-items: center;
      color: #64748b;
      font-size: 0.875rem;
    }

    .breadcrumb-item:not(:last-child)::after {
      content: '/';
      margin-left: 0.5rem;
      color: #cbd5e1;
      font-weight: 300;
    }

    .breadcrumb-link {
      color: #2563eb;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .breadcrumb-link:hover {
      color: #1d4ed8;
      background-color: rgba(37, 99, 235, 0.1);
      text-decoration: underline;
    }

    .breadcrumb-link i {
      font-size: 0.75rem;
    }

    .breadcrumb-text {
      color: #374151;
      font-weight: 500;
      padding: 0.25rem 0.5rem;
    }

    .breadcrumb-item.active .breadcrumb-text {
      color: #1f2937;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .breadcrumb {
        padding: 0.75rem 0;
      }

      .breadcrumb-list {
        gap: 0.25rem;
      }

      .breadcrumb-item {
        font-size: 0.75rem;
      }

      .breadcrumb-link,
      .breadcrumb-text {
        padding: 0.125rem 0.25rem;
      }

      .breadcrumb-item:not(:last-child)::after {
        margin-left: 0.25rem;
      }
    }

    @media (max-width: 480px) {
      .breadcrumb-link span {
        display: none;
      }

      .breadcrumb-link i {
        font-size: 0.875rem;
      }
    }
  `]
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadcrumbItems: BreadcrumbItem[] = [];

  ngOnInit(): void {
    this.generateBreadcrumbSchema();
  }

  private generateBreadcrumbSchema(): void {
    if (this.breadcrumbItems.length === 0) return;

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": this.breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": item.route ? `https://biss.com.br${item.route}` : undefined
      }))
    };

    // Remove schema existente
    const existingSchema = document.querySelector('script[data-breadcrumb-schema]');
    if (existingSchema) {
      existingSchema.remove();
    }

    // Adiciona novo schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb-schema', 'true');
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);
  }

  // Exemplo de uso:
  // breadcrumbItems = [
  //   { label: 'Produtos', route: '/produtos' },
  //   { label: 'Software', route: '/produtos/software' },
  //   { label: 'ERP', active: true }
  // ];
}
