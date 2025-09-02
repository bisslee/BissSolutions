import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface ServiceCard {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  color: string;
}

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="section-block">
      <div class="block-image">
        <div class="icon-container">
          <i [class]="service.icon"></i>
        </div>
        <div class="image-overlay"></div>
      </div>
      <div class="block-content">
        <h3 class="block-title">{{ service.title }}</h3>
        <p class="block-text">{{ service.description }}</p>

        <ul class="service-features">
          <li *ngFor="let feature of service.features">
            <i class="fas fa-check"></i>
            {{ feature }}
          </li>
        </ul>

        <a
          [routerLink]="service.buttonLink"
          class="btn btn-outline"
        >
          {{ service.buttonText }}
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
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f8fafc, #e2e8f0);
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .icon-container i {
      font-size: 4rem;
      color: #667eea;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
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

    .service-features {
      list-style: none;
      padding: 0;
      margin: 0 0 1.5rem 0;
    }

    .service-features li {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      color: #4b5563;
      font-size: 0.875rem;
    }

    .service-features i {
      color: #10b981;
      margin-right: 0.5rem;
      font-size: 0.75rem;
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
export class ServiceCardComponent {
  @Input() service!: ServiceCard;
}
