import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSection } from '../../components/hero-section/hero-section';
import { productCard } from '../../components/product-card/product-card';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb';
import { SeoService } from '../../services/seo.service';
import { SchemaService } from '../../services/schema.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSection, productCard, BreadcrumbComponent],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  constructor(
    private seoService: SeoService,
    private schemaService: SchemaService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.seoService.updateSEOWithSchema(this.seoService.getProductsSEO());
    this.breadcrumbService.setBreadcrumbs(this.breadcrumbService.getBreadcrumbsForPage('products'));
    
    // Add product schemas for the main products
    this.schemaService.addProductSchema(
      'Biss.Solutions.MicroService.Template.Net9',
      'Template completo para criar microserviços modernos em .NET 9 com Clean Architecture, CQRS, Domain-Driven Design e otimizações avançadas de performance.',
      'https://www.nuget.org/packages/Biss.Solutions.MicroService.Template.Net9'
    );
  }

}
