# Biss Solutions - Site Corporativo

Site corporativo moderno e responsivo desenvolvido com **Angular 20** para a empresa Biss Solutions.

## 🚀 Características

- **Design Moderno**: Interface limpa e profissional seguindo as melhores práticas de UX/UI
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Carrossel Interativo**: Hero section com slides automáticos e controles manuais
- **Navegação Intuitiva**: Menu de navegação com todas as seções principais
- **Formulário de Contato**: Sistema de contato funcional integrado com API
- **Componentes Modulares**: Arquitetura baseada em componentes reutilizáveis
- **Performance Otimizada**: Build otimizado e lazy loading implementado

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Angular 20, TypeScript, HTML5, CSS3
- **Build**: Angular CLI, Webpack
- **API Integration**: HTTP Client para integração com backend
- **Design**: CSS Grid, Flexbox, CSS Custom Properties
- **Responsividade**: Mobile-first approach

## 📁 Estrutura do Projeto

```text
src/biss-solutions-app/
├── src/app/
│   ├── components/                   # Componentes reutilizáveis
│   │   ├── header/                   # Cabeçalho da aplicação
│   │   ├── footer/                   # Rodapé da aplicação
│   │   ├── carousel/                 # Carrossel de imagens
│   │   ├── menu/                     # Menu de navegação
│   │   ├── contact-form/             # Formulário de contato
│   │   ├── partners/                 # Seção de parceiros
│   │   └── ...                       # Outros componentes
│   ├── pages/                        # Páginas da aplicação
│   │   ├── home/                     # Página inicial
│   │   ├── company/                  # Sobre a empresa
│   │   ├── services/                 # Serviços oferecidos
│   │   ├── products/                 # Produtos disponíveis
│   │   ├── clients/                  # Cases de sucesso
│   │   ├── contact/                  # Formulário de contato
│   │   └── ...                       # Outras páginas
│   ├── services/                     # Serviços Angular
│   │   ├── contact.service.ts        # Serviço de contato
│   │   ├── seo.service.ts            # Serviço de SEO
│   │   └── image-optimization.service.ts
│   └── app.routes.ts                 # Configuração de rotas
├── public/                           # Assets estáticos
│   ├── images/                       # Imagens e logos
│   └── favicon.ico                   # Favicon
└── package.json                      # Dependências do projeto
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Visual Studio Code ou editor de preferência
- Navegador web moderno

### Passos para Execução

1. **Clone o repositório**

   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd BissSolutions.Site
   ```

2. **Navegue para o projeto Angular**

   ```bash
   cd src/biss-solutions-app
   ```

3. **Instale as dependências**

   ```bash
   npm install
   ```

4. **Execute o projeto em desenvolvimento**

   ```bash
   npm start
   ```

5. **Abre no navegador**
   - A aplicação estará disponível em: `http://localhost:4200`
   - O navegador deve abrir automaticamente

### Build para Produção

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/biss-solutions-app/`

## 📱 Páginas Disponíveis

- **Home** (`/`) - Página inicial com carrossel e seções principais
- **Empresa** (`/company`) - Informações sobre a empresa
- **Serviços** (`/services`) - Detalhes dos serviços oferecidos
  - **Desenvolvimento de Software** (`/services/software-development`)
  - **Consultoria** (`/services/consulting`)
  - **Suporte Técnico** (`/services/technical-support`)
  - **Segurança da Informação** (`/services/information-security`)
  - **Soluções em Nuvem** (`/services/cloud-solutions`)
  - **Analytics e BI** (`/services/analytics-bi`)
- **Produtos** (`/products`) - Catálogo de produtos
- **Clientes** (`/clients`) - Cases de sucesso e depoimentos
- **Sobre** (`/about`) - Informações adicionais sobre a empresa
- **Contato** (`/contact`) - Formulário de contato integrado com API
- **Termos de Uso** (`/terms`) - Termos e condições
- **Política de Privacidade** (`/privacy`) - Política de privacidade

## 🎨 Personalização

### Cores Principais

- **Azul Corporativo**: `#2563eb`
- **Azul Escuro**: `#1e40af`
- **Verde Accent**: `#10b981`
- **Cinza Claro**: `#f8fafc`
- **Cinza Médio**: `#64748b`

### Fontes

- **Principal**: Inter (Google Fonts)
- **Fallback**: Arial, sans-serif

### Breakpoints Responsivos

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: até 767px

## 🔧 Funcionalidades Implementadas

- **Carrossel Automático**: Slides com transições suaves e controles manuais
- **Navegação Responsiva**: Menu hamburger para mobile
- **Formulário de Contato**: Integração com API da Biss Solutions
- **Componentes Modulares**: Arquitetura baseada em componentes reutilizáveis
- **SEO Otimizado**: Meta tags e estrutura semântica
- **Botões Flutuantes**: WhatsApp e formulário de contato
- **Sistema de Toaster**: Notificações para feedback do usuário
- **Otimização de Imagens**: Componente para carregamento otimizado

## 📸 Imagens e Assets

Todas as imagens estão localizadas em `public/images/` e incluem:

- Logo da empresa em diferentes variações
- Imagens de fundo para o carrossel
- Imagens ilustrativas para as seções
- Logos de clientes e parceiros
- Ícones e elementos visuais

## 🌐 Deploy

### Build para Produção

```bash
npm run build
```

### Deploy Estático

- **Netlify**: Arraste a pasta `dist/biss-solutions-app/` para o Netlify
- **Vercel**: Conecte o repositório e configure o build
- **GitHub Pages**: Use GitHub Actions para deploy automático
- **Azure Static Web Apps**: Deploy direto do repositório

### Docker (Opcional)

```bash
# Criar Dockerfile para servir arquivos estáticos
docker build -t biss-solutions .
docker run -p 8080:80 biss-solutions
```

## 🔗 Integração com API

O formulário de contato está integrado com a API oficial da Biss Solutions:

- **Endpoint**: `https://mktools.biss.com.br/api/Contact/BissSolutions`
- **Método**: POST
- **Campos**: Nome, E-mail, Telefone, Empresa (opcional), Assunto, Mensagem
- **Validação**: Campos obrigatórios e formato de e-mail
- **Feedback**: Sistema de toaster para confirmação e erros

Para mais detalhes, consulte o arquivo `API_INTEGRATION.md` no projeto.

## 📞 Suporte

Para dúvidas ou suporte técnico:

- **E-mail**: contato@biss.com.br
- **Telefone**: (11) 95273-9399
- **WhatsApp**: [Link direto](https://wa.me/5511952739399)
- **Horário**: Segunda a Sexta, 8h às 18h

## 📄 Licença

Este projeto é propriedade da Biss Solutions. Todos os direitos reservados.

---

## Desenvolvido com ❤️ pela equipe Biss Solutions
