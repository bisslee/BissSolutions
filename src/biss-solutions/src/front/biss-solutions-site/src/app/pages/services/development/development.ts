import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetail, FAQItem, Testimonial } from '../../../components/service-detail/service-detail';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb';
import { BreadcrumbService } from '../../../services/breadcrumb.service';
import { SeoService } from '../../../services/seo.service';
import { SchemaService } from '../../../services/schema.service';

@Component({
  selector: 'app-development',
  standalone: true,
  imports: [CommonModule, ServiceDetail, BreadcrumbComponent],
  templateUrl: './development.html',
  styleUrl: './development.css'
})
export class Development implements OnInit {
  faq: FAQItem[] = [];
  testimonials: Testimonial[] = [];
  conteudoExpandido: string = '';

  constructor(
    private breadcrumbService: BreadcrumbService,
    private seoService: SeoService,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumbs(this.breadcrumbService.getBreadcrumbsForPage('services/development'));
    this.seoService.updateSEO(this.seoService.getServiceDetailSEO('Desenvolvimento de Software', 'Desenvolvimento de software personalizado com .NET, Angular e Python. Mais de 20 anos de experiência.'));
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
        pergunta: 'Quanto tempo leva para desenvolver uma aplicação completa?',
        resposta: 'O tempo de desenvolvimento depende do escopo e complexidade do projeto. Uma aplicação simples (MVP) pode levar 2-3 meses, enquanto sistemas complexos de gestão podem levar 6-12 meses. Utilizamos metodologias ágeis com entregas incrementais para que você veja resultados desde o início do projeto.'
      },
      {
        pergunta: 'Qual tecnologia é melhor para meu projeto: .NET, Angular ou Python?',
        resposta: 'Avaliamos cada caso individualmente. .NET é ideal para aplicações empresariais robustas e integrações com Windows. Angular oferece excelente estrutura para interfaces modernas e complexas. Python é perfeito para soluções com IA/ML e processamento de dados. Durante a consultoria inicial, analisamos suas necessidades e recomendamos a melhor stack tecnológica.'
      },
      {
        pergunta: 'Vocês oferecem manutenção e suporte após o desenvolvimento?',
        resposta: 'Sim! Oferecemos contratos de manutenção e suporte técnico 24/7 para aplicações em produção. Isso inclui atualizações de segurança, correção de bugs, evolução de funcionalidades e otimizações de performance. Também fornecemos documentação técnica completa para facilitar futuras manutenções.'
      },
      {
        pergunta: 'Como vocês garantem a qualidade do código desenvolvido?',
        resposta: 'Utilizamos várias práticas para garantir qualidade: code reviews sistemáticos, testes automatizados (unitários, integração e E2E), CI/CD para entrega contínua, análise estática de código, pair programming, e documentação técnica completa. Além disso, seguimos padrões de codificação (SOLID, Clean Code) e realizamos refatorações constantes.'
      },
      {
        pergunta: 'Vocês trabalham com desenvolvimento ágil?',
        resposta: 'Sim! Utilizamos metodologias ágeis (Scrum/Kanban) com sprints de 2 semanas, daily meetings, retrospectivas e feedback contínuo. Assim você acompanha o progresso em tempo real, tem transparência completa sobre as entregas e pode ajustar prioridades conforme as necessidades do negócio.'
      },
      {
        pergunta: 'Quais são os principais diferenciais da Biss Solutions em desenvolvimento?',
        resposta: 'Temos mais de 20 anos de experiência no mercado, equipe especializada em múltiplas tecnologias modernas, metodologias ágeis comprovadas, foco em qualidade através de testes automatizados, suporte 24/7 disponível, e gerenciamento transparente com entregas incrementais e comunicação constante.'
      }
    ];
  }

  private initializeTestimonials(): void {
    this.testimonials = [
      {
        nome: 'Equipe Acervo SCCP',
        cargo: 'Gestor de Projetos',
        empresa: 'Acervo Santos FC',
        texto: 'A Biss Solutions desenvolveu um sistema completo de gestão de arquivos históricos para nós. O projeto foi entregue no prazo, com qualidade excepcional e suporte técnico eficiente. Recomendo!'
      },
      {
        nome: 'Diretor de TI',
        cargo: 'Diretor de Tecnologia',
        empresa: 'Empresa Eudoxia',
        texto: 'Trabalhamos com a Biss Solutions no desenvolvimento de nossa plataforma de cursos online. A equipe é muito experiente, utilizou as melhores tecnologias e o resultado superou nossas expectativas. Sistema robusto e escalável.'
      }
    ];
  }

  private initializeConteudoExpandido(): void {
    this.conteudoExpandido = `
      <h2>Por Que Escolher a Biss Solutions para Desenvolvimento de Software?</h2>
      <p>Com mais de 20 anos de experiência no mercado, a <a href="/company">Biss Solutions</a> se consolidou como uma das principais empresas de desenvolvimento de software do Brasil. Nossa equipe especializada já desenvolveu centenas de projetos bem-sucedidos para empresas de diversos setores. Veja nossos <a href="/clients">cases de sucesso</a>.</p>

      <h3>Nossa Experiência e Expertise</h3>
      <p>Trabalhamos com as tecnologias mais modernas e eficientes do mercado. Nossa stack principal inclui:</p>
      <ul>
        <li><strong>.NET Ecosystem:</strong> Desenvolvimento com .NET 8+, ASP.NET Core, Entity Framework Core e arquitetura de microserviços. Ideal para aplicações empresariais de alto desempenho.</li>
        <li><strong>Angular & TypeScript:</strong> Interfaces modernas e responsivas com Angular 17+, utilizando Signals, Standalone Components e Server-Side Rendering para máxima performance.</li>
        <li><strong>Python & Django:</strong> Desenvolvimento ágil com Python para APIs RESTful, aplicações de IA/ML e processamento de dados em larga escala.</li>
        <li><strong>Docker & Kubernetes:</strong> Containerização e orquestração para deployment automatizado, escalabilidade e portabilidade entre ambientes.</li>
      </ul>

      <h3>Nossa Metodologia de Desenvolvimento</h3>
      <p>Utilizamos metodologias ágeis comprovadas para garantir entregas de qualidade alinhadas com as necessidades do cliente:</p>

      <h4>Scrum & Kanban</h4>
      <p>Gestão de projetos com sprints curtas (2 semanas), entregas incrementais e feedback contínuo. Você acompanha o progresso em tempo real através de reuniões semanais e relatórios detalhados.</p>

      <h4>DevOps & CI/CD</h4>
      <p>Integração e deployment contínuos para garantir velocidade e qualidade nas entregas. Automatizamos testes, builds e deployments para reduzir erros e acelerar o time-to-market.</p>

      <h4>Testes Automatizados</h4>
      <p>Cobertura de testes unitários, integração e E2E para garantir qualidade e reduzir bugs em produção. TDD (Test-Driven Development) quando aplicável.</p>

      <h3>Casos de Sucesso em Desenvolvimento</h3>
      <p>Já desenvolvemos diversos projetos de sucesso. Destaque para:</p>

      <h4>Acervo SCCP - Sistema de Gestão de Arquivos</h4>
      <p><strong>Cliente:</strong> Acervo SCCP (Santos FC)<br>
      <strong>Tecnologias:</strong> Angular 15+, .NET 6, PostgreSQL<br>
      <strong>Resultado:</strong> Sistema completo de gestão de documentos históricos com mais de 100.000 itens catalogados, reduzindo tempo de busca em 80%.</p>

      <h4>Eudoxia - Plataforma de Cursos Online</h4>
      <p><strong>Cliente:</strong> Eudoxia<br>
      <strong>Tecnologias:</strong> Angular 17, .NET 8, Azure<br>
      <strong>Resultado:</strong> Plataforma LMS completa com gestão de alunos, pagamentos e conteúdo, processando mais de 5.000 usuários simultâneos.</p>

      <h3>Quer Descobrir Como Podemos Ajudar Seu Projeto?</h3>
      <p>Entre em contato conosco para uma consultoria gratuita. Analisaremos suas necessidades e apresentaremos uma proposta personalizada com a melhor tecnologia para seu caso.</p>
    `;
  }
}
