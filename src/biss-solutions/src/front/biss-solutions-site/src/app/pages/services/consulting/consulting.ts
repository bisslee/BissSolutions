import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetail, FAQItem, Testimonial } from '../../../components/service-detail/service-detail';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb';
import { BreadcrumbService } from '../../../services/breadcrumb.service';
import { SeoService } from '../../../services/seo.service';
import { SchemaService } from '../../../services/schema.service';

@Component({
  selector: 'app-consulting',
  standalone: true,
  imports: [CommonModule, ServiceDetail, BreadcrumbComponent],
  templateUrl: './consulting.html',
  styleUrl: './consulting.css'
})
export class Consulting implements OnInit {
  faq: FAQItem[] = [];
  testimonials: Testimonial[] = [];
  conteudoExpandido: string = '';

  constructor(
    private breadcrumbService: BreadcrumbService,
    private seoService: SeoService,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumbs(this.breadcrumbService.getBreadcrumbsForPage('services/consulting'));
    this.seoService.updateSEO(this.seoService.getServiceDetailSEO('Consultoria em TI', 'Consultoria estratégica em TI para transformação digital. Análise, planejamento e otimização de processos tecnológicos.'));
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
        pergunta: 'Quando devo contratar uma consultoria em TI?',
        resposta: 'Considere contratar uma consultoria quando: precisar modernizar infraestrutura, planejar transformação digital, otimizar processos e reduzir custos, preparar migrações tecnológicas, avaliar performance de sistemas, ou alinhar TI com objetivos estratégicos de negócio. Uma consultoria ajuda a tomar decisões fundamentadas e evitar investimentos desnecessários.'
      },
      {
        pergunta: 'Quanto tempo leva um processo de consultoria?',
        resposta: 'Depende da complexidade e escopo. Uma auditoria básica pode levar 2-4 semanas, um planejamento estratégico completo 1-2 meses, e um projeto de transformação digital pode levar 3-6 meses. Sempre começamos com uma fase exploratória para definir escopo e prazo exatos.'
      },
      {
        pergunta: 'O que está incluído no serviço de consultoria?',
        resposta: 'Inclui: auditoria completa de infraestrutura, análise de gaps tecnológicos, roadmap estratégico, plano de ação priorizado, documentação técnica, apresentação para stakeholders, acompanhamento da execução, e suporte durante implementações. Também fornecemos orientação para equipes internas.'
      },
      {
        pergunta: 'Vocês trabalham com empresas de todos os tamanhos?',
        resposta: 'Sim! Atendemos desde startups até grandes corporações. Ajustamos nossa abordagem e metodologia conforme o tamanho e complexidade do seu negócio. Para empresas menores, focamos em soluções práticas e rápidas. Para grandes corporações, aprofundamos em análises detalhadas e transformações complexas.'
      },
      {
        pergunta: 'Como funciona a metodologia de consultoria da Biss Solutions?',
        resposta: 'Utilizamos metodologia estruturada: primeiro fazemos uma auditoria completa para entender o estado atual. Depois, desenvolvemos um roadmap estratégico alinhado com seus objetivos de negócio. Em seguida, priorizamos ações e definimos métricas de sucesso. Por fim, acompanhamos a execução e ajustamos conforme necessário.'
      },
      {
        pergunta: 'Qual é o ROI esperado de uma consultoria em TI?',
        resposta: 'O ROI varia significativamente. Em média, nossos clientes reduzem custos operacionais em 20-40%, aumentam produtividade em 30-50%, e aceleram implementação de projetos em 40%. Isso é possível através de otimizações identificadas, escolha certa de tecnologias, e eliminação de redundâncias. O investimento em consultoria normalmente se paga em 6-12 meses.'
      }
    ];
  }

  private initializeTestimonials(): void {
    this.testimonials = [
      {
        nome: 'Carlos Mendez',
        cargo: 'Gerente de TI',
        empresa: 'Indústria Têxtil',
        texto: 'A consultoria da Biss Solutions transformou completamente nossa infraestrutura. Identificaram ineficiências que nem sabíamos que existiam e apresentaram um roadmap claro. Seguimos suas recomendações e em 6 meses já vimos uma redução de 35% nos custos operacionais.'
      },
      {
        nome: 'Patricia Silva',
        cargo: 'Diretora de Operações',
        empresa: 'E-commerce',
        texto: 'Nossa empresa estava crescendo rápido e precisava de orientação estratégica. A Biss Solutions fez uma análise completa, desenvolveu um plano de ação e nos ajudou na execução. Hoje temos sistemas escaláveis e processos otimizados. Recomendo fortemente!'
      }
    ];
  }

  private initializeConteudoExpandido(): void {
    this.conteudoExpandido = `
      <h2>Transformação Digital com Consultoria Estratégica em TI</h2>
      <p>A <a href="/company">Biss Solutions</a> oferece consultoria especializada em Tecnologia da Informação para empresas que buscam otimizar processos, modernizar infraestrutura e acelerar a transformação digital. Com mais de 20 anos de experiência, nossa equipe de especialistas já ajudou centenas de empresas a alcançarem seus objetivos tecnológicos. Nossos serviços incluem <a href="/services/development">desenvolvimento de software</a> e <a href="/services/cloud">migração para cloud</a>.</p>

      <h3>Nossos Serviços de Consultoria</h3>
      <p>Oferecemos um portfólio completo de serviços de consultoria:</p>

      <h4>Auditoria e Análise de Infraestrutura</h4>
      <p>Avaliamos completamente sua infraestrutura atual, identificando gargalos, riscos e oportunidades de melhoria. Analisamos servidores, redes, sistemas, segurança, licenças e custos. Entregamos um relatório detalhado com diagnóstico e recomendações priorizadas.</p>

      <h4>Planejamento Estratégico e Roadmap Tecnológico</h4>
      <p>Desenvolvemos roadmaps alinhados com seus objetivos de negócio. Definimos prioridades, estimamos investimentos, identificamos dependências e criamos um plano de ação executável. Cada recomendação tem ROI calculado e riscos avaliados.</p>

      <h4>Otimização de Processos</h4>
      <p>Identificamos ineficiências nos seus processos tecnológicos e propomos otimizações. Fazemos reengenharia de fluxos de trabalho, eliminamos redundâncias, automatizamos tarefas repetitivas e implementamos melhores práticas. O resultado é maior produtividade e redução de custos.</p>

      <h4>Migração e Modernização</h4>
      <p>Planejamos e executamos migrações de sistemas legados para tecnologias modernas. Minimizamos riscos através de avaliação detalhada, planejamento cuidadoso e execução controlada. Auxiliamos na escolha das melhores plataformas: Cloud (AWS, Azure, GCP), Containers, Microserviços, etc.</p>

      <h4>Análise de Performance</h4>
      <p>Identificamos gargalos de performance em aplicações, bancos de dados e infraestrutura. Analisamos logs, métricas e comportamento de sistemas. Propomos otimizações específicas que podem resultar em melhorias significativas de performance.</p>

      <h4>Gestão de Mudanças</h4>
      <p>Ajudamos sua equipe a adotar novas tecnologias e processos através de treinamentos, documentação, mudanças organizacionais e apoio na execução. Minimizamos resistência e garantimos transição suave.</p>

      <h3>Benefícios Tangíveis da Consultoria</h3>
      <p>Nossos clientes relatam resultados mensuráveis:</p>
      <ul>
        <li><strong>Redução de Custos:</strong> 20-40% de economia em custos operacionais através de otimizações identificadas</li>
        <li><strong>Melhoria de Performance:</strong> 30-60% de aumento em produtividade de sistemas</li>
        <li><strong>Aceleração de Projetos:</strong> 40-50% de redução no tempo de implementação</li>
        <li><strong>Melhor Tomada de Decisão:</strong> Dados e análises fundamentadas para investimentos</li>
        <li><strong>Redução de Riscos:</strong> Menos problemas e mais estabilidade operacional</li>
        <li><strong>Alinhamento Estratégico:</strong> TI alinhada com objetivos de negócio</li>
      </ul>

      <h3>Como Funciona Nossa Metodologia</h3>
      <p>Utilizamos uma metodologia estruturada e comprovada:</p>

      <h4>Fase 1: Descoberta e Análise (2-4 semanas)</h4>
      <p>Entendemos profundamente seu contexto: objetivos de negócio, infraestrutura atual, processos, equipes, orçamentos e timelines. Realizamos entrevistas, workshops, coleta de dados e análises técnicas.</p>

      <h4>Fase 2: Diagnóstico e Planejamento (2-3 semanas)</h4>
      <p>Analisamos todos os dados coletados, identificamos gaps, oportunidades e riscos. Desenvolvemos roadmap estratégico, priorizamos ações e calculamos ROI de cada recomendação.</p>

      <h4>Fase 3: Apresentação e Validação (1 semana)</h4>
      <p>Apresentamos conclusões e recomendações para stakeholders. Validamos suposições, refinamos propostas e conquistamos buy-in da organização. Defininimos prioridades e investimentos.</p>

      <h4>Fase 4: Execução e Acompanhamento (contínuo)</h4>
      <p>Acompanhamos execução do plano, fornecemos suporte técnico, ajustamos quando necessário e garantimos que objetivos sejam alcançados. Realizamos revisões periódicas e otimizações contínuas.</p>

      <h3>Por Que Escolher a Biss Solutions para Consultoria?</h3>
      <p>Somos a escolha certa porque:</p>
      <ul>
        <li>Mais de 20 anos de experiência em TI</li>
        <li>Metodologia comprovada com centenas de projetos bem-sucedidos</li>
        <li>Equipe multidisciplinar (arquitetos, desenvolvedores, DevOps, especialistas de negócio)</li>
        <li>Abordagem prática focada em resultados mensuráveis</li>
        <li>Transparência total com documentação completa</li>
        <li>Acompanhamento contínuo e suporte na execução</li>
        <li>ROI claramente calculado e demonstrado</li>
      </ul>

      <h3>Próximos Passos</h3>
      <p>Quer descobrir como nossa consultoria pode ajudar sua empresa? Entre em contato para uma conversa inicial gratuita. Vamos entender suas necessidades e apresentar como podemos apoiar sua transformação digital.</p>
    `;
  }
}
