# 🚀 To-Do List - Versão 3.0.0: Admin de Conteúdo

## 📋 Visão Geral

Implementar sistema de **Admin de Conteúdo** para gerenciar dinamicamente o conteúdo do site através de uma interface administrativa protegida por senha.

---

## 🎯 FASE 1: Autenticação com Entity Framework Identity

### Backend (API)

- [x] **1.1. Adicionar Pacotes do Identity**
  - ✅ `Microsoft.AspNetCore.Identity.EntityFrameworkCore` (v10.0.0)
  - ✅ `Microsoft.AspNetCore.Authentication.JwtBearer` (v10.0.0)

- [x] **1.2. Criar Model AdminUser (herda de IdentityUser)**
  - ✅ Model `AdminUser` : `IdentityUser`
  - ✅ Propriedades adicionais: `FullName`, `CreatedAt`, `LastLoginAt`, `IsActive`
  - ✅ Configuração no DbContext

- [x] **1.3. Atualizar ApplicationDbContext**
  - ✅ Herdar de `IdentityDbContext<AdminUser>`
  - ✅ Manter DbSets existentes (Pages, Components, etc.)

- [x] **1.4. Configurar Identity no Program.cs**
  - ✅ `AddIdentity<AdminUser, IdentityRole>()`
  - ✅ Configurações de senha (complexidade, lockout, etc.)
  - ✅ Configurar JWT Bearer Authentication

- [x] **1.5. Criar DTOs de Autenticação**
  - ✅ `LoginRequest` (Email, Password)
  - ✅ `LoginResponse` (Token, RefreshToken, Expiration, UserInfo)
  - ✅ `UserInfo` (Id, Email, FullName, UserName)

- [x] **1.6. Criar Controller de Autenticação**
  - ✅ `POST /api/admin/auth/login` - Login com Identity e JWT
  - ✅ `POST /api/admin/auth/logout` - Logout
  - ✅ `GET /api/admin/auth/me` - Informações do usuário logado

- [x] **1.7. Configurar Autenticação**
  - ✅ JWT Bearer Authentication configurado
  - ✅ Middleware de autenticação no pipeline
  - ✅ Rotas `/api/admin/*` podem ser protegidas com `[Authorize]`

- [x] **1.8. Criar JwtService**
  - ✅ Interface `IJwtService`
  - ✅ Implementação `JwtService` com geração e validação de tokens
  - ✅ Refresh token support

- [x] **1.9. Configurar JWT no appsettings.json**
  - ✅ Configuração `JwtSettings` (SecretKey, Issuer, Audience, ExpirationInMinutes)
  - ✅ Configuração `AdminSettings` (DefaultAdminEmail, DefaultAdminPassword)
  - ✅ Seed inicial com usuário admin padrão

- [x] **1.10. Seed de Usuário Admin Inicial**
  - ✅ Atualizado `SeedData` para criar usuário admin inicial
  - ✅ Criação automática de role "Admin"
  - ✅ Atribuição de role ao usuário admin

### Frontend (Angular)

- [x] **1.11. Criar Página de Login Admin**
  - ✅ Rota `/admin/login`
  - ✅ Formulário simples (usuário/senha)
  - ✅ Integração com API de autenticação
  - ✅ Guard para proteger rota `/admin`

- [x] **1.12. Criar Serviço de Autenticação (Frontend)**
  - ✅ `auth.service.ts`
  - ✅ Métodos: login(), logout(), isAuthenticated()
  - ✅ Armazenar token no localStorage

- [x] **1.13. Criar Guard de Autenticação**
  - ✅ `admin.guard.ts`
  - ✅ Proteger todas as rotas `/admin/*`
  - ✅ Redirecionar para `/admin/login` se não autenticado

- [x] **1.14. Criar Interceptor HTTP**
  - ✅ Adicionar token nas requisições para `/api/admin/*`
  - ✅ Tratar erro 401 (deslogar automaticamente)

---

## 🎯 FASE 2: Estrutura Base do Admin

### Backend (API)

- [x] **2.1. Criar Models Adicionais**
  - ✅ `Service` (Serviços) - Guid Id, Title, Description, Image, Slug, ServiceTypes, IsNew, IsFeatured, IsActive, Order
  - ✅ `Partner` (Parceiros) - Guid Id, Name, Logo, Website, Description, IsActive, Order
  - ✅ `Product` (Produtos) - Guid Id, Title, Description, CurrentVersion, TechnologyItems, Features, NugetLink, DocumentationLink, GithubLink, ProductLink, Image, Price, Category, IsActive, Order
  - ✅ `Company` (Informações da Empresa) - Guid Id, Mission, Vision, Values, History, Description, IsActive
  - ✅ `Client` (Clientes) - Guid Id, Name, Versions, Description, ServicesProvided, Logo, ProjectImage, ProjectLink, Website, IsActive, Order

- [x] **2.2. Atualizar ApplicationDbContext**
  - ✅ Adicionados DbSets:
    - ✅ `DbSet<Service> Services`
    - ✅ `DbSet<Partner> Partners`
    - ✅ `DbSet<Product> Products`
    - ✅ `DbSet<Company> Companies`
    - ✅ `DbSet<Client> Clients`

- [x] **2.3. Criar Migrations**
  - ✅ Migration `InitialEntitiesWithGuid` criada
  - ✅ Todos os IDs convertidos para GUID (uniqueidentifier)
  - ✅ Tabelas criadas com relacionamentos

### Frontend (Angular)

- [x] **2.4. Criar Layout Base do Admin**
  - ✅ Componente `admin-layout`
  - ✅ Header com logo e botão de logout
  - ✅ Sidebar com menu de navegação
  - ✅ Área de conteúdo principal
  - ✅ Rota base `/admin`

- [x] **2.5. Criar Página Dashboard Admin**
  - ✅ Rota `/admin` ou `/admin/dashboard`
  - ✅ Cards com estatísticas:
    - ✅ Total de serviços (integração com API)
    - ⏳ Total de parceiros (preparado)
    - ⏳ Total de produtos (preparado)
    - ⏳ Mensagens de contato (preparado)

- [x] **2.6. Criar Menu de Navegação Admin**
  - ✅ Links para:
    - ✅ Dashboard
    - ✅ Serviços
    - ✅ Parceiros
    - ✅ Clientes
    - ⏳ Produtos
    - ⏳ Sobre o Site
    - ⏳ Empresa
    - ✅ Sair

---

## 🎯 FASE 3: Gerenciamento de Serviços ✅ COMPLETA

### Backend (API)

- [x] **3.1. Criar Service de Serviços**
  - ✅ `IServiceService` e `ServiceService`
  - ✅ CRUD completo: GetAll, GetById, Create, Update, Delete
  - ✅ Soft delete (IsActive)
  - ✅ Geração automática de Slug
  - ✅ Método GetCountAsync com filtros

- [x] **3.2. Criar Controller de Serviços Admin**
  - ✅ `GET /api/admin/services` - Listar todos (incluindo inativos)
  - ✅ `GET /api/admin/services/{id}` - Obter por ID
  - ✅ `GET /api/admin/services/count` - Obter contagem com filtro
  - ✅ `POST /api/admin/services` - Criar novo
  - ✅ `PUT /api/admin/services/{id}` - Atualizar
  - ✅ `PATCH /api/admin/services/{id}/toggle-active` - Alternar status
  - ✅ Protegido com `[Authorize]`

- [x] **3.3. Endpoint Público de Serviços**
  - ✅ `GET /api/services` - Listar apenas ativos (para o site)
  - ✅ `GET /api/services/slug/{slug}` - Obter por slug

### Frontend (Angular)

- [x] **3.4. Criar Lista de Serviços**
  - ✅ Página `/admin/services`
  - ✅ Grid de cards com todos os serviços
  - ✅ Colunas: Imagem, Título, Status, Ações
  - ✅ Botão "Novo Serviço"
  - ✅ Filtros por busca e status

- [x] **3.5. Criar Formulário de Serviço**
  - ✅ Página `/admin/services/new` (criar)
  - ✅ Página `/admin/services/edit/:id` (editar)
  - ✅ Campos:
    - ✅ Título (obrigatório)
    - ✅ Descrição
    - ✅ Slug (auto-gerado a partir do título)
    - ✅ ServiceTypes (multi-select)
    - ✅ Imagem (campo de texto/URL)
    - ✅ IsNew, IsFeatured (checkboxes)
    - ✅ Status (Ativo/Inativo)
    - ✅ Ordem

- [x] **3.6. Integração com API**
  - ✅ Serviço Angular `ServiceService`
  - ✅ Listar, criar, atualizar, deletar
  - ✅ Toggle de status ativo/inativo

---

## 🎯 FASE 4: Gerenciamento de Parceiros ✅ COMPLETA

### Backend (API)

- [x] **4.1. Criar Service de Parceiros**
  - ✅ `IPartnerService` e `PartnerService`
  - ✅ CRUD completo
  - ✅ Soft delete (IsActive)

- [x] **4.2. Criar Controller de Parceiros Admin**
  - ✅ `GET /api/admin/partners` - Listar todos
  - ✅ `GET /api/admin/partners/{id}` - Obter por ID
  - ✅ `POST /api/admin/partners` - Criar novo
  - ✅ `PUT /api/admin/partners/{id}` - Atualizar
  - ✅ `PATCH /api/admin/partners/{id}/toggle-active` - Alternar status
  - ✅ Protegido com `[Authorize]`
  - ⏳ Upload de logo (campo de texto/URL por enquanto)

- [x] **4.3. Endpoint Público de Parceiros**
  - ✅ `GET /api/partners` - Listar apenas ativos
  - ✅ `GET /api/partners/{id}` - Obter por ID

### Frontend (Angular)

- [x] **4.4. Criar Lista de Parceiros**
  - ✅ Página `/admin/partners`
  - ✅ Grid de cards com logos
  - ✅ Botão "Novo Parceiro"
  - ✅ Filtros por busca e status

- [x] **4.5. Criar Formulário de Parceiro**
  - ✅ Página `/admin/partners/new` e `/admin/partners/edit/:id`
  - ✅ Campos:
    - ✅ Nome (obrigatório)
    - ✅ Logo (campo de texto/URL)
    - ✅ Website (URL)
    - ✅ Descrição
    - ✅ Status
    - ✅ Ordem

---

## 🎯 FASE 4.5: Gerenciamento de Clientes ✅ COMPLETA

### Backend (API)

- [x] **4.5.1. Criar Service de Clientes**
  - ✅ `IClientService` e `ClientService`
  - ✅ CRUD completo
  - ✅ Soft delete (IsActive)

- [x] **4.5.2. Criar Controller de Clientes Admin**
  - ✅ `GET /api/admin/clients` - Listar todos
  - ✅ `GET /api/admin/clients/{id}` - Obter por ID
  - ✅ `POST /api/admin/clients` - Criar novo
  - ✅ `PUT /api/admin/clients/{id}` - Atualizar
  - ✅ `PATCH /api/admin/clients/{id}/toggle-active` - Alternar status
  - ✅ Protegido com `[Authorize]`

- [x] **4.5.3. Endpoint Público de Clientes**
  - ✅ `GET /api/clients` - Listar apenas ativos
  - ✅ `GET /api/clients/{id}` - Obter por ID

### Frontend (Angular)

- [x] **4.5.4. Criar Lista de Clientes**
  - ✅ Página `/admin/clients`
  - ✅ Grid de cards com logos e informações
  - ✅ Botão "Novo Cliente"
  - ✅ Filtros por busca e status

- [x] **4.5.5. Criar Formulário de Cliente**
  - ✅ Página `/admin/clients/new` e `/admin/clients/edit/:id`
  - ✅ Campos:
    - ✅ Nome (obrigatório)
    - ✅ Versions
    - ✅ Description
    - ✅ ServicesProvided
    - ✅ Logo, ProjectImage (campos de texto/URL)
    - ✅ ProjectLink, Website (URLs)
    - ✅ Status
    - ✅ Ordem

---

## 🎯 FASE 5: Gerenciamento de Produtos

### Backend (API)

- [ ] **5.1. Criar Service de Produtos**
  - ⏳ `IProductService` e `ProductService`
  - ⏳ CRUD completo
  - ⏳ Soft delete (IsActive)
  - ✅ Model `Product` já existe com todos os campos necessários

- [ ] **5.2. Criar Controller de Produtos Admin**
  - ⏳ `GET /api/admin/products` - Listar todos
  - ⏳ `GET /api/admin/products/{id}` - Obter por ID
  - ⏳ `POST /api/admin/products` - Criar novo
  - ⏳ `PUT /api/admin/products/{id}` - Atualizar
  - ⏳ `PATCH /api/admin/products/{id}/toggle-active` - Alternar status
  - ⏳ Proteger com `[Authorize]`
  - ⏳ Upload de imagem

- [ ] **5.3. Endpoint Público de Produtos**
  - ⏳ `GET /api/products` - Listar apenas ativos
  - ⏳ `GET /api/products/category/{category}` - Filtrar por categoria

### Frontend (Angular)

- [ ] **5.4. Criar Lista de Produtos**
  - ⏳ Página `/admin/products`
  - ⏳ Grid com cards de produtos
  - ⏳ Filtro por categoria
  - ⏳ Botão "Novo Produto"

- [ ] **5.5. Criar Formulário de Produto**
  - ⏳ Página `/admin/products/new` e `/admin/products/edit/:id`
  - ⏳ Campos:
    - ⏳ Título (obrigatório)
    - ⏳ Descrição
    - ⏳ CurrentVersion
    - ⏳ TechnologyItems
    - ⏳ Features
    - ⏳ NugetLink, DocumentationLink, GithubLink, ProductLink
    - ⏳ Imagem (campo de texto/URL)
    - ⏳ Preço (opcional)
    - ⏳ Categoria
    - ⏳ Status
    - ⏳ Ordem

---

## 🎯 FASE 6: Gerenciamento de Conteúdo (Sobre o Site / Empresa)

### Backend (API)

- [ ] **6.1. Criar Service de Company**
  - `ICompanyService` e `CompanyService`
  - Métodos para atualizar Missão, Visão, Valores, História

- [ ] **6.2. Criar Controller de Company Admin**
  - `GET /api/admin/company` - Obter informações atuais
  - `PUT /api/admin/company` - Atualizar informações
  - Endpoint único (não precisa de ID)

- [ ] **6.3. Endpoint Público**
  - `GET /api/company` - Obter informações públicas

- [ ] **6.4. Expandir Model Page para "Sobre o Site"**
  - Usar Pages existente ou criar página específica
  - `GET /api/admin/pages/about-site` - Gerenciar página "Sobre o Site"
  - `PUT /api/admin/pages/about-site` - Atualizar conteúdo

### Frontend (Angular)

- [ ] **6.5. Criar Página de Gerenciamento da Empresa**
  - Página `/admin/company`
  - Seções editáveis:
    - Missão (textarea)
    - Visão (textarea)
    - Valores (lista editável)
    - História (editor de texto rico)

- [ ] **6.6. Criar Página "Sobre o Site"**
  - Página `/admin/about-site`
  - Editor de conteúdo rico
  - Gerenciar estrutura e tecnologia

---

## 🎯 FASE 7: Upload de Imagens

### Backend (API)

- [ ] **7.1. Criar Controller de Upload**
  - `POST /api/admin/upload/image` - Upload de imagem
  - Validar tipo de arquivo (jpg, png, webp, svg)
  - Validar tamanho máximo
  - Salvar em pasta `wwwroot/uploads/`
  - Retornar URL da imagem

- [ ] **7.2. Criar Service de Upload**
  - `IUploadService` e `UploadService`
  - Validação de arquivo
  - Redimensionamento (opcional)
  - Otimização de imagem

### Frontend (Angular)

- [ ] **7.3. Criar Componente de Upload**
  - `image-upload.component.ts`
  - Drag & drop ou seleção de arquivo
  - Preview da imagem
  - Barra de progresso
  - Integração com API de upload

---

## 🎯 FASE 8: Melhorias e Polimento

### Backend (API)

- [ ] **8.1. Validações**
  - Adicionar validações nos Models
  - Validar dados nos Controllers
  - Mensagens de erro claras

- [ ] **8.2. Logs**
  - Log de ações do admin
  - Log de uploads
  - Log de alterações importantes

- [ ] **8.3. Documentação Swagger**
  - Documentar todos os endpoints admin
  - Exemplos de request/response

### Frontend (Angular)

- [ ] **8.4. Editor de Texto Rico**
  - Integrar editor (TinyMCE, Quill, ou Angular Editor)
  - Para descrições longas e conteúdo HTML

- [ ] **8.5. Feedback Visual**
  - Toast/Notificações de sucesso/erro
  - Loading states
  - Confirmações antes de deletar

- [ ] **8.6. Responsividade**
  - Admin responsivo (mobile-friendly)
  - Tabelas responsivas
  - Formulários adaptativos

- [ ] **8.7. Validação de Formulários**
  - Validações client-side
  - Mensagens de erro claras
  - Campos obrigatórios marcados

---

## 📝 Observações Importantes

### Arquitetura Atual (Fase 1)

- Manter estrutura atual da API
- Não fazer refatoração arquitetural ainda
- Foco em funcionalidade

### Próximas Evoluções (Pós v3.0.0)

- Migrar para Clean Architecture
- Implementar DDD
- Separar em camadas (Domain, Application, Infrastructure)
- Repository Pattern
- CQRS (opcional)

### Segurança

- Autenticação simples por senha (fase inicial)
- Depois evoluir para JWT ou Identity
- Rate limiting já existe
- HTTPS em produção

---

## ✅ Checklist de Entrega v3.0.0

- [x] Autenticação funcionando (Backend + Frontend)
- [x] Dashboard admin criado (com cards de estatísticas)
- [x] CRUD de Serviços completo (Backend + Frontend)
- [x] CRUD de Parceiros completo (Backend + Frontend)
- [x] CRUD de Clientes completo (Backend + Frontend)
- [ ] CRUD de Produtos completo
- [ ] Gerenciamento de Empresa funcionando
- [ ] Gerenciamento de "Sobre o Site" funcionando
- [ ] Upload de imagens funcionando (atualmente usando URLs)
- [ ] Testes básicos realizados
- [x] Postman collection atualizada (com GUIDs)
- [x] Migrations criadas com GUIDs
- [ ] Build de produção gerado
- [ ] Versão atualizada para 3.0.0

---

**Data de Início:** 29/11/2025  
**Branch:** `feature/v3.0.0`  
**Objetivo:** Sistema completo de Admin de Conteúdo

---

## 📊 Progresso Atual

### ✅ Concluído
- **FASE 1:** Autenticação (100%) - Backend + Frontend completo
- **FASE 2:** Estrutura Base do Admin (100%) - Layout, Sidebar, Dashboard
- **FASE 3:** Gerenciamento de Serviços (100%) - Backend + Frontend completo
- **FASE 4:** Gerenciamento de Parceiros (100%) - Backend + Frontend completo
- **FASE 4.5:** Gerenciamento de Clientes (100%) - Backend + Frontend completo
- **Infraestrutura:** Migrations com GUIDs, Postman collection atualizada

### ⏳ Em Progresso / Pendente
- **FASE 5:** Gerenciamento de Produtos (0%) - Model existe, falta Service/Controller/Frontend
- **FASE 6:** Gerenciamento de Empresa/Sobre o Site (0%)
- **FASE 7:** Upload de Imagens (0%) - Atualmente usando URLs
- **FASE 8:** Melhorias e Polimento (0%)

### 📝 Observações
- Todos os IDs foram migrados para GUID (uniqueidentifier)
- Postman collection atualizada com exemplos usando GUIDs
- Frontend completamente integrado com backend para Serviços, Parceiros e Clientes
- Sistema de autenticação JWT funcionando
