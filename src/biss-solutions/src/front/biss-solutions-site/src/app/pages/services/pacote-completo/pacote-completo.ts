import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetail, FAQItem, Testimonial } from '../../../components/service-detail/service-detail';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb';
import { BreadcrumbService } from '../../../services/breadcrumb.service';
import { SeoService } from '../../../services/seo.service';
import { SchemaService } from '../../../services/schema.service';

@Component({
  selector: 'app-pacote-completo',
  standalone: true,
  imports: [CommonModule, ServiceDetail, BreadcrumbComponent],
  templateUrl: './pacote-completo.html',
  styleUrl: './pacote-completo.css'
})
export class PacoteCompleto implements OnInit {
  faq: FAQItem[] = [];
  testimonials: Testimonial[] = [];
  conteudoExpandido: string = '';

  constructor(
    private breadcrumbService: BreadcrumbService,
    private seoService: SeoService,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumbs(this.breadcrumbService.getBreadcrumbsForPage('services/pacote-completo'));
    this.seoService.updateSEO(this.seoService.getServiceDetailSEO(
      'Pacote Promocional de Final de Ano - Landing Page + Hospedagem + 5 E-mails por R$ 200',
      '🎄 Promoção de Final de Ano! Pacote completo por R$ 200: Landing Page profissional + Hospedagem 1 ano + 5 e-mails personalizados. Tudo que você precisa para começar a vender online com design moderno e responsivo.'
    ));
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
        pergunta: 'O que está incluído no Pacote Completo por R$ 200?',
        resposta: 'O pacote inclui: Landing Page profissional completa com design moderno e responsivo, hospedagem por 1 ano completo, 5 e-mails profissionais personalizados (ex: contato@seudominio.com.br), SEO básico otimizado, botão de WhatsApp integrado, certificado SSL/HTTPS gratuito, e suporte básico durante todo o período.'
      },
      {
        pergunta: 'Qual é o prazo de entrega?',
        resposta: 'Após o envio de todo o conteúdo necessário (textos, imagens, informações), a entrega é realizada em 1 a 3 dias úteis. Nossa equipe trabalha com agilidade para colocar seu negócio no ar rapidamente.'
      },
      {
        pergunta: 'Preciso ter domínio próprio?',
        resposta: 'Sim, é necessário ter um domínio próprio (ex: seudominio.com.br). Se você ainda não tem, podemos ajudar na compra e configuração do domínio (valor adicional à parte).'
      },
      {
        pergunta: 'Posso atualizar o conteúdo depois?',
        resposta: 'Sim! Após a entrega, oferecemos atualizações de conteúdo básicas. Você também pode solicitar expansões e melhorias adicionais a preços competitivos conforme sua necessidade.'
      },
      {
        pergunta: 'O que acontece após o primeiro ano de hospedagem?',
        resposta: 'Após o primeiro ano, você pode renovar a hospedagem a um preço especial. O valor da renovação será comunicado com antecedência. Os e-mails profissionais continuam funcionando normalmente durante o período de hospedagem.'
      },
      {
        pergunta: 'A landing page funciona bem em celular?',
        resposta: 'Sim! Nossas landing pages são 100% responsivas e otimizadas para funcionar perfeitamente em celulares, tablets e computadores. O design é mobile-first, garantindo excelente experiência em todos os dispositivos.'
      },
      {
        pergunta: 'Como funciona o botão de WhatsApp?',
        resposta: 'O botão de WhatsApp é totalmente integrado. Quando o cliente clicar, será direcionado automaticamente para uma conversa no WhatsApp com sua empresa, facilitando o contato e aumentando as conversões.'
      },
      {
        pergunta: 'Há mensalidades escondidas?',
        resposta: 'Não! O valor de R$ 200,00 é único e inclui tudo descrito no pacote. Não há mensalidades escondidas ou taxas extras. O único valor adicional seria a renovação da hospedagem após o primeiro ano (opcional).'
      }
    ];
  }

  private initializeTestimonials(): void {
    this.testimonials = [
      {
        nome: 'Carlos Silva',
        cargo: 'Empreendedor',
        empresa: 'Loja Online',
        texto: 'Contratei o pacote completo e superou minhas expectativas! Em 2 dias estava tudo no ar, funcionando perfeitamente. A landing page é linda e já estou recebendo contatos pelo WhatsApp. Excelente custo-benefício!'
      },
      {
        nome: 'Ana Paula',
        cargo: 'Consultora',
        empresa: 'Consultoria em Marketing',
        texto: 'Perfeito para quem está começando! O pacote tem tudo que eu precisava: site profissional, hospedagem e emails. O preço é imbatível e a qualidade é excelente. Recomendo muito!'
      },
      {
        nome: 'Roberto Mendes',
        cargo: 'Proprietário',
        empresa: 'Academia Fitness',
        texto: 'Precisava colocar minha academia online rápido e barato. O pacote completo foi a solução perfeita! Em 3 dias estava tudo pronto, os clientes conseguem me encontrar e falar comigo pelo WhatsApp. Vale muito a pena!'
      }
    ];
  }

  private initializeConteudoExpandido(): void {
    this.conteudoExpandido = `
      <h2>🎄 Pacote Promocional de Final de Ano - Tudo para Começar Online por Apenas R$ 200,00</h2>
      <p>🎁 <strong>Aproveite nossa Promoção de Final de Ano!</strong> Quer colocar seu negócio no ar de forma rápida, bonita e barata? Com nosso <strong>Pacote Promocional Completo</strong>, você tem tudo que precisa para começar a vender e ser encontrado online — sem complicação e sem custos altos. Uma oportunidade imperdível para começar 2025 com o pé direito!</p>

      <h3>🚀 O que está incluso por R$ 200,00:</h3>

      <h4>✨ Landing Page Profissional</h4>
      <p>Criamos uma landing page completa e profissional, focada em conversão, com:</p>
      <ul>
        <li><strong>Design moderno e responsivo</strong> - Funciona perfeitamente em celular, tablet e computador</li>
        <li><strong>Estrutura focada em conversão</strong> - Cada elemento pensado para transformar visitantes em clientes</li>
        <li><strong>Seções profissionais:</strong>
          <ul>
            <li>Hero (destaque com chamada principal)</li>
            <li>Sobre o serviço/produto</li>
            <li>Benefícios</li>
            <li>Depoimentos</li>
            <li>Galeria/imagens</li>
            <li>Chamada para ação</li>
            <li>Botão de WhatsApp integrado (clique para conversar)</li>
            <li>Formulário de contato (opcional)</li>
          </ul>
        </li>
      </ul>

      <h4>✨ SEO Básico</h4>
      <p>Para sua página aparecer melhor no Google:</p>
      <ul>
        <li>Title e meta-description otimizados</li>
        <li>Palavras-chave alinhadas ao seu negócio</li>
        <li>Estrutura H1, H2, H3 organizada</li>
        <li>Tags OG para compartilhamento bonito no WhatsApp e redes sociais</li>
      </ul>

      <h4>✨ Hospedagem 1 ano</h4>
      <p>Servidor rápido e estável para manter seu site sempre no ar:</p>
      <ul>
        <li>Servidor rápido e estável</li>
        <li>Certificado de segurança SSL (HTTPS gratuito)</li>
        <li>Suporte básico</li>
        <li>Atualizações e manutenção essenciais</li>
        <li>Backup automático</li>
      </ul>

      <h4>✨ 5 E-mails Profissionais</h4>
      <p>Use endereços profissionais que passam credibilidade:</p>
      <ul>
        <li>contato@seudominio.com.br</li>
        <li>vendas@seudominio.com.br</li>
        <li>seu-nome@seudominio.com.br</li>
        <li>E mais 2 e-mails personalizados</li>
      </ul>
      <p>Passa credibilidade instantânea aos clientes e aumenta a confiança no seu negócio.</p>

      <h3>⭐ Por que esse pacote é ideal?</h3>
      <ul>
        <li><strong>Perfeito para quem está começando</strong> - Tudo que você precisa em um só lugar</li>
        <li><strong>Custo MUITO menor que o mercado</strong> - Economia significativa comparado a contratar cada serviço separadamente</li>
        <li><strong>Entrega rápida</strong> - 1 a 3 dias após envio do conteúdo</li>
        <li><strong>Excelente para anúncios</strong> - Otimizado para campanhas no Google e Instagram</li>
        <li><strong>Fácil de atualizar e expandir</strong> - Base sólida para crescer depois</li>
      </ul>

      <h3>🎯 Preço Promocional de Final de Ano: R$ 200,00</h3>
      <p><strong>🎄 Oferta especial por tempo limitado! Sem mensalidade escondida. Sem taxas extras.</strong></p>
      <p>Um investimento único e promocional que inclui tudo para você começar a vender online hoje mesmo e iniciar 2025 com sucesso!</p>

      <h3>📱 Perfeito para Anúncios</h3>
      <p>Nossa landing page é otimizada especialmente para:</p>
      <ul>
        <li>Campanhas do Google Ads</li>
        <li>Anúncios no Instagram e Facebook</li>
        <li>Tráfego pago em geral</li>
        <li>Captura de leads</li>
        <li>Conversão de visitantes em clientes</li>
      </ul>

      <h3>🚀 Como Funciona?</h3>
      <ol>
        <li><strong>Você entra em contato</strong> - Fale conosco pelo WhatsApp ou formulário de contato</li>
        <li><strong>Envio de conteúdo</strong> - Você nos envia textos, imagens e informações sobre seu negócio</li>
        <li><strong>Desenvolvimento</strong> - Criamos sua landing page profissional (1-3 dias)</li>
        <li><strong>Configuração</strong> - Configuramos hospedagem, domínio, e-mails e SSL</li>
        <li><strong>Entrega</strong> - Seu site está no ar e pronto para receber clientes!</li>
      </ol>

      <h3>💡 Precisa de Mais?</h3>
      <p>Este pacote é perfeito para começar, mas você pode sempre expandir depois:</p>
      <ul>
        <li>Adicionar mais páginas ao site</li>
        <li>E-commerce completo</li>
        <li>SEO avançado</li>
        <li>Google Ads e campanhas</li>
        <li>Redes sociais integradas</li>
      </ul>

      <h3>🎄 Promoção de Final de Ano - Aproveite Agora!</h3>
      <p>Esta é uma <strong>oferta especial de final de ano</strong> com preço promocional. Não perca essa oportunidade única de começar 2025 com seu negócio online profissional!</p>
      
      <h3>📞 Entre em Contato Agora!</h3>
      <p>🎁 Não perca tempo! Entre em contato conosco e coloque seu negócio online hoje mesmo por apenas R$ 200,00.</p>
      <p>Chame no WhatsApp ou preencha nosso formulário de contato. Vamos transformar sua ideia em realidade e você estará pronto para o novo ano com uma presença digital profissional!</p>
    `;
  }
}

