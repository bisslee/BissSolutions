import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetail, FAQItem, Testimonial } from '../../../components/service-detail/service-detail';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb';
import { BreadcrumbService } from '../../../services/breadcrumb.service';
import { SeoService } from '../../../services/seo.service';
import { SchemaService } from '../../../services/schema.service';

@Component({
  selector: 'app-landing-pages',
  standalone: true,
  imports: [CommonModule, ServiceDetail, BreadcrumbComponent],
  templateUrl: './landing-pages.html',
  styleUrl: './landing-pages.css'
})
export class LandingPages implements OnInit {
  faq: FAQItem[] = [];
  testimonials: Testimonial[] = [];
  conteudoExpandido: string = '';

  constructor(
    private breadcrumbService: BreadcrumbService,
    private seoService: SeoService,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumbs(this.breadcrumbService.getBreadcrumbsForPage('services/landing-pages'));
    this.seoService.updateSEO(this.seoService.getServiceDetailSEO('Criação de Landing Pages Profissionais', 'Landing pages otimizadas para conversão com design moderno e responsivo. Integração com ferramentas de marketing e SEO otimizado para maximizar resultados.'));
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
        pergunta: 'O que é uma landing page e por que preciso de uma?',
        resposta: 'Uma landing page é uma página web focada em uma ação específica (como capturar leads, vender um produto ou promover um evento). Diferente de um site completo, ela é otimizada para conversão, com design que guia o visitante para a ação desejada. É essencial para campanhas de marketing digital, lançamentos de produtos e geração de leads qualificados.'
      },
      {
        pergunta: 'Quanto tempo leva para criar uma landing page?',
        resposta: 'O tempo varia conforme a complexidade e requisitos. Uma landing page simples pode ficar pronta em 1-2 semanas, enquanto uma mais elaborada com integrações complexas pode levar 3-4 semanas. Sempre começamos com briefing detalhado para entender objetivos, público-alvo e requisitos técnicos.'
      },
      {
        pergunta: 'A landing page será responsiva (mobile-friendly)?',
        resposta: 'Sim! Todas as landing pages que criamos são totalmente responsivas, otimizadas para funcionar perfeitamente em smartphones, tablets e desktops. Isso é essencial, já que a maioria do tráfego vem de dispositivos móveis.'
      },
      {
        pergunta: 'Posso integrar com ferramentas de marketing?',
        resposta: 'Sim! Integramos com as principais ferramentas: Google Analytics, Facebook Pixel, Google Tag Manager, Mailchimp, RD Station, HubSpot, ActiveCampaign, e muitas outras. Também podemos integrar com CRMs e sistemas de automação de marketing.'
      },
      {
        pergunta: 'A landing page será otimizada para SEO?',
        resposta: 'Sim! Aplicamos as melhores práticas de SEO: estrutura semântica, meta tags otimizadas, velocidade de carregamento, mobile-first, schema markup, e otimização de imagens. Isso ajuda seu site a aparecer melhor nos resultados de busca.'
      },
      {
        pergunta: 'Posso editar o conteúdo da landing page depois?',
        resposta: 'Depende do tipo de landing page. Podemos criar landing pages em plataformas como WordPress ou sistemas próprios que permitem edição fácil. Também oferecemos treinamento para que você possa fazer alterações básicas, ou podemos manter o serviço de atualizações.'
      }
    ];
  }

  private initializeTestimonials(): void {
    this.testimonials = [
      {
        nome: 'Fernando Santos',
        cargo: 'Diretor de Marketing',
        empresa: 'E-commerce de Moda',
        texto: 'A landing page criada pela Biss Solutions superou todas as expectativas! O design é moderno, a conversão aumentou 45% em relação à página anterior, e a integração com nosso CRM funcionou perfeitamente. Recomendo muito!'
      },
      {
        nome: 'Juliana Lima',
        cargo: 'CEO',
        empresa: 'Startup SaaS',
        texto: 'Precisávamos de uma landing page para nosso lançamento e a Biss Solutions entregou exatamente o que precisávamos. Design profissional, otimizada para conversão, e pronta em tempo recorde. A taxa de conversão está excelente!'
      }
    ];
  }

  private initializeConteudoExpandido(): void {
    this.conteudoExpandido = `
      <h2>Criação de Landing Pages Profissionais Otimizadas para Conversão</h2>
      <p>A <a href="/company">Biss Solutions</a> cria landing pages profissionais e otimizadas para conversão, com design moderno, responsivo e integrado com ferramentas de marketing. Nossas landing pages são desenvolvidas com foco em resultados, utilizando as melhores práticas de UX, SEO e performance.</p>

      <h3>O Que É Uma Landing Page?</h3>
      <p>Uma landing page (página de destino) é uma página web focada em uma ação específica: capturar leads, vender um produto, promover um evento, ou qualquer outra conversão. Diferente de um site completo, ela é projetada estrategicamente para guiar o visitante para a ação desejada, maximizando a taxa de conversão.</p>

      <h3>Recursos das Nossas Landing Pages</h3>
      <p>Nossas landing pages incluem:</p>

      <h4>Design Responsivo e Moderno</h4>
      <p>Criamos designs modernos, atraentes e totalmente responsivos que funcionam perfeitamente em todos os dispositivos: smartphones, tablets e desktops. Utilizamos as últimas tendências de design, cores que convertem, tipografia legível e layouts que guiam o olhar para a ação desejada.</p>

      <h4>Otimização para Conversão</h4>
      <p>Aplicamos princípios de UX/UI e psicologia do consumidor para maximizar conversões. Isso inclui: headlines persuasivas, CTAs (call-to-actions) destacados, formulários otimizados, prova social, urgência e escassez, e fluxo de navegação que leva naturalmente à conversão.</p>

      <h4>Integração com Ferramentas de Marketing</h4>
      <p>Integramos com as principais ferramentas de marketing digital: Google Analytics, Facebook Pixel, Google Tag Manager, Mailchimp, RD Station, HubSpot, ActiveCampaign, e muitos outros. Também integramos com CRMs e sistemas de automação para captura e qualificação de leads.</p>

      <h4>SEO e Performance Otimizados</h4>
      <p>Aplicamos as melhores práticas de SEO: estrutura semântica HTML5, meta tags otimizadas, schema markup, velocidade de carregamento otimizada, imagens comprimidas, e mobile-first. Isso garante que sua landing page apareça bem nos resultados de busca e carregue rapidamente.</p>

      <h4>Testes A/B e Otimização Contínua</h4>
      <p>Oferecemos serviços de testes A/B para identificar quais elementos convertem melhor. Testamos headlines, CTAs, cores, layouts e formulários para encontrar a combinação que maximiza conversões. Fazemos otimização contínua baseada em dados.</p>

      <h4>Análise e Relatórios</h4>
      <p>Configuramos análise completa com Google Analytics e outras ferramentas. Fornecemos relatórios de performance, taxa de conversão, fontes de tráfego, comportamento do usuário e insights para melhorias contínuas.</p>

      <h3>Benefícios de Uma Landing Page Profissional</h3>
      <ul>
        <li><strong>Maior Taxa de Conversão:</strong> Landing pages otimizadas convertem 2-3x mais que páginas genéricas</li>
        <li><strong>Foco na Ação:</strong> Design que guia o visitante diretamente para a conversão desejada</li>
        <li><strong>Melhor ROI de Campanhas:</strong> Campanhas de marketing com landing pages dedicadas têm melhor retorno</li>
        <li><strong>Captura de Leads Qualificados:</strong> Formulários otimizados capturam leads mais qualificados</li>
        <li><strong>Profissionalismo:</strong> Design profissional aumenta confiança e credibilidade</li>
        <li><strong>Mensurabilidade:</strong> Fácil de medir resultados e otimizar continuamente</li>
      </ul>

      <h3>Quando Você Precisa de Uma Landing Page?</h3>
      <p>Landing pages são ideais para:</p>
      <ul>
        <li>Lançamento de produtos ou serviços</li>
        <li>Campanhas de marketing digital (Google Ads, Facebook Ads, etc.)</li>
        <li>Captura de leads para nutrição</li>
        <li>Promoção de eventos, webinars ou workshops</li>
        <li>Ofertas especiais e descontos</li>
        <li>Download de materiais (e-books, whitepapers, etc.)</li>
        <li>Inscrições em newsletters</li>
        <li>Testes de conceito ou MVP</li>
      </ul>

      <h3>Nossos Tipos de Landing Pages</h3>
      <p>Criamos diferentes tipos de landing pages:</p>

      <h4>Landing Page de Captura de Leads</h4>
      <p>Focada em capturar informações de contato através de formulários otimizados. Ideal para geração de leads, nutrição e automação de marketing.</p>

      <h4>Landing Page de Vendas</h4>
      <p>Projetada para vender produtos ou serviços, com foco em benefícios, prova social, e CTAs que levam à compra ou agendamento.</p>

      <h4>Landing Page de Eventos</h4>
      <p>Para promover eventos, webinars, workshops, com informações claras, agenda, palestrantes e formulário de inscrição.</p>

      <h4>Landing Page de Lançamento</h4>
      <p>Para lançamentos de produtos, com countdown, pré-venda, early bird, e elementos de urgência e escassez.</p>

      <h4>Landing Page de Squeeze</h4>
      <p>Página minimalista focada apenas em capturar email, oferecendo algo de valor em troca (lead magnet).</p>

      <h3>Nossos Processos de Criação</h3>
      <p>Seguimos um processo estruturado:</p>

      <h4>1. Briefing e Planejamento</h4>
      <p>Entendemos seus objetivos, público-alvo, proposta de valor, e requisitos técnicos. Definimos estratégia de conversão e KPIs.</p>

      <h4>2. Wireframes e Design</h4>
      <p>Criamos wireframes funcionais e depois desenvolvemos design visual moderno e atraente, alinhado com sua marca.</p>

      <h4>3. Desenvolvimento</h4>
      <p>Desenvolvemos a landing page com código limpo, otimizado, responsivo e integrado com ferramentas de marketing.</p>

      <h4>4. Testes e Otimização</h4>
      <p>Testamos em diferentes dispositivos, navegadores e ferramentas. Otimizamos performance, SEO e elementos de conversão.</p>

      <h4>5. Lançamento e Acompanhamento</h4>
      <p>Fazemos o deploy, configuramos análises e acompanhamos performance. Fornecemos relatórios e sugestões de otimização.</p>

      <h3>Por Que Escolher a Biss Solutions para Landing Pages?</h3>
      <ul>
        <li>Mais de 20 anos de experiência em desenvolvimento web</li>
        <li>Design moderno e otimizado para conversão</li>
        <li>Integração com principais ferramentas de marketing</li>
        <li>SEO e performance otimizados</li>
        <li>Totalmente responsivo (mobile-first)</li>
        <li>Suporte e otimização contínua</li>
        <li>Resultados mensuráveis e comprovados</li>
        <li>Preços competitivos e prazos cumpridos</li>
      </ul>

      <h3>Próximos Passos</h3>
      <p>Quer criar uma landing page que converte? Entre em contato para uma consulta gratuita. Vamos entender seus objetivos e apresentar uma proposta personalizada para sua landing page profissional.</p>
    `;
  }
}

