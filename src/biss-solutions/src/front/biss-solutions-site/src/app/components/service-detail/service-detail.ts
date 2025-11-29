import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSection } from '../hero-section/hero-section';

export interface FAQItem {
  pergunta: string;
  resposta: string;
}

export interface Testimonial {
  nome: string;
  cargo?: string;
  empresa: string;
  texto: string;
  foto?: string;
}

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSection],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.css'
})
export class ServiceDetail {
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() imagem: string = '';
  @Input() descricao: string = '';
  @Input() beneficios: string[] = [];
  @Input() tecnologias: string[] = [];
  @Input() processo: { etapa: string; descricao: string }[] = [];
  @Input() casosUso: string[] = [];
  @Input() faq: FAQItem[] = [];
  @Input() testimonials: Testimonial[] = [];
  @Input() conteudoExpandido?: string = '';
}
