import { Client } from './clients.component';

/**
 * Configuração dos clientes da Biss Solutions
 * Este arquivo centraliza todos os dados dos clientes para facilitar a manutenção
 */

export const CLIENTS_DATA: Client[] = [
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
    description: 'Site institucional para empresa de beleza com foco em experiência do usuário.',
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
    description: 'Site corporativo para empresa especializada em equipamentos de segurança contra incêndio.',
    version: 'Versão em Construção',
    services: [
      { name: 'Migração de Servidor', category: 'Migração de Servidor' },
      // { name: 'Design', category: 'Design' },
      // { name: 'Site (PHP)', category: 'Site' },
      // { name: 'UX', category: 'UX' },
      // { name: 'Banco de Dados (MySQL)', category: 'Banco de Dados' },
      { name: 'Hospedagem', category: 'Hospedagem' }
    ],
    // projectImage: '/images/clients/mangueiras-incendio-project.png',
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
    description: 'Migração de servidor para empresa do setor imobiliário.',
    version: 'Versão Atual',
    services: [
      { name: 'Migração de Servidor', category: 'Migração de Servidor' }
    ],
    projectImage: '/images/clients/impulsione-imobe-project.png',
    projectImageAlt: 'Site do Acervo SCCP FutFem'
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

/**
 * Configurações padrão do componente
 */
export const CLIENTS_CONFIG = {
  defaultTitle: 'Nossos Clientes',
  defaultDescription: 'Empresas que confiam em nossas soluções e serviços',
  itemsPerPage: 6,
  gridBreakpoints: {
    desktop: 1200,
    tablet: 768,
    mobile: 480
  }
};

/**
 * Categorias de serviços disponíveis com suas cores
 */
export const SERVICE_CATEGORIES = {
  'Design': '#8b5cf6',
  'UX': '#06b6d4',
  'Site': '#10b981',
  'APIs': '#f59e0b',
  'Integração': '#ef4444',
  'Player': '#8b5cf6',
  'Banco de Dados': '#059669',
  'Hospedagem': '#7c3aed',
  'WordPress Instalação': '#0891b2',
  'Configuração de Template': '#dc2626',
  'Migração de Servidor': '#ea580c',
  'SSO': '#be185d',
  'Aplicativo': '#059669'
};

/**
 * Funções utilitárias para trabalhar com os dados dos clientes
 */
export class ClientsUtils {
  /**
   * Filtra clientes por categoria de serviço
   */
  static filterByServiceCategory(clients: Client[], category: string): Client[] {
    return clients.filter(client =>
      client.services.some(service => service.category === category)
    );
  }

  /**
   * Busca clientes por termo de busca
   */
  static searchClients(clients: Client[], searchTerm: string): Client[] {
    const term = searchTerm.toLowerCase();
    return clients.filter(client =>
      client.name.toLowerCase().includes(term) ||
      client.description.toLowerCase().includes(term) ||
      client.services.some(service =>
        service.name.toLowerCase().includes(term)
      )
    );
  }

  /**
   * Obtém clientes com website disponível
   */
  static getClientsWithWebsite(clients: Client[]): Client[] {
    return clients.filter(client => client.website);
  }

  /**
   * Obtém clientes com imagem de projeto
   */
  static getClientsWithProjectImage(clients: Client[]): Client[] {
    return clients.filter(client => client.projectImage);
  }

  /**
   * Agrupa clientes por versão
   */
  static groupByVersion(clients: Client[]): Record<string, Client[]> {
    return clients.reduce((groups, client) => {
      const version = client.version;
      if (!groups[version]) {
        groups[version] = [];
      }
      groups[version].push(client);
      return groups;
    }, {} as Record<string, Client[]>);
  }
}
