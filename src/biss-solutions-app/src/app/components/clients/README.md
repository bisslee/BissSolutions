# Componente de Clientes

Este componente exibe uma lista de clientes da Biss Solutions com informações detalhadas sobre os projetos realizados.

## Características

- **Nome e Logo**: Exibe o nome e logo de cada cliente
- **Descrição**: Pequeno texto explicativo sobre o projeto
- **Versão**: Informa a versão atual ou versões disponíveis
- **Serviços**: Lista de serviços prestados com tags coloridas
- **Imagem do Projeto**: Exibe uma imagem do que foi desenvolvido (quando disponível)
- **Link para Site**: Botão para visitar o site do cliente (quando disponível)

## Como Usar

### Importação

```typescript
import { ClientsComponent, Client, ClientService } from './components/clients';
```

### Uso Básico

```html
<app-clients></app-clients>
```

### Uso Personalizado

```html
<app-clients
  title="Nossos Clientes"
  description="Empresas que confiam em nossas soluções"
  [clients]="meusClientes">
</app-clients>
```

## Estrutura de Dados

### Interface Client

```typescript
interface Client {
  id: number;
  name: string;
  logo: string;
  website?: string;
  description: string;
  version: string;
  services: ClientService[];
  projectImage?: string;
  projectImageAlt?: string;
}
```

### Interface ClientService

```typescript
interface ClientService {
  name: string;
  category: string;
}
```

## Exemplo de Dados

```typescript
const clientes: Client[] = [
  {
    id: 1,
    name: 'Radio Biss',
    logo: '/images/clients/radio-biss-logo.png',
    website: 'https://radiobiss.com.br/',
    description: 'Plataforma de rádio online com player personalizado.',
    version: 'Versões: 2016, 2017, 2020 e Atual',
    services: [
      { name: 'Design', category: 'Design' },
      { name: 'Site (.NET)', category: 'Site' },
      { name: 'APIs (.NET)', category: 'APIs' }
    ],
    projectImage: '/images/clients/radio-biss-project.jpg',
    projectImageAlt: 'Site da Radio Biss'
  }
];
```

## Categorias de Serviços

O componente suporta as seguintes categorias de serviços com cores específicas:

- **Design**: Roxo (#8b5cf6)
- **UX**: Ciano (#06b6d4)
- **Site**: Verde (#10b981)
- **APIs**: Amarelo (#f59e0b)
- **Integração**: Vermelho (#ef4444)
- **Player**: Roxo (#8b5cf6)
- **Banco de Dados**: Verde escuro (#059669)
- **Hospedagem**: Roxo escuro (#7c3aed)
- **WordPress Instalação**: Azul (#0891b2)
- **Configuração de Template**: Vermelho escuro (#dc2626)
- **Migração de Servidor**: Laranja (#ea580c)
- **SSO**: Rosa (#be185d)
- **Aplicativo**: Verde (#059669)

## Responsividade

O componente é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop**: Grid com múltiplas colunas
- **Tablet**: Grid com coluna única
- **Mobile**: Layout otimizado para dispositivos móveis

## Tratamento de Erros

- **Logo com erro**: Substituído por ícone de prédio
- **Imagem do projeto com erro**: Substituída por placeholder com ícone

## Personalização

O componente aceita as seguintes propriedades de entrada:

- `title`: Título da seção
- `description`: Descrição da seção
- `clients`: Array de clientes a serem exibidos

## Estilos

O componente utiliza CSS moderno com:

- Animações suaves de hover
- Sombras e bordas arredondadas
- Gradientes e transições
- Sistema de cores consistente
- Flexbox e Grid para layout
