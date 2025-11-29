# 🚀 To-Do List - Versão 3.0.0: Admin de Conteúdo

## 📋 Visão Geral

Implementar sistema de **Admin de Conteúdo** para gerenciar dinamicamente o conteúdo do site através de uma interface administrativa protegida por senha.

---

## 🎯 FASE 1: Autenticação Simples por Senha

### Backend (API)

- [ ] **1.1. Criar Model de Admin**
  - Model `Admin` ou `AdminUser` com:
    - Id
    - Username (ou email)
    - Password (hash)
    - CreatedAt
    - LastLoginAt

- [ ] **1.2. Criar Service de Autenticação**
  - `IAuthService` e `AuthService`
  - Método de login (validar senha)
  - Método de geração de token/session simples
  - Hash de senha (usar BCrypt ou similar)

- [ ] **1.3. Criar Controller de Autenticação**
  - `POST /api/admin/auth/login` - Login com senha
  - `POST /api/admin/auth/logout` - Logout
  - `GET /api/admin/auth/verify` - Verificar se está autenticado

- [ ] **1.4. Criar Middleware de Autenticação**
  - Middleware para proteger rotas `/api/admin/*`
  - Validação de token/session
  - Se não autenticado, retornar 401

- [ ] **1.5. Configurar Senha Admin no appsettings**
  - Adicionar configuração de senha admin
  - Usar variável de ambiente ou appsettings
  - Seed inicial com senha padrão

### Frontend (Angular)

- [ ] **1.6. Criar Página de Login Admin**
  - Rota `/admin/login`
  - Formulário simples (usuário/senha)
  - Integração com API de autenticação
  - Guard para proteger rota `/admin`

- [ ] **1.7. Criar Serviço de Autenticação (Frontend)**
  - `auth.service.ts`
  - Métodos: login(), logout(), isAuthenticated()
  - Armazenar token/session (localStorage ou sessionStorage)

- [ ] **1.8. Criar Guard de Autenticação**
  - `admin.guard.ts`
  - Proteger todas as rotas `/admin/*`
  - Redirecionar para `/admin/login` se não autenticado

- [ ] **1.9. Criar Interceptor HTTP**
  - Adicionar token/session nas requisições para `/api/admin/*`
  - Tratar erro 401 (deslogar automaticamente)

---

## 🎯 FASE 2: Estrutura Base do Admin

### Backend (API)

- [ ] **2.1. Criar Models Adicionais**
  - `Service` (Serviços)
    - Id, Title, Description, Image, Slug, IsActive, Order
  - `Partner` (Parceiros)
    - Id, Name, Logo, Website, Description, IsActive, Order
  - `Product` (Produtos)
    - Id, Title, Description, Image, Price, Category, IsActive, Order
  - `Company` (Informações da Empresa)
    - Id, Mission, Vision, Values, History, IsActive

- [ ] **2.2. Atualizar ApplicationDbContext**
  - Adicionar DbSets:
    - `DbSet<Service> Services`
    - `DbSet<Partner> Partners`
    - `DbSet<Product> Products`
    - `DbSet<Company> Companies`
    - `DbSet<Admin> Admins`

- [ ] **2.3. Criar Migrations**
  - Migration para adicionar novas tabelas
  - Seed data inicial

### Frontend (Angular)

- [ ] **2.4. Criar Layout Base do Admin**
  - Componente `admin-layout`
  - Header com logo e botão de logout
  - Sidebar com menu de navegação
  - Área de conteúdo principal
  - Rota base `/admin`

- [ ] **2.5. Criar Página Dashboard Admin**
  - Rota `/admin` ou `/admin/dashboard`
  - Cards com estatísticas:
    - Total de serviços
    - Total de parceiros
    - Total de produtos
    - Mensagens de contato (recentes)

- [ ] **2.6. Criar Menu de Navegação Admin**
  - Links para:
    - Dashboard
    - Serviços
    - Parceiros
    - Produtos
    - Sobre o Site
    - Empresa
    - Sair

---

## 🎯 FASE 3: Gerenciamento de Serviços

### Backend (API)

- [ ] **3.1. Criar Service de Serviços**
  - `IServiceService` e `ServiceService`
  - CRUD completo: GetAll, GetById, Create, Update, Delete
  - Soft delete (IsActive)

- [ ] **3.2. Criar Controller de Serviços Admin**
  - `GET /api/admin/services` - Listar todos (incluindo inativos)
  - `GET /api/admin/services/{id}` - Obter por ID
  - `POST /api/admin/services` - Criar novo
  - `PUT /api/admin/services/{id}` - Atualizar
  - `DELETE /api/admin/services/{id}` - Deletar (soft delete)
  - Proteger com middleware de autenticação

- [ ] **3.3. Endpoint Público de Serviços (manter)**
  - `GET /api/services` - Listar apenas ativos (para o site)

### Frontend (Angular)

- [ ] **3.4. Criar Lista de Serviços**
  - Página `/admin/services`
  - Tabela com todos os serviços
  - Colunas: Nome, Descrição, Status, Ações
  - Botão "Novo Serviço"
  - Filtros e busca

- [ ] **3.5. Criar Formulário de Serviço**
  - Página `/admin/services/new` (criar)
  - Página `/admin/services/edit/:id` (editar)
  - Campos:
    - Título (obrigatório)
    - Descrição
    - Slug (auto-gerado a partir do título)
    - Imagem (upload)
    - Status (Ativo/Inativo)
    - Ordem

- [ ] **3.6. Integração com API**
  - Serviço Angular para comunicação com API
  - Listar, criar, atualizar, deletar
  - Upload de imagens

---

## 🎯 FASE 4: Gerenciamento de Parceiros

### Backend (API)

- [ ] **4.1. Criar Service de Parceiros**
  - `IPartnerService` e `PartnerService`
  - CRUD completo

- [ ] **4.2. Criar Controller de Parceiros Admin**
  - `GET /api/admin/partners` - Listar todos
  - `GET /api/admin/partners/{id}` - Obter por ID
  - `POST /api/admin/partners` - Criar novo
  - `PUT /api/admin/partners/{id}` - Atualizar
  - `DELETE /api/admin/partners/{id}` - Deletar
  - Upload de logo

- [ ] **4.3. Endpoint Público de Parceiros**
  - `GET /api/partners` - Listar apenas ativos

### Frontend (Angular)

- [ ] **4.4. Criar Lista de Parceiros**
  - Página `/admin/partners`
  - Grid ou tabela com logos
  - Botão "Novo Parceiro"

- [ ] **4.5. Criar Formulário de Parceiro**
  - Página `/admin/partners/new` e `/admin/partners/edit/:id`
  - Campos:
    - Nome (obrigatório)
    - Logo (upload)
    - Website (URL)
    - Descrição
    - Status
    - Ordem

---

## 🎯 FASE 5: Gerenciamento de Produtos

### Backend (API)

- [ ] **5.1. Criar Service de Produtos**
  - `IProductService` e `ProductService`
  - CRUD completo

- [ ] **5.2. Criar Controller de Produtos Admin**
  - `GET /api/admin/products` - Listar todos
  - `GET /api/admin/products/{id}` - Obter por ID
  - `POST /api/admin/products` - Criar novo
  - `PUT /api/admin/products/{id}` - Atualizar
  - `DELETE /api/admin/products/{id}` - Deletar
  - Upload de imagem

- [ ] **5.3. Endpoint Público de Produtos**
  - `GET /api/products` - Listar apenas ativos
  - `GET /api/products/category/{category}` - Filtrar por categoria

### Frontend (Angular)

- [ ] **5.4. Criar Lista de Produtos**
  - Página `/admin/products`
  - Grid com cards de produtos
  - Filtro por categoria
  - Botão "Novo Produto"

- [ ] **5.5. Criar Formulário de Produto**
  - Página `/admin/products/new` e `/admin/products/edit/:id`
  - Campos:
    - Título (obrigatório)
    - Descrição
    - Imagem (upload)
    - Preço (opcional)
    - Categoria
    - Status
    - Ordem

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

- [ ] Autenticação funcionando
- [ ] Dashboard admin criado
- [ ] CRUD de Serviços completo
- [ ] CRUD de Parceiros completo
- [ ] CRUD de Produtos completo
- [ ] Gerenciamento de Empresa funcionando
- [ ] Gerenciamento de "Sobre o Site" funcionando
- [ ] Upload de imagens funcionando
- [ ] Testes básicos realizados
- [ ] Documentação atualizada
- [ ] Build de produção gerado
- [ ] Versão atualizada para 3.0.0

---

**Data de Início:** 29/11/2025  
**Branch:** `feature/v3.0.0`  
**Objetivo:** Sistema completo de Admin de Conteúdo

