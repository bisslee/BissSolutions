# Página de Clientes

Esta é uma página dedicada para exibir o portfólio de clientes da Biss Solutions.

## Funcionalidades

- **Página Independente**: Acessível através da rota `/clients`
- **Componente Reutilizável**: Utiliza o `ClientsComponent` para exibir os clientes
- **Layout Responsivo**: Adapta-se a todos os dispositivos
- **Breadcrumb**: Navegação clara com breadcrumb
- **Imagem de Fundo**: Header com imagem de fundo personalizada

## Estrutura

### Arquivos
- `clients.component.ts` - Componente da página
- `README.md` - Este arquivo de documentação

### Dependências
- `InternalPageComponent` - Para layout padrão das páginas internas
- `ClientsComponent` - Para exibir a lista de clientes

## Como Acessar

A página está disponível através da rota:
```
/clients
```

## Configuração

### Dados da Página
```typescript
pageData: InternalPageData = {
  title: 'Nossos Clientes',
  subtitle: 'Conheça os projetos e soluções que desenvolvemos para nossos clientes',
  backgroundImage: '/images/slides/slide3.jpg',
  breadcrumbItems: [
    { label: 'Home', route: '/home' },
    { label: 'Clientes', route: '/clients', active: true }
  ]
};
```

### Rota
A rota foi adicionada ao arquivo `app.routes.ts`:
```typescript
{ path: 'clients', component: ClientsPageComponent }
```

## Personalização

### Alterar Título e Subtítulo
```typescript
pageData: InternalPageData = {
  title: 'Meu Título Personalizado',
  subtitle: 'Meu subtítulo personalizado',
  // ... outras configurações
};
```

### Alterar Imagem de Fundo
```typescript
pageData: InternalPageData = {
  // ... outras configurações
  backgroundImage: '/caminho/para/minha/imagem.jpg',
};
```

### Alterar Breadcrumb
```typescript
pageData: InternalPageData = {
  // ... outras configurações
  breadcrumbItems: [
    { label: 'Início', route: '/home' },
    { label: 'Portfólio', route: '/clients', active: true }
  ]
};
```

## Integração com Menu

A página já está integrada ao menu de navegação principal. O item "Clientes" aparece no menu com a rota `/clients`.

### Configuração do Menu

O menu está configurado no `HeaderComponent`:

```typescript
menuItems: MenuItem[] = [
  { label: 'Home', route: '/home' },
  { label: 'Empresa', route: '/empresa' },
  { label: 'Clientes', route: '/clients' }, // ✅ Já configurado
  { label: 'Produtos', route: '/produtos' },
  { label: 'Serviços', route: '/servicos' },
  { label: 'Notícias', route: '/noticias' },
  { label: 'Blog', route: '/blog' },
  { label: 'Contato', route: '/contato' }
];
```

## Próximos Passos

1. **✅ Menu**: Já integrado ao menu de navegação
2. **SEO**: Adicionar meta tags para SEO
3. **Analytics**: Configurar tracking de visitas
4. **Filtros**: Implementar filtros por categoria de serviço
5. **Busca**: Adicionar funcionalidade de busca

## Status

- ✅ Página criada e funcionando
- ✅ Rota configurada
- ✅ Componente integrado
- ✅ Menu configurado e funcionando
- ✅ Projeto compilando sem erros
- ✅ Testes passando
