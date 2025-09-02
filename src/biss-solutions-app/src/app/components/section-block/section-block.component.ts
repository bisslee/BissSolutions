import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface SectionBlock {
  id: number;
  image: string;
  title: string;
  text: string;
  buttonText: string;
  buttonLink: string;
  imageAlt?: string;
  buttonTarget?: string;
}

@Component({
  selector: 'app-section-block',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './section-block.component.html',
  styleUrls: ['./section-block.component.css']
})
export class SectionBlockComponent {
  @Input() block!: SectionBlock;

  // Exemplo de uso:
  // block = {
  //   id: 1,
  //   image: 'assets/images/service1.jpg',
  //   title: 'Desenvolvimento de Software',
  //   text: 'Criamos soluções personalizadas para atender às necessidades específicas do seu negócio.',
  //   buttonText: 'Saiba Mais',
  //   buttonLink: '/servicos/desenvolvimento',
  //   imageAlt: 'Desenvolvimento de Software',
  //   buttonTarget: '_self'
  // };
}
