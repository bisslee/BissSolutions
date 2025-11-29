import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSection } from '../../components/hero-section/hero-section';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { VersionService } from '../../services/version.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSection, BreadcrumbComponent],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {
  version = '';

  constructor(
    private seoService: SeoService,
    private breadcrumbService: BreadcrumbService,
    private versionService: VersionService
  ) {}

  ngOnInit(): void {
    this.seoService.updateSEO(this.seoService.getAboutSEO());
    this.breadcrumbService.setBreadcrumbs(this.breadcrumbService.getBreadcrumbsForPage('about'));
    this.version = this.versionService.getVersion();
  }

}
