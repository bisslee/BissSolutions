import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptimizedImageComponent } from '../optimized-image/optimized-image';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, OptimizedImageComponent],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class productCard {
  @Input() nome: string = '';
  @Input() descricao: string = '';
  @Input() versao: string = '';
  @Input() logo: string = '';
  @Input() nugetUrl: string = '';
  @Input() githubUrl: string = '';
  @Input() docUrl: string = '';
  @Input() features: string[] = [];
  @Input() highlights: { icon: string; text: string }[] = [];
  @Input() featured: boolean = false;
}
