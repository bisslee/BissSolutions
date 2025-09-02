# Demonstração do Componente de Clientes

## Visualização

O componente de clientes cria uma seção elegante e responsiva que exibe os clientes da Biss Solutions em um grid de cards.

### Layout Desktop
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Nossos Clientes                                  │
│              Empresas que confiam em nossas soluções e serviços            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│ ┌─────────┐ Radio Biss │  │ ┌─────────┐Nuance Beleza│  │ ┌─────────┐Marilia     │
│ │   Logo  │ Versões:   │  │ │   Logo  │ Versão 2019 │  │ │   Logo  │ Versão     │
│ │         │ 2016, 2017,│  │ │         │             │  │ │         │ Atual      │
│ └─────────┘ 2020, Atual│  │ └─────────┘             │  │ └─────────┘            │
│                         │  │                         │  │                         │
│ Plataforma de rádio     │  │ Site institucional para │  │ Site pessoal desenvolvido│
│ online com player...    │  │ empresa de beleza...    │  │ em WordPress...        │
│                         │  │                         │  │                         │
│ Serviços Prestados:     │  │ Serviços Prestados:     │  │ Serviços Prestados:     │
│ [Design] [Site(.NET)]   │  │ [Design] [UX] [Site]    │  │ [WordPress] [Template] │
│ [APIs(.NET)] [Integração]│  │ [Hospedagem]            │  │ [Hospedagem]           │
│ [UX] [Player] [SQL]     │  │                         │  │                         │
│ [Hospedagem]            │  │                         │  │                         │
│                         │  │                         │  │                         │
│ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │  │ ┌─────────────────────┐ │
│ │   Imagem do Site    │ │  │ │   Imagem do Site    │ │  │ │   Imagem do Site    │ │
│ │                     │ │  │ │                     │ │  │ │                     │ │
│ └─────────────────────┘ │  │ └─────────────────────┘ │  │ └─────────────────────┘ │
│                         │  │                         │  │                         │
│     [Visitar Site]      │  │     [Visitar Site]      │  │                         │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘
```

### Layout Mobile
```
┌─────────────────────────┐
│      Nossos Clientes    │
│ Empresas que confiam... │
└─────────────────────────┘

┌─────────────────────────┐
│        Radio Biss       │
│    ┌─────────┐         │
│    │   Logo  │         │
│    └─────────┘         │
│                         │
│ Versões: 2016, 2017... │
│                         │
│ Plataforma de rádio... │
│                         │
│ Serviços Prestados:     │
│ [Design] [Site(.NET)]   │
│ [APIs(.NET)] [Integração]│
│ [UX] [Player] [SQL]     │
│ [Hospedagem]            │
│                         │
│ ┌─────────────────────┐ │
│ │   Imagem do Site    │ │
│ │                     │ │
│ └─────────────────────┘ │
│                         │
│     [Visitar Site]      │
└─────────────────────────┘
```

## Características Visuais

### Cores dos Serviços
- **Design**: Roxo (#8b5cf6)
- **UX**: Ciano (#06b6d4)
- **Site**: Verde (#10b981)
- **APIs**: Amarelo (#f59e0b)
- **Integração**: Vermelho (#ef4444)
- **Player**: Roxo (#8b5cf6)
- **Banco de Dados**: Verde escuro (#059669)
- **Hospedagem**: Roxo escuro (#7c3aed)
- **WordPress**: Azul (#0891b2)
- **Template**: Vermelho escuro (#dc2626)
- **Migração**: Laranja (#ea580c)
- **SSO**: Rosa (#be185d)
- **Aplicativo**: Verde (#059669)

### Animações
- **Hover**: Cards se elevam com sombra
- **Imagens**: Zoom suave nas imagens dos projetos
- **Transições**: Todas as mudanças são suaves (0.3s)

### Responsividade
- **Desktop**: Grid com múltiplas colunas (minmax 350px)
- **Tablet**: Grid com coluna única
- **Mobile**: Layout otimizado com elementos empilhados

## Estados do Componente

### Estado Normal
- Cards com fundo branco
- Sombras sutis
- Bordas transparentes

### Estado Hover
- Cards se elevam (translateY(-8px))
- Bordas azuis (#2563eb)
- Sombras mais pronunciadas
- Imagens dos projetos fazem zoom

### Estado de Erro de Imagem
- Logo: Substituído por ícone de prédio
- Projeto: Substituído por placeholder com ícone de imagem

## Acessibilidade

- **Alt text** para todas as imagens
- **ARIA labels** para links externos
- **Navegação por teclado** suportada
- **Contraste** adequado para leitura
- **Estrutura semântica** com headings apropriados

## Performance

- **Lazy loading** de imagens
- **CSS otimizado** com propriedades modernas
- **Grid CSS** para layout eficiente
- **Transições CSS** para animações suaves
