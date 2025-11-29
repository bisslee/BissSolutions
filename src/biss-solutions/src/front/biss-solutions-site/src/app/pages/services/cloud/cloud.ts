import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetail, FAQItem, Testimonial } from '../../../components/service-detail/service-detail';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb';
import { BreadcrumbService } from '../../../services/breadcrumb.service';
import { SeoService } from '../../../services/seo.service';
import { SchemaService } from '../../../services/schema.service';

@Component({
  selector: 'app-cloud',
  standalone: true,
  imports: [CommonModule, ServiceDetail, BreadcrumbComponent],
  templateUrl: './cloud.html',
  styleUrl: './cloud.css'
})
export class Cloud implements OnInit {
  faq: FAQItem[] = [];
  testimonials: Testimonial[] = [];
  conteudoExpandido: string = '';

  constructor(
    private breadcrumbService: BreadcrumbService,
    private seoService: SeoService,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumbs(this.breadcrumbService.getBreadcrumbsForPage('services/cloud'));
    this.seoService.updateSEO(this.seoService.getServiceDetailSEO('Soluções em Cloud', 'Migração para cloud, Azure, AWS e GCP. Infraestrutura escalável, segura e com redução de custos operacionais.'));
    this.schemaService.addOrganizationSchema();
    this.schemaService.addWebsiteSchema();

    this.initializeFAQ();
    this.initializeTestimonials();
    this.initializeConteudoExpandido();

    // Adicionar Schema de FAQ após inicializar os dados
    if (this.faq.length > 0) {
      this.schemaService.addFAQSchema(
        this.faq.map(item => ({ question: item.pergunta, answer: item.resposta }))
      );
    }
  }

  private initializeFAQ(): void {
    this.faq = [
      {
        pergunta: 'Qual é a melhor plataforma cloud: Azure, AWS ou Google Cloud?',
        resposta: 'A escolha depende das suas necessidades específicas. Azure tem excelente integração com Microsoft e .NET. AWS oferece o maior portfólio de serviços e escalabilidade. Google Cloud é líder em IA/ML e analytics. Durante nossa consultoria, analisamos seus requisitos técnicos, custos, compliance e performance para recomendar a melhor plataforma ou até mesmo uma estratégia multi-cloud.'
      },
      {
        pergunta: 'Quanto custa migrar para a cloud?',
        resposta: 'O investimento varia conforme complexidade e volume. Uma migração simples pode custar R$ 20-50 mil, enquanto projetos complexos podem chegar a R$ 200-500 mil. Normalmente economizamos 30-50% ao ano em custos operacionais comparado com infraestrutura on-premise. Oferecemos calculadora de ROI para estimar sua economia específica. O investimento normalmente se paga em 12-24 meses.'
      },
      {
        pergunta: 'É seguro migrar nossos dados para a cloud?',
        resposta: 'Sim! As plataformas cloud líderes (Azure, AWS, GCP) têm mais recursos de segurança que infraestrutura on-premise típica. Implementamos: criptografia end-to-end, backup automático, disaster recovery, compliance (LGPD, ISO 27001), monitoramento 24/7, e políticas de acesso restritas. Seguimos as melhores práticas de segurança e damos treinamento para sua equipe.'
      },
      {
        pergunta: 'Quantos anos dura uma migração para cloud?',
        resposta: 'Depende da complexidade. Migrações simples levam 2-3 meses, projetos médios levam 3-6 meses, e projetos complexos com centenas de servidores podem levar 6-12 meses. Usamos metodologia faseada: primeiro migramos sistemas não-críticos para validar, depois os sistemas principais. Isso minimiza riscos e downtime.'
      },
      {
        pergunta: 'O que acontece se decidirmos voltar da cloud?',
        resposta: 'Mesmo sendo raro, é totalmente possível. Durante a migração, mantemos backups locais e documentação completa. Podemos criar plano de "exit strategy" para repatriar sistemas se necessário. Porém, depois de migrar, 95% dos clientes querem expandir uso de cloud, não voltar. A economia e benefícios são muito grandes.'
      },
      {
        pergunta: 'Vocês oferecem suporte contínuo após a migração?',
        resposta: 'Sim! Oferecemos contratos de suporte e gerenciamento de infraestrutura cloud. Isso inclui: monitoramento 24/7, gerenciamento de recursos, otimização de custos, backup e recovery, suporte técnico, e evoluções quando necessário. Garantimos que sua infraestrutura cloud esteja sempre otimizada e funcionando perfeitamente.'
      }
    ];
  }

  private initializeTestimonials(): void {
    this.testimonials = [
      {
        nome: 'Roberto Mendes',
        cargo: 'CEO',
        empresa: 'Tech Solutions SP',
        texto: 'Migrar para AWS com a Biss Solutions foi a melhor decisão que tomamos. Reduzimos custos em 45%, aumentamos performance em 60% e agora temos escalabilidade infinita. O suporte técnico é impecável.'
      },
      {
        nome: 'Maria Santos',
        cargo: 'CTO',
        empresa: 'Fintech',
        texto: 'Precisávamos de uma infraestrutura cloud robusta e segura. A Biss Solutions nos ajudou a migrar para Azure com zero downtime. O projeto foi executado perfeitamente, dentro do prazo e orçamento.'
      }
    ];
  }

  private initializeConteudoExpandido(): void {
    this.conteudoExpandido = `
      <h2>Migração para Cloud com Biss Solutions</h2>
      <p>A <a href="/company">Biss Solutions</a> é especialista em migração para cloud, ajudando empresas de todos os portes a modernizaram infraestrutura, reduzir custos e aumentar escalabilidade. Trabalhamos com as principais plataformas: Amazon AWS, Microsoft Azure e Google Cloud Platform. Também oferecemos <a href="/services/consulting">consultoria estratégica</a> e <a href="/services/development">desenvolvimento de software</a> para complementar sua transformação digital.</p>

      <h3>Por Que Migrar para Cloud?</h3>
      <p>Migrar para cloud traz inúmeros benefícios estratégicos e financeiros:</p>

      <h4>Redução de Custos de 30-50%</h4>
      <p>Elimina necessidade de investir em servidores físicos caros, manutenção on-premise, espaço físico, refrigeração, equipe dedicada de infraestrutura. Você paga apenas pelo que usa, com modelo de assinatura previsível. Economias típicas são de R$ 50-200 mil ao ano.</p>

      <h4>Escalabilidade Automática</h4>
      <p>Com cloud, você escala instantaneamente conforme demanda. Em períodos de pico (Black Friday, por exemplo), recursos aumentam automaticamente. Quando demanda cai, recursos são reduzidos automaticamente. Isso é impossível com infraestrutura tradicional.</p>

      <h4>Maior Segurança e Compliance</h4>
      <p>Azure, AWS e GCP investem bilhões em segurança - muito mais que empresas típicas podem investir. Implementamos backup automático, disaster recovery, criptografia, e compliance com LGPD, ISO 27001 e SOC 2.</p>

      <h4>Performance Superior</h4>
      <p>Cloud oferece melhor performance que servidores on-premise: menor latência, maior disponibilidade (99.99% SLA), CDN global para seus usuários, e recursos de última geração (GPUs para IA, SSDs ultra-rápidos).</p>

      <h3>Nossas Plataformas Cloud</h3>

      <h4>Microsoft Azure</h4>
      <p>Ideal para empresas com stack Microsoft (.NET, SQL Server, Office 365). Excelente integração com Active Directory, SharePoint, Power BI. 60 datacenters globais. Forte em serviços enterprise.</p>

      <h4>Amazon AWS</h4>
      <p>Líder mundial em cloud, com maior portfólio de serviços (200+). Excelente para startups e escalabilidade massiva. Meilleur choix para AI/ML, big data, e arquiteturas microservices. Ecosistema gigante de parceiros.</p>

      <h4>Google Cloud Platform</h4>
      <p>Melhor para IA/ML com TensorFlow, BigQuery analytics, e Kubernetes. Excelente performance de rede global. Líder em análise de dados e machine learning. Ideal para empresas data-driven.</p>

      <h3>Nosso Processo de Migração</h3>
      <p>Migração para cloud é complexa e requer expertise. Seguimos metodologia comprovada:</p>

      <h4>Fase 1: Discovery e Assessment (2-4 semanas)</h4>
      <p>Analisamos completamente seu ambiente atual: inventário de servidores, aplicações, dependências, performance, custos. Identificamos o que pode ir para cloud, o que deve ficar on-premise (legacy crítico) e priorizamos. Definimos arquitetura ideal.</p>

      <h4>Fase 2: Design e Planejamento (2-3 semanas)</h4>
      <p>Criamos arquitetura detalhada na plataforma escolhida. Definimos VPCs, subnets, segurança, backup, disaster recovery. Estimamos custos mensais e anuais. Criamos plano de execução detalhado com timelines.</p>

      <h4>Fase 3: Prova de Conceito (1-2 semanas)</h4>
      <p>Migramos 1-2 sistemas não-críticos para validar arquitetura, processos e diminuir riscos. Ajustamos conforme necessário. Conquistamos confiança da equipe interna.</p>

      <h4>Fase 4: Migração Completa (2-6 meses)</h4>
      <p>Migramos sistemas críticos usando estratégias: lift-and-shift (rápido), re-platforming (otimização) ou re-architecting (cloud-native). Minimizamos downtime com migration windows. Testamos extensivamente.</p>

      <h4>Fase 5: Otimização Contínua</h4>
      <p>Após migração, monitoramos performance e custos. Otimizamos recursos não utilizados, right-sizing de instâncias, e arquiteturas. Garantimos que você pague pelo mínimo necessário e maximize ROI.</p>

      <h3>Serviços Incluídos na Migração</h3>
      <ul>
        <li><strong>Análise Completa:</strong> Avaliação de infraestrutura atual, custos, performance e riscos</li>
        <li><strong>Arquitetura Cloud:</strong> Design de VPCs, segurança, networking e alta disponibilidade</li>
        <li><strong>Migração de Dados:</strong> Transfer segura de bancos de dados e arquivos</li>
        <li><strong>Migração de Aplicações:</strong> Lift-and-shift ou re-architecting conforme necessário</li>
        <li><strong>Backup e Disaster Recovery:</strong> Soluções robustas de backup automático e recovery testing</li>
        <li><strong>Monitoramento:</strong> Implementação de monitoramento, alerting e dashboards</li>
        <li><strong>Segurança:</strong> Compliance, criptografia, firewall, e políticas de acesso</li>
        <li><strong>Treinamento:</strong> Capacitação de equipe interna em gerenciamento cloud</li>
        <li><strong>Suporte:</strong> Contrato de suporte e gerenciamento contínuo opcional</li>
      </ul>

      <h3>ROI e Resultados Esperados</h3>
      <p>Nossos clientes relatam resultados impressionantes:</p>
      <ul>
        <li><strong>Redução de Custos:</strong> 30-50% de economia em infraestrutura anualmente</li>
        <li><strong>Melhor Performance:</strong> 40-70% de melhoria em tempo de resposta</li>
        <li><strong>Escalabilidade:</strong> Capacidade de lidar com 10x mais usuários sem grandes investimentos</li>
        <li><strong>Disaster Recovery:</strong> RTO de horas para minutos</li>
        <li><strong>Disponibilidade:</strong> 99.99% uptime garantido por SLA</li>
        <li><strong>Inovação:</strong> Acesso a novas tecnologias (IA, analytics, IoT) sem grandes investimentos</li>
      </ul>

      <h3>Por Que Escolher a Biss Solutions?</h3>
      <p>Somos parceiros certificados de todas as principais plataformas cloud:</p>
      <ul>
        <li>Certificação Microsoft Azure</li>
        <li>Certificação Amazon AWS (Arquitetos e Especialistas)</li>
        <li>Certificação Google Cloud Platform</li>
        <li>Mais de 50 migrações bem-sucedidas</li>
        <li>Metodologia comprovada e documentada</li>
        <li>Suporte técnico 24/7 disponível</li>
        <li>ROI calculado e garantido</li>
      </ul>

      <h3>Comece Sua Migração para Cloud Hoje</h3>
      <p>Entre em contato conosco para uma avaliação gratuita. Analisaremos sua infraestrutura atual, calcularemos economia potencial, e apresentaremos um plano customizado de migração. Vamos mostrar como cloud pode transformar seu negócio.</p>
    `;
  }
}
