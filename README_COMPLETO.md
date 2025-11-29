# 🚀 Biss Solutions - Site Corporativo Completo

Projeto completo de site corporativo desenvolvido com **API .NET 8** e **Frontend Angular 17+**, seguindo a especificação mobile-first da Biss Solutions.

## 📋 Visão Geral

Este projeto implementa um site corporativo moderno e responsivo com:

- **Backend**: API REST em .NET 8 com Entity Framework Core e SQL Server
- **Frontend**: SPA Angular 17+ com design mobile-first
- **Design**: Interface otimizada para dispositivos móveis com bottom navigation
- **Ícones**: Sistema completo com Remix Icons
- **Deploy**: Containerização com Docker e docker-compose

## 🏗️ Arquitetura

```
BissSolutions.Site/
├── src/
│   ├── back/                    # API .NET
│   │   └── BissSolutions.Api/
│   │       ├── Controllers/     # API Controllers
│   │       ├── Models/          # Entidades do banco
│   │       ├── Services/        # Lógica de negócio
│   │       ├── Data/            # Entity Framework
│   │       └── Dockerfile       # Container da API
│   └── front/                   # Frontend Angular
│       ├── src/app/
│       │   ├── components/      # Componentes reutilizáveis
│       │   ├── pages/           # Páginas da aplicação
│       │   └── services/        # Serviços Angular
│       └── Dockerfile           # Container do frontend
├── docker-compose.yml           # Orquestração dos containers
└── ESPECIFICACAO_MOBILE_FIRST_BISS_SOLUTIONS.md
```

## 🚀 Tecnologias Utilizadas

### Backend (.NET)
- **.NET 8** - Framework principal
- **Entity Framework Core 8** - ORM
- **SQL Server** - Banco de dados
- **Swagger** - Documentação da API
- **Docker** - Containerização

### Frontend (Angular)
- **Angular 17+** - Framework principal
- **TypeScript 5+** - Linguagem tipada
- **CSS3** - Flexbox, Grid, Custom Properties
- **Remix Icons** - Sistema de ícones
- **RxJS** - Programação reativa

## 📱 Design Mobile-First

### Características Principais
- **Bottom Navigation**: Menu de 6 botões na parte inferior
- **Header Simplificado**: Apenas logo, sem menu hamburger
- **Carrossel Touch-Friendly**: Otimizado para swipe gestures
- **Botões Flutuantes**: WhatsApp e Contato sempre visíveis
- **Footer Completo**: 3 colunas com informações e links
- **Performance**: Otimizado para conexões 3G/4G

### Breakpoints
- **Mobile**: até 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## 🗄️ Estrutura do Banco de Dados

### Entidades Principais
```sql
Pages          # Páginas do site
Components     # Componentes das páginas
Images         # Imagens e assets
Contacts       # Mensagens de contato
```

### Dados Iniciais
O sistema inclui dados iniciais para:
- Páginas principais (Home, Empresa, Clientes, etc.)
- Componentes do carrossel
- Configurações de serviços

## 🎯 Páginas Implementadas

| Página | Rota | Descrição |
|--------|------|-----------|
| Home | `/` | Carrossel, serviços e parceiros |
| Empresa | `/empresa` | Missão, visão, valores e história |
| Clientes | `/clientes` | Cases de sucesso e depoimentos |
| Produtos | `/produtos` | Catálogo de produtos |
| Serviços | `/servicos` | Lista de serviços |
| Contato | `/contato` | Formulário integrado |
| Sobre | `/sobre` | Estrutura e tecnologia |
| Privacy | `/privacy` | Política de privacidade |
| Terms | `/terms` | Termos de uso |

### 🎄 Serviços Especiais

- **Pacote Promocional de Final de Ano** (`/services/pacote-completo`)
  - Landing Page Profissional + Hospedagem 1 ano + 5 e-mails personalizados
  - Preço promocional: R$ 200,00
  - Destaque no carrossel da home

## 🚀 Como Executar

### Pré-requisitos
- Docker e Docker Compose
- Node.js 18+ (para desenvolvimento local)
- .NET 8 SDK (para desenvolvimento local)

### Opção 1: Docker Compose (Recomendado)
```bash
# Clonar o repositório
git clone <repository-url>
cd BissSolutions.Site

# Executar com Docker
docker-compose up -d

# Acessar:
# Frontend: http://localhost
# API: http://localhost:5000
# Swagger: http://localhost:5000/swagger
```

### Opção 2: Desenvolvimento Local

#### Backend (API)
```bash
cd src/back/BissSolutions.Api

# Restaurar dependências
dotnet restore

# Executar migrations
dotnet ef database update

# Executar API
dotnet run
# API disponível em: https://localhost:5001
```

#### Frontend (Angular)
```bash
cd src/front

# Instalar dependências
npm install

# Executar em desenvolvimento
npm start
# Frontend disponível em: http://localhost:4200
```

## 🔧 Configuração

### Variáveis de Ambiente

#### API (.NET)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=BissSolutionsDb;Trusted_Connection=true;"
  }
}
```

#### Frontend (Angular)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
};
```

### CORS
A API está configurada para aceitar requisições do frontend Angular em:
- `http://localhost:4200` (desenvolvimento)
- `https://localhost:4200` (desenvolvimento HTTPS)

## 📊 API Endpoints

### Páginas
- `GET /api/pages` - Listar todas as páginas
- `GET /api/pages/{id}` - Obter página por ID
- `GET /api/pages/slug/{slug}` - Obter página por slug
- `POST /api/pages` - Criar nova página
- `PUT /api/pages/{id}` - Atualizar página
- `DELETE /api/pages/{id}` - Remover página

### Contato
- `POST /api/contact` - Enviar mensagem de contato
- `GET /api/contact` - Listar mensagens (admin)
- `GET /api/contact/{id}` - Obter mensagem por ID

### Swagger
Documentação completa da API disponível em:
- Desenvolvimento: `https://localhost:5001/swagger`
- Produção: `http://localhost:5000/swagger`

## 🎨 Sistema de Design

### Paleta de Cores
```css
:root {
  --primary: #2563eb;      /* Azul principal */
  --primary-dark: #1d4ed8; /* Azul escuro */
  --secondary: #10b981;    /* Verde */
  --accent: #f59e0b;       /* Amarelo */
  --whatsapp: #25d366;     /* WhatsApp */
  --linkedin: #0077b5;     /* LinkedIn */
}
```

### Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Fallback**: Arial, sans-serif
- **Escala Responsiva**: Mobile-first

### Ícones
Sistema completo com Remix Icons:
- Ícones de navegação
- Ícones de serviços
- Ícones de tecnologia
- Ícones de funcionalidades

## 🔒 Segurança

### Implementado
- CORS configurado
- Validação de entrada
- Sanitização de dados
- Headers de segurança (Nginx)

### Recomendações para Produção
- HTTPS obrigatório
- Autenticação JWT
- Rate limiting
- Logs de auditoria
- Backup automático

## 📈 Performance

### Frontend
- Lazy loading de módulos
- Otimização de imagens
- Compressão Gzip
- Cache de assets estáticos
- Service Worker (PWA ready)

### Backend
- Entity Framework otimizado
- Paginação de resultados
- Cache de consultas
- Compressão de resposta

## 🚀 Deploy

### Produção com Docker
```bash
# Build e deploy
docker-compose -f docker-compose.yml up -d

# Verificar status
docker-compose ps

# Logs
docker-compose logs -f
```

### Deploy Manual
1. Build da API: `dotnet publish -c Release`
2. Build do Frontend: `npm run build`
3. Configurar servidor web (Nginx/Apache)
4. Configurar banco de dados

## 📞 Suporte

Para dúvidas ou suporte técnico:

- **E-mail**: contato@biss.com.br
- **Telefone**: (11) 95273-9399
- **WhatsApp**: [Link direto](https://wa.me/5511952739399)
- **Horário**: Segunda a Sexta, 10h às 20h

## 📄 Licença

Este projeto é propriedade da Biss Solutions. Todos os direitos reservados.

---

## 🎯 Próximos Passos

### Fase 2 - Funcionalidades Avançadas
- [ ] Sistema de autenticação
- [ ] Portal do cliente
- [ ] Blog integrado
- [ ] Chat em tempo real
- [ ] Analytics avançado

### Fase 3 - Otimizações
- [ ] PWA completo
- [ ] Multi-idioma
- [ ] Dark mode
- [ ] Notificações push
- [ ] SEO avançado

---

## 📝 Changelog

### Versão 2.6.2 - Dezembro 2024

#### 🎄 Novidades
- **Pacote Promocional de Final de Ano** adicionado
  - Novo serviço: Landing Page + Hospedagem + 5 E-mails por R$ 200
  - Página detalhada completa com FAQ e depoimentos
  - Destaque no carrossel da home
  - Card destacado na página de serviços

#### 🔧 Melhorias
- Versão do site atualizada para 2.6.2
- Sincronização de versões entre package.json e version.service.ts

#### 📄 Documentação
- README atualizado com novo serviço promocional

---

**Desenvolvido com ❤️ pela equipe Biss Solutions**

*Versão 2.6.2 - Dezembro 2024*
