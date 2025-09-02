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
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
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
