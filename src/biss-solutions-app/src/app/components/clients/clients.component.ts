import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CLIENTS_DATA, CLIENTS_CONFIG } from './clients.config';

export interface ClientService {
  name: string;
  category: string;
}

export interface Client {
  id: number;
  name: string;
  logo: string;
  website?: string;
  description: string;
  version: string;
  services: ClientService[];
  projectImage?: string;
  projectImageAlt?: string;
}

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  @Input() title: string = CLIENTS_CONFIG.defaultTitle;
  @Input() description: string = CLIENTS_CONFIG.defaultDescription;
  @Input() clients: Client[] = CLIENTS_DATA;

  onImageError(event: any): void {
    // Substitui a imagem com erro por um ícone
    const img = event.target;
    img.style.display = 'none';

    const logoContainer = img.parentElement;
    logoContainer.innerHTML = '<i class="fas fa-building" style="font-size: 2rem; color: #6b7280;"></i>';
  }

  onProjectImageError(event: any): void {
    // Substitui a imagem do projeto com erro por um placeholder
    const img = event.target;
    img.style.display = 'none';

    const projectContainer = img.parentElement;
    projectContainer.innerHTML = '<div style="height: 200px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; color: #9ca3af;"><i class="fas fa-image" style="font-size: 3rem;"></i></div>';
  }
}
