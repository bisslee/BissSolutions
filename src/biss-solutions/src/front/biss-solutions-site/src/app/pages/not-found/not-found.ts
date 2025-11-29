import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { SchemaService } from '../../services/schema.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFoundComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    // SEO para página 404
    this.seoService.updateSEO({
      title: '404 - Página Não Encontrada | Biss Solutions',
      description: 'A página que você está procurando não foi encontrada. Explore nossos serviços de desenvolvimento, consultoria TI e soluções tecnológicas.',
      keywords: '404, página não encontrada, erro, Biss Solutions, desenvolvimento, consultoria TI',
      url: 'https://biss.com.br/404'
    });

    // Adicionar Schema.org para página de erro
    this.schemaService.addWebsiteSchema();
  }

  // Animação do número 404
  animate404(): void {
    const numberElement = document.querySelector('.error-number');
    if (numberElement) {
      numberElement.classList.add('animate');
      setTimeout(() => {
        numberElement.classList.remove('animate');
      }, 1000);
    }
  }

  // Redirecionar para home
  goHome(): void {
    window.location.href = '/';
  }

  // Voltar página anterior
  goBack(): void {
    window.history.back();
  }
}
