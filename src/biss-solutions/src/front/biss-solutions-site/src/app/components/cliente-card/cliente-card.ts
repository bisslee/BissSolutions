import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptimizedImageComponent } from '../optimized-image/optimized-image';

export interface clientservice {
  name: string;
  category: string;
}

export interface Cliente {
  id: number;
  name: string;
  logo: string;
  website?: string;
  description: string;
  version: string;
  services: clientservice[];
  projectImage?: string;
  projectImageAlt?: string;
}

@Component({
  selector: 'app-cliente-card',
  standalone: true,
  imports: [CommonModule, OptimizedImageComponent],
  templateUrl: './cliente-card.html',
  styleUrl: './cliente-card.css'
})
export class ClienteCard {
  @Input() cliente: Cliente = {
    id: 0,
    name: '',
    logo: '',
    description: '',
    version: '',
    services: []
  };

}
