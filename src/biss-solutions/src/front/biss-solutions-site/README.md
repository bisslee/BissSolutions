# Biss Solutions - Site Corporativo

Site corporativo da Biss Solutions, empresa especializada em desenvolvimento de software e soluções em TI com mais de 20 anos de experiência no mercado.

## 🚀 Tecnologias Utilizadas

- **Angular 20.2.0** - Framework principal
- **TypeScript** - Linguagem de desenvolvimento
- **CSS3** - Estilização responsiva
- **PWA** - Progressive Web App
- **Service Worker** - Cache e funcionalidades offline

## 📱 Funcionalidades Implementadas

### ✅ Navegação e Layout
- Design responsivo mobile-first
- Header com navegação principal
- Footer completo com links e informações
- Breadcrumbs em todas as páginas de serviços
- Bottom navigation para mobile

### ✅ Páginas Principais
- **Home** - Página inicial com carrossel e seções principais
- **Empresa** - Sobre a Biss Solutions
- **Serviços** - Lista de serviços oferecidos
  - Desenvolvimento de Software
  - Consultoria em TI
  - Soluções em Cloud
  - Segurança da Informação
  - Suporte Técnico
  - Analytics e BI
- **Produtos** - Produtos desenvolvidos
- **Clientes** - Cases de sucesso
- **Contato** - Formulário de contato

### ✅ Componentes Avançados
- Carrossel responsivo com indicadores
- Cards de serviços interativos
- Sistema de breadcrumbs dinâmico
- Banner de cookies com consentimento
- Botões flutuantes (WhatsApp, LinkedIn)
- PWA install banner
- PWA update notifications

### ✅ SEO e Performance
- Meta tags otimizadas
- Schema.org JSON-LD para breadcrumbs
- Sitemap.xml
- Robots.txt
- Otimização de imagens
- Lazy loading de componentes
- Service Worker para cache

## 🛠️ Desenvolvimento

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
ng serve
```

### Servidor de Desenvolvimento
```bash
ng serve
```
Navegue para `http://localhost:4200/`. A aplicação recarrega automaticamente quando você modifica os arquivos.

### Build de Produção
```bash
ng build --configuration production
```
Os arquivos de build são armazenados no diretório `dist/biss-solutions-site/`.

### Testes
```bash
# Testes unitários
ng test

# Testes e2e
ng e2e
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── breadcrumb/      # Sistema de breadcrumbs
│   │   ├── carousel/        # Carrossel principal
│   │   ├── cookie-banner/   # Banner de cookies
│   │   ├── footer/          # Rodapé
│   │   ├── header/          # Cabeçalho
│   │   └── service-detail/  # Detalhes de serviços
│   ├── pages/               # Páginas da aplicação
│   │   ├── home/           # Página inicial
│   │   ├── services/       # Páginas de serviços
│   │   └── ...
│   ├── services/           # Serviços Angular
│   │   ├── breadcrumb.service.ts
│   │   └── cookie.service.ts
│   └── config/             # Configurações
├── public/                # Arquivos estáticos
│   ├── images/           # Imagens otimizadas
│   ├── sitemap.xml       # Sitemap
│   └── robots.txt        # Robots.txt
└── styles.css            # Estilos globais
```

## 🎨 Design System

### Cores Principais
- **Primary**: Azul corporativo (#2C3850)
- **Secondary**: Azul claro (#4A90E2)
- **Neutral**: Escala de cinzas para textos
- **White**: Fundos e textos claros

### Tipografia
- **Títulos**: Font-weight 700, responsivos
- **Corpo**: Font-weight 400-500, line-height 1.6
- **Botões**: Font-weight 600

### Espaçamento
- Sistema de espaçamento consistente usando CSS custom properties
- Responsivo com breakpoints mobile-first

## 📊 Performance

### Métricas de Build
- **Tamanho inicial**: ~337 kB (91 kB comprimido)
- **Lazy chunks**: 25+ arquivos otimizados
- **CSS**: Otimizado e minificado
- **Imagens**: Otimizadas automaticamente

### PWA Features
- Service Worker ativo
- Cache estratégico
- Install prompt
- Update notifications
- Funcionalidades offline básicas

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
ng serve

# Build de produção
ng build --configuration production

# Testes
ng test
ng e2e

# Linting
ng lint

# Otimização de imagens
node scripts/optimize-images.js
```

## 📋 TODO - Funcionalidades Futuras

### 🎯 Alta Prioridade
- [ ] **Sistema de Blog/Notícias**
  - Página de blog com artigos sobre TI
  - Sistema de categorias e tags
  - Integração com CMS ou API

- [ ] **Formulário de Contato Avançado**
  - Validação em tempo real
  - Integração com email service
  - Captcha para segurança
  - Confirmação por email

- [ ] **Sistema de Depoimentos**
  - Seção de depoimentos de clientes
  - Carrossel de depoimentos
  - Integração com Google Reviews

### 🚀 Média Prioridade
- [ ] **Chat Online**
  - Widget de chat integrado
  - Suporte em tempo real
  - Integração com WhatsApp Business API

- [ ] **Sistema de Portfólio Detalhado**
  - Galeria de projetos
  - Cases de estudo detalhados
  - Filtros por tecnologia/setor

- [ ] **Calculadora de Orçamento**
  - Formulário interativo para estimativa
  - Cálculo automático de custos
  - Geração de proposta básica

- [ ] **Sistema de Newsletter**
  - Cadastro de email
  - Templates de email responsivos
  - Integração com Mailchimp/SendGrid

### 💡 Baixa Prioridade
- [ ] **Sistema de FAQ**
  - Perguntas frequentes organizadas
  - Busca dentro do FAQ
  - Categorização por serviço

- [ ] **Integração com Redes Sociais**
  - Feed do Instagram/LinkedIn
  - Compartilhamento social
  - Botões de follow/like

- [ ] **Sistema de Agendamento**
  - Calendário de disponibilidade
  - Agendamento de reuniões
  - Integração com Google Calendar

- [ ] **Analytics Avançado**
  - Google Analytics 4
  - Heatmaps com Hotjar
  - Tracking de conversões

- [ ] **Internacionalização (i18n)**
  - Suporte a múltiplos idiomas
  - Inglês e Espanhol
  - Seletor de idioma

### 🔧 Melhorias Técnicas
- [ ] **Testes Automatizados**
  - Testes unitários para componentes
  - Testes e2e com Playwright
  - Coverage reports

- [ ] **CI/CD Pipeline**
  - GitHub Actions
  - Deploy automático
  - Testes de regressão

- [ ] **Monitoramento**
  - Error tracking (Sentry)
  - Performance monitoring
  - Uptime monitoring

- [ ] **Acessibilidade**
  - Auditoria de acessibilidade
  - Suporte a screen readers
  - Navegação por teclado

## 📞 Suporte

Para dúvidas sobre o projeto ou contribuições, entre em contato:

- **Email**: contato@biss.com.br
- **Website**: https://biss.com.br
- **LinkedIn**: [Biss Solutions](https://linkedin.com/company/biss-solutions)

## 📄 Licença

Este projeto é propriedade da Biss Solutions. Todos os direitos reservados.

---

**Desenvolvido com ❤️ pela equipe Biss Solutions**
