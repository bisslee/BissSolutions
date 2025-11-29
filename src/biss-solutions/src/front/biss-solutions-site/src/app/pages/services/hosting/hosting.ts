import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetail, FAQItem, Testimonial } from '../../../components/service-detail/service-detail';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb';
import { BreadcrumbService } from '../../../services/breadcrumb.service';
import { SeoService } from '../../../services/seo.service';
import { SchemaService } from '../../../services/schema.service';

@Component({
  selector: 'app-hosting',
  standalone: true,
  imports: [CommonModule, ServiceDetail, BreadcrumbComponent],
  templateUrl: './hosting.html',
  styleUrl: './hosting.css'
})
export class Hosting implements OnInit {
  faq: FAQItem[] = [];
  testimonials: Testimonial[] = [];
  conteudoExpandido: string = '';

  constructor(
    private breadcrumbService: BreadcrumbService,
    private seoService: SeoService,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumbs(this.breadcrumbService.getBreadcrumbsForPage('services/hosting'));
    this.seoService.updateSEO(this.seoService.getServiceDetailSEO('Hospedagem com 5 Emails', 'Soluções de hospedagem confiáveis com 5 contas de email profissionais incluídas. Hospedagem de sites e aplicações com SSL/HTTPS gratuito.'));
    this.schemaService.addOrganizationSchema();
    this.schemaService.addWebsiteSchema();

    this.initializeFAQ();
    this.initializeTestimonials();
    this.initializeConteudoExpandido();

    if (this.faq.length > 0) {
      this.schemaService.addFAQSchema(
        this.faq.map(item => ({ question: item.pergunta, answer: item.resposta }))
      );
    }
  }

  private initializeFAQ(): void {
    this.faq = [
      {
        pergunta: 'O que está incluído no plano de hospedagem com 5 emails?',
        resposta: 'O plano inclui: hospedagem de sites e aplicações web, 5 contas de email profissionais com espaço de armazenamento, SSL/HTTPS gratuito para segurança, painel de controle intuitivo, suporte técnico especializado, backup automático, e garantia de uptime de 99,9%.'
      },
      {
        pergunta: 'Posso adicionar mais contas de email?',
        resposta: 'Sim! Você pode adicionar mais contas de email conforme sua necessidade. Oferecemos planos flexíveis que permitem expandir o número de contas de email e recursos de hospedagem conforme seu negócio cresce.'
      },
      {
        pergunta: 'Qual é a capacidade de armazenamento e tráfego?',
        resposta: 'Nossos planos de hospedagem oferecem espaço de armazenamento adequado para sites e aplicações, com tráfego ilimitado ou conforme o plano escolhido. Detalhes específicos são fornecidos durante a contratação, adaptados às necessidades do seu projeto.'
      },
      {
        pergunta: 'Como funciona o SSL/HTTPS gratuito?',
        resposta: 'Todos os nossos planos incluem certificado SSL/HTTPS gratuito, garantindo que seu site tenha conexão segura e criptografada. O certificado é instalado e renovado automaticamente, sem custos adicionais.'
      },
      {
        pergunta: 'Que tipo de suporte técnico está disponível?',
        resposta: 'Oferecemos suporte técnico especializado por email e telefone, com tempo de resposta rápido. Nossa equipe está disponível para ajudar com configurações, migrações, troubleshooting e qualquer questão relacionada à hospedagem e emails.'
      },
      {
        pergunta: 'Posso migrar meu site atual para a hospedagem da Biss Solutions?',
        resposta: 'Sim! Oferecemos serviço completo de migração. Nossa equipe cuida de toda a transferência de arquivos, bancos de dados, configurações e emails, garantindo que não haja interrupção no funcionamento do seu site durante a migração.'
      }
    ];
  }

  private initializeTestimonials(): void {
    this.testimonials = [
      {
        nome: 'Roberto Alves',
        cargo: 'Diretor de Marketing',
        empresa: 'Agência Digital',
        texto: 'A hospedagem da Biss Solutions é excelente! Os 5 emails profissionais funcionam perfeitamente, o site está sempre no ar e o suporte técnico é muito ágil. Recomendo para qualquer empresa que precisa de hospedagem confiável.'
      },
      {
        nome: 'Mariana Costa',
        cargo: 'CEO',
        empresa: 'Startup Tech',
        texto: 'Migramos nosso site para a Biss Solutions e foi uma experiência muito positiva. A migração foi feita sem problemas, os emails foram configurados rapidamente e o SSL gratuito é um grande diferencial. Estamos muito satisfeitos!'
      }
    ];
  }

  private initializeConteudoExpandido(): void {
    this.conteudoExpandido = `
      <h2>Hospedagem Profissional com 5 Emails Inclusos</h2>
      <p>A <a href="/company">Biss Solutions</a> oferece soluções completas de hospedagem para sites e aplicações web, com 5 contas de email profissionais incluídas. Nossa infraestrutura é robusta, segura e otimizada para performance, garantindo que seu site esteja sempre disponível e rápido.</p>

      <h3>Recursos da Nossa Hospedagem</h3>
      <p>Nossos planos de hospedagem incluem:</p>

      <h4>Hospedagem de Sites e Aplicações</h4>
      <p>Infraestrutura moderna e otimizada para hospedar sites estáticos, dinâmicos e aplicações web. Suportamos as principais tecnologias: PHP, Node.js, Python, .NET, e muito mais. Nossos servidores são configurados para máxima performance e segurança.</p>

      <h4>5 Contas de Email Profissionais</h4>
      <p>Cada plano inclui 5 contas de email profissionais (ex: contato@suaempresa.com.br). As contas incluem webmail, acesso via cliente de email (Outlook, Thunderbird, etc.), filtro anti-spam, antivírus e espaço de armazenamento adequado para suas necessidades.</p>

      <h4>SSL/HTTPS Gratuito</h4>
      <p>Todos os planos incluem certificado SSL/HTTPS gratuito, garantindo que seu site tenha conexão segura e criptografada. Isso é essencial para segurança, SEO e confiança dos visitantes. O certificado é instalado e renovado automaticamente.</p>

      <h4>Painel de Controle Intuitivo</h4>
      <p>Oferecemos painel de controle moderno e fácil de usar, onde você pode gerenciar domínios, emails, bancos de dados, arquivos e configurações. Interface intuitiva que permite gerenciar tudo sem conhecimento técnico avançado.</p>

      <h4>Backup Automático</h4>
      <p>Realizamos backups automáticos regulares do seu site e banco de dados. Isso garante que seus dados estejam sempre protegidos e possam ser restaurados rapidamente em caso de necessidade.</p>

      <h4>Suporte Técnico Especializado</h4>
      <p>Nossa equipe de suporte técnico está disponível para ajudar com qualquer questão relacionada à hospedagem, configuração de emails, migrações, troubleshooting e otimizações. Tempo de resposta rápido e atendimento especializado.</p>

      <h3>Benefícios da Nossa Hospedagem</h3>
      <ul>
        <li><strong>Alta Disponibilidade:</strong> Garantia de uptime de 99,9% com infraestrutura redundante</li>
        <li><strong>Performance Otimizada:</strong> Servidores configurados para máxima velocidade e eficiência</li>
        <li><strong>Segurança:</strong> SSL gratuito, proteção contra malware, firewall e monitoramento 24/7</li>
        <li><strong>Facilidade de Uso:</strong> Painel intuitivo e suporte técnico sempre disponível</li>
        <li><strong>Custo-Benefício:</strong> Plano completo com emails inclusos a preço competitivo</li>
        <li><strong>Escalabilidade:</strong> Possibilidade de expandir recursos conforme seu negócio cresce</li>
      </ul>

      <h3>Quando Você Precisa de Hospedagem?</h3>
      <p>Nossa hospedagem é ideal para:</p>
      <ul>
        <li>Empresas que precisam de site profissional com emails corporativos</li>
        <li>Startups que estão lançando sua presença online</li>
        <li>Agências que gerenciam múltiplos sites de clientes</li>
        <li>Desenvolvedores que precisam hospedar aplicações web</li>
        <li>E-commerces que precisam de hospedagem confiável</li>
        <li>Organizações que precisam migrar de outro provedor</li>
      </ul>

      <h3>Migração Sem Complicações</h3>
      <p>Oferecemos serviço completo de migração. Nossa equipe cuida de:</p>
      <ul>
        <li>Transferência de arquivos e banco de dados</li>
        <li>Configuração de domínios e DNS</li>
        <li>Migração de emails e configurações</li>
        <li>Testes e validação antes do go-live</li>
        <li>Suporte durante todo o processo</li>
      </ul>
      <p>Tudo isso é feito com cuidado para garantir que não haja interrupção no funcionamento do seu site.</p>

      <h3>Por Que Escolher a Biss Solutions para Hospedagem?</h3>
      <ul>
        <li>Mais de 20 anos de experiência em tecnologia</li>
        <li>Infraestrutura moderna e otimizada</li>
        <li>Suporte técnico especializado e ágil</li>
        <li>Preços competitivos com excelente custo-benefício</li>
        <li>SSL/HTTPS gratuito em todos os planos</li>
        <li>5 emails profissionais inclusos</li>
        <li>Garantia de uptime de 99,9%</li>
        <li>Backup automático e segurança robusta</li>
      </ul>

      <h3>Próximos Passos</h3>
      <p>Quer conhecer nossos planos de hospedagem? Entre em contato para uma consulta personalizada. Vamos entender suas necessidades e apresentar a melhor solução de hospedagem para seu negócio.</p>
    `;
  }
}

