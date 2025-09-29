import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSection } from '../../components/hero-section/hero-section';
import { ClienteCard, Cliente } from '../../components/cliente-card/cliente-card';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSection, ClienteCard],
  templateUrl: './clients.html',
  styleUrl: './clients.css'
})
export class Clients implements OnInit {

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateSEO(this.seoService.getClientsSEO());
  }
  clients: Cliente[] = [
    {
      id: 1,
      name: 'Radio Biss',
      logo: '/images/clients/radio-biss-logo.png',
      website: 'https://radiobiss.com.br/',
      description: 'Plataforma de rádio online com player personalizado e sistema de gestão completo.',
      version: 'Versões: 2016, 2017, 2020 e Atual',
      services: [
        { name: 'Design', category: 'Design' },
        { name: 'Site (.NET)', category: 'Site' },
        { name: 'APIs (.NET)', category: 'APIs' },
        { name: 'Integração', category: 'Integração' },
        { name: 'UX', category: 'UX' },
        { name: 'Player', category: 'Player' },
        { name: 'Banco de Dados (SQL Server)', category: 'Banco de Dados' },
        { name: 'Hospedagem', category: 'Hospedagem' }
      ],
      projectImage: '/images/clients/radio-biss-project.png',
      projectImageAlt: 'Site da Radio Biss'
    },
    {
      id: 2,
      name: 'Nuance Beleza',
      logo: '/images/clients/nuance-beleza-logo.png',
      website: 'https://nuancebeleza.com.br',
      description: 'Site institucional para company de beleza com foco em experiência do usuário.',
      version: 'Versão 2019',
      services: [
        { name: 'Design', category: 'Design' },
        { name: 'UX', category: 'UX' },
        { name: 'Site', category: 'Site' },
        { name: 'Hospedagem', category: 'Hospedagem' }
      ],
      projectImage: '/images/clients/nuance-beleza-project.png',
      projectImageAlt: 'Site da Nuance Beleza'
    },
    {
      id: 3,
      name: 'Marilia Zangrandi',
      logo: '/images/clients/marilia-zangrandi-logo.png',
      website: 'https://mariliazangrandi.rocks/',
      description: 'Site pessoal desenvolvido em WordPress com template personalizado.',
      version: 'Versão Atual',
      services: [
        { name: 'WordPress Instalação', category: 'WordPress Instalação' },
        { name: 'Configuração de Template', category: 'Configuração de Template' },
        { name: 'Hospedagem', category: 'Hospedagem' }
      ],
      projectImage: '/images/clients/marilia-zangrandi-project.png',
      projectImageAlt: 'Site da Marilia Zangrandi'
    },
    {
      id: 4,
      name: 'Mangueiras Incêndio Brasil',
      logo: '/images/clients/mangueiras-incendio-logo.png',
      website: 'https://mangueirasdeincendiobrasil.com.br/',
      description: 'Site corporativo para company especializada em equipamentos de segurança contra incêndio.',
      version: 'Versão em Construção',
      services: [
        { name: 'Migração de Servidor', category: 'Migração de Servidor' },
        { name: 'Hospedagem', category: 'Hospedagem' }
      ],
      projectImageAlt: 'Site da Mangueiras Incêndio Brasil'
    },
    {
      id: 5,
      name: 'Eudóxia',
      logo: '/images/clients/eudoxia-logo.png',
      website: 'https://eudoxia.rocks/',
      description: 'Site institucional desenvolvido em WordPress com design personalizado.',
      version: 'Versão em Construção',
      services: [
        { name: 'WordPress Instalação', category: 'WordPress Instalação' },
        { name: 'Configuração de Template', category: 'Configuração de Template' },
        { name: 'Hospedagem', category: 'Hospedagem' }
      ],
      projectImage: '/images/clients/eudoxia-project.png',
      projectImageAlt: 'Site da Eudóxia'
    },
    {
      id: 6,
      name: 'Acervo SCCP Feminino',
      logo: '/images/clients/acervo-sccp-logo.jpg',
      website: 'https://acervosccpfutfem.com.br/',
      description: 'Plataforma para acervo de futebol feminino com sistema de autenticação SSO.',
      version: 'Versão em Construção',
      services: [
        { name: 'Design', category: 'Design' },
        { name: 'Site (.NET)', category: 'Site' },
        { name: 'APIs (.NET)', category: 'APIs' },
        { name: 'SSO', category: 'SSO' },
        { name: 'Integração', category: 'Integração' },
        { name: 'UX', category: 'UX' },
        { name: 'Banco de Dados (SQL Server)', category: 'Banco de Dados' },
        { name: 'Hospedagem', category: 'Hospedagem' }
      ],
      projectImage: '/images/clients/acervo-sccp-project.png',
      projectImageAlt: 'Site do Acervo SCCP FutFem'
    },
    {
      id: 7,
      name: 'Impulsione Imobe',
      logo: '/images/clients/impulsione-imobe-logo.png',
      website: 'https://impulsioneimobe.com.br/',
      description: 'Migração de servidor para company do setor imobiliário.',
      version: 'Versão Atual',
      services: [
        { name: 'Migração de Servidor', category: 'Migração de Servidor' }
      ],
      projectImage: '/images/clients/impulsione-imobe-project.png',
      projectImageAlt: 'Site do Impulsione Imobe'
    },
    {
      id: 8,
      name: 'Evoluir Turismo',
      logo: '/images/clients/evoluir-turismo-logo.png',
      description: 'Aplicativo que migra dados para XML específico para envio ao sistema de emissão de passagens.',
      version: 'Versão Atual',
      services: [
        { name: 'Aplicativo', category: 'Aplicativo' }
      ],
      projectImage: '/images/clients/evoluir-turismo-project.png',
      projectImageAlt: 'Aplicativo da Evoluir Turismo'
    }
  ];
}
