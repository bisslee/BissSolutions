# Biss Solutions - Aplicação Angular

Esta é a aplicação web da Biss Solutions, desenvolvida em Angular 17 com componentes modulares e responsivos.

## 🚀 Funcionalidades

### Componentes Criados

#### 1. **Menu** (`app-menu`)
- Navegação responsiva com suporte a submenus
- Estilo adaptável para header e footer
- Suporte a mobile com menu hamburger

#### 2. **Social** (`app-social`)
- Links para redes sociais com ícones
- Cores personalizadas para cada plataforma
- Efeitos hover animados

#### 3. **Carrossel** (`app-carousel`)
- Slides automáticos com controles manuais
- Indicadores de navegação
- Suporte a overlay personalizado
- Responsivo para todos os dispositivos

#### 4. **Breadcrumb** (`app-breadcrumb`)
- Navegação hierárquica
- Links clicáveis para navegação
- Estilo consistente com o design

#### 5. **Blocos de Seção** (`app-section-block`)
- Cards com imagem, título, texto e botão
- Efeitos hover com elevação
- Botão "Saiba Mais" configurável
- Layout responsivo em grid

#### 6. **Parceiros** (`app-partners`)
- Grid de logos de parceiros
- Imagens clicáveis que abrem sites em nova aba
- Efeito hover com overlay informativo
- Filtro grayscale que se remove no hover

#### 7. **Header** (`app-header`)
- Top bar com informações de contato
- Navegação principal com logo
- Menu responsivo para mobile
- Integração com componentes de menu e social

#### 8. **Footer** (`app-footer`)
- Informações da empresa
- Links rápidos e serviços
- Redes sociais
- Copyright e links legais

#### 9. **Formulário de Contato** (`app-contact-form`)
- Validação de campos obrigatórios
- Estados de loading e sucesso
- Layout responsivo em grid
- Integração com botão flutuante

#### 10. **Botão Flutuante de Contato** (`app-contact-float`)
- Botão flutuante com animação
- Abre formulário de contato em modal
- Overlay para foco no formulário
- Posicionamento responsivo

#### 11. **Botão Flutuante do WhatsApp** (`app-whatsapp-float`)
- Botão flutuante do WhatsApp
- Link direto para conversa
- Mensagem pré-definida configurável
- Animação de pulse

## 📱 Responsividade

Todos os componentes são totalmente responsivos com breakpoints:
- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** até 767px

## 🎨 Design System

### Cores
- **Primária:** #2563eb (Azul)
- **Secundária:** #1e40af (Azul Escuro)
- **Accent:** #10b981 (Verde)
- **Neutras:** #f8fafc, #64748b, #1f2937

### Tipografia
- **Fonte Principal:** Inter (fallback para system fonts)
- **Hierarquia:** H1 (48-64px), H2 (36-42px), H3 (24-30px)

## 🛠️ Como Usar

### 1. Importar Componentes

```typescript
import { 
  HeaderComponent, 
  FooterComponent, 
  CarouselComponent,
  // ... outros componentes
} from './components';
```

### 2. Usar no Template

```html
<app-header (menuItemClick)="onMenuItemClick($event)"></app-header>

<app-carousel [slides]="carouselSlides"></app-carousel>

<app-section-block [block]="serviceBlock"></app-section-block>

<app-footer></app-footer>
```

### 3. Configurar Dados

```typescript
carouselSlides = [
  {
    id: 1,
    image: 'assets/images/slide1.jpg',
    title: 'Título do Slide',
    subtitle: 'Subtítulo',
    description: 'Descrição...',
    buttonText: 'Saiba Mais',
    buttonLink: '/servicos'
  }
];

services = [
  {
    id: 1,
    image: 'assets/images/service1.jpg',
    title: 'Título do Serviço',
    text: 'Descrição do serviço...',
    buttonText: 'Saiba Mais',
    buttonLink: '/servicos/desenvolvimento'
  }
];
```

## 📁 Estrutura de Arquivos

```
src/app/
├── components/
│   ├── menu/
│   ├── social/
│   ├── carousel/
│   ├── breadcrumb/
│   ├── section-block/
│   ├── partners/
│   ├── header/
│   ├── footer/
│   ├── contact-form/
│   ├── contact-float/
│   ├── whatsapp-float/
│   └── index.ts
├── pages/
│   └── home/
└── app.ts
```

## 🔧 Configurações

## 🌐 API Integration

O formulário de contato está integrado com a API da Biss Solutions:

**Endpoint:** `https://mktools.biss.com.br/api/Contact/BissSolutions`

**Campos obrigatórios:**
- `fullName` - Nome completo
- `email` - E-mail válido
- `phone` - Telefone
- `subject` - Assunto
- `message` - Mensagem

**Campo opcional:**
- `company` - Empresa

**Resposta de sucesso:**
```json
{
  "message": "Mensagem enviada com sucesso!",
  "contactId": "uuid-do-contato"
}
```

**Tratamento de erros:**
- Validação de campos obrigatórios
- Tratamento de erros de conexão
- Mensagens de erro amigáveis para o usuário

### WhatsApp
```typescript
<app-whatsapp-float 
  phoneNumber="5511952729399"
  message="Mensagem personalizada"
></app-whatsapp-float>
```

### Formulário de Contato
```typescript
<app-contact-form
  title="Título Personalizado"
  description="Descrição personalizada"
  (formSubmit)="onFormSubmit($event)"
></app-contact-form>
```

### Carrossel
```typescript
<app-carousel 
  [slides]="slides"
  [autoPlay]="true"
  [autoPlayInterval]="5000"
></app-carousel>
```

## 🚀 Executar o Projeto

1. **Instalar dependências:**
```bash
npm install
```

2. **Executar em desenvolvimento:**
```bash
npm start
```

3. **Build para produção:**
```bash
npm run build
```

## 📝 Próximos Passos

- [x] Integrar com backend/API
- [ ] Criar páginas para cada item do menu
- [ ] Implementar sistema de rotas
- [ ] Adicionar conteúdo específico para cada página
- [ ] Implementar SEO e meta tags
- [ ] Adicionar testes unitários
- [ ] Otimizar performance e acessibilidade

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é propriedade da Biss Solutions.
