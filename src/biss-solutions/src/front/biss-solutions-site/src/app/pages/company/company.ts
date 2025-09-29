import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSection } from '../../components/hero-section/hero-section';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSection],
  templateUrl: './company.html',
  styleUrl: './company.css'
})
export class Company implements OnInit {

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateSEO(this.seoService.getCompanySEO());
  }

}
