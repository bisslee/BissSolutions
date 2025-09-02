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
  template: `
    <div class="section-block">
      <div class="block-image">
        <img
          [src]="block.image"
          [alt]="block.imageAlt || block.title"
          loading="lazy"
        />
        <div class="image-overlay"></div>
      </div>
      <div class="block-content">
        <h3 class="block-title">{{ block.title }}</h3>
        <p class="block-text">{{ block.text }}</p>
        <a
          [routerLink]="block.buttonLink"
          [target]="block.buttonTarget || '_self'"
          class="btn btn-outline"
        >
          {{ block.buttonText }}
          <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .section-block {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .section-block:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .block-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .block-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .section-block:hover .block-image img {
      transform: scale(1.1);
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(16, 185, 129, 0.1));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .section-block:hover .image-overlay {
      opacity: 1;
    }

    .block-content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .block-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin: 0 0 1rem 0;
      line-height: 1.4;
    }

    .block-text {
      color: #6b7280;
      line-height: 1.6;
      margin: 0 0 1.5rem 0;
      flex: 1;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.875rem;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      cursor: pointer;
      align-self: flex-start;
    }

    .btn-outline {
      color: #2563eb;
      border-color: #2563eb;
      background: transparent;
    }

    .btn-outline:hover {
      color: white;
      background: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
    }

    .btn i {
      font-size: 0.75rem;
      transition: transform 0.3s ease;
    }

    .btn:hover i {
      transform: translateX(4px);
    }

    @media (max-width: 768px) {
      .block-content {
        padding: 1.25rem;
      }

      .block-title {
        font-size: 1.125rem;
      }

      .block-text {
        font-size: 0.875rem;
      }

      .btn {
        padding: 0.625rem 1.25rem;
        font-size: 0.8125rem;
      }
    }

    @media (max-width: 480px) {
      .block-image {
        height: 180px;
      }

      .block-content {
        padding: 1rem;
      }

      .block-title {
        font-size: 1rem;
        margin-bottom: 0.75rem;
      }

      .block-text {
        font-size: 0.8125rem;
        margin-bottom: 1.25rem;
      }
    }
  `]
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
