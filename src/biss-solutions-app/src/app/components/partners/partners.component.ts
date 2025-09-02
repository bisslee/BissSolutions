import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Partner {
  id: number;
  name: string;
  logo: string;
  website: string;
  description?: string;
}

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent {
  @Input() title: string = 'Nossos Parceiros';
  @Input() description: string = 'Empresas que confiam em nossas soluções';
  @Input() showPartnerNames: boolean = true;
  @Input() partners: Partner[] = [
    {
      id: 1,
      name: 'Dint Studio',
      logo: '/images/partners/parceiro-dint.jpg',
      website: 'https://dintstudio.com.br',
      description: 'Especialista em design para web e aplicativos'
    },
    {
      id: 2,
      name: 'Aelan Studio',
      logo: '/images/partners/parceiro-aelan-studio.png',
      website: 'https://www.aelanstudio.com/',
      description: 'Especialistas em aplicatiovos Mobile'
    },
    {
      id: 3,
      name: 'Host Azul',
      logo: '/images/partners/parceiro-hostazul.png',
      website: 'https://hostazul.com.br',
      description: 'Soluções em hospedagem de sites',
    },
    {
      id: 4,
      name: 'JMBA Soluções',
      logo: '/images/partners/parceiro-jmba.png',
      website: 'https://www.jmbasolucoes.com.br/',
      description: 'Inovação e confiança em soluções completas de TI',
    }
  ];

  openPartnerWebsite(website: string): void {
    window.open(website, '_blank', 'noopener,noreferrer');
  }

  onImageError(event: any): void {
    // Remove a imagem com erro e mostra o ícone
    event.target.style.display = 'none';
    const partnerItem = event.target.closest('.partner-item');
    const partnerIcon = partnerItem.querySelector('.partner-icon');
    if (partnerIcon) {
      partnerIcon.style.display = 'flex';
    }
  }
}
