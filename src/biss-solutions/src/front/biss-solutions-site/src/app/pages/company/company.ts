import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSection } from '../../components/hero-section/hero-section';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSection, BreadcrumbComponent],
  templateUrl: './company.html',
  styleUrl: './company.css'
})
export class Company implements OnInit {

  constructor(
    private seoService: SeoService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.seoService.updateSEO(this.seoService.getCompanySEO());
    this.breadcrumbService.setBreadcrumbs(this.breadcrumbService.getBreadcrumbsForPage('company'));
  }

}
