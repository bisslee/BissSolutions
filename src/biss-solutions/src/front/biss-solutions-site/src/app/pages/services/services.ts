import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSection } from '../../components/hero-section/hero-section';
import { ServiceCard } from '../../components/service-card/service-card';
import { SeoService } from '../../services/seo.service';
import { SchemaService } from '../../services/schema.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSection, ServiceCard],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit {

  constructor(
    private seoService: SeoService,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.seoService.updateSEOWithSchema(this.seoService.getServicesSEO());
    this.schemaService.addServiceSchema();
  }

}
