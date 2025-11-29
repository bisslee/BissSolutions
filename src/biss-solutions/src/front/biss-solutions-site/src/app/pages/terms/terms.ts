import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSection } from '../../components/hero-section/hero-section';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSection],
  templateUrl: './terms.html',
  styleUrl: './terms.css'
})
export class Terms implements OnInit {
  currentDate = new Date().toLocaleDateString('pt-BR');

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateSEO(this.seoService.getTermsSEO());
  }
}
