# Exemplos de Uso do Componente de Clientes

## 1. Uso Básico na Página da Empresa

```typescript
// empresa.component.ts
import { ClientsComponent } from '../../components/clients/clients.component';

@Component({
  imports: [ClientsComponent],
  template: `
    <app-clients></app-clients>
  `
})
```

## 2. Uso Personalizado com Título e Descrição

```typescript
// qualquer-pagina.component.ts
import { ClientsComponent } from '../../components/clients/clients.component';

@Component({
  imports: [ClientsComponent],
  template: `
    <app-clients
      title="Portfólio de Clientes"
      description="Conheça alguns dos projetos que desenvolvemos">
    </app-clients>
  `
})
```

## 3. Uso com Dados Personalizados

```typescript
// portfolio.component.ts
import { ClientsComponent, Client } from '../../components/clients/clients.component';

@Component({
  imports: [ClientsComponent],
  template: `
    <app-clients
      [clients]="meusClientes"
      title="Meus Projetos"
      description="Clientes que confiaram em meu trabalho">
    </app-clients>
  `
})
export class PortfolioComponent {
  meusClientes: Client[] = [
    {
      id: 1,
      name: 'Empresa Exemplo',
      logo: '/images/clients/empresa-exemplo-logo.png',
      website: 'https://empresaexemplo.com.br',
      description: 'Site institucional moderno e responsivo.',
      version: 'Versão 2024',
      services: [
        { name: 'Design', category: 'Design' },
        { name: 'Site', category: 'Site' },
        { name: 'Hospedagem', category: 'Hospedagem' }
      ],
      projectImage: '/images/clients/empresa-exemplo-project.jpg',
      projectImageAlt: 'Site da Empresa Exemplo'
    }
  ];
}
```

## 4. Uso em Modal ou Overlay

```typescript
// modal-clientes.component.ts
import { ClientsComponent } from '../../components/clients/clients.component';

@Component({
  imports: [ClientsComponent],
  template: `
    <div class="modal-overlay">
      <div class="modal-content">
        <h2>Nossos Clientes</h2>
        <app-clients
          title=""
          description=""
          [clients]="clientesSelecionados">
        </app-clients>
        <button (click)="fecharModal()">Fechar</button>
      </div>
    </div>
  `
})
```

## 5. Uso com Filtros

```typescript
// clientes-filtrados.component.ts
import { ClientsComponent, Client } from '../../components/clients/clients.component';

@Component({
  imports: [ClientsComponent],
  template: `
    <div class="filtros">
      <button (click)="filtrarPorCategoria('Design')">Design</button>
      <button (click)="filtrarPorCategoria('Site')">Sites</button>
      <button (click)="filtrarPorCategoria('APIs')">APIs</button>
    </div>
    
    <app-clients
      [clients]="clientesFiltrados"
      title="Clientes Filtrados"
      description="Resultados da busca">
    </app-clients>
  `
})
export class ClientesFiltradosComponent {
  todosClientes: Client[] = [/* ... */];
  clientesFiltrados: Client[] = this.todosClientes;

  filtrarPorCategoria(categoria: string): void {
    this.clientesFiltrados = this.todosClientes.filter(client =>
      client.services.some(service => service.category === categoria)
    );
  }
}
```

## 6. Uso com Paginação

```typescript
// clientes-paginados.component.ts
import { ClientsComponent, Client } from '../../components/clients/clients.component';

@Component({
  imports: [ClientsComponent],
  template: `
    <app-clients
      [clients]="clientesDaPagina"
      title="Nossos Clientes"
      description="Página {{ paginaAtual }} de {{ totalPaginas }}">
    </app-clients>
    
    <div class="paginacao">
      <button (click)="paginaAnterior()" [disabled]="paginaAtual === 1">Anterior</button>
      <span>{{ paginaAtual }} / {{ totalPaginas }}</span>
      <button (click)="proximaPagina()" [disabled]="paginaAtual === totalPaginas">Próxima</button>
    </div>
  `
})
export class ClientesPaginadosComponent {
  todosClientes: Client[] = [/* ... */];
  clientesDaPagina: Client[] = [];
  paginaAtual = 1;
  itensPorPagina = 6;
  totalPaginas = Math.ceil(this.todosClientes.length / this.itensPorPagina);

  ngOnInit(): void {
    this.atualizarPagina();
  }

  atualizarPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.clientesDaPagina = this.todosClientes.slice(inicio, fim);
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarPagina();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizarPagina();
    }
  }
}
```

## 7. Uso com Busca

```typescript
// clientes-busca.component.ts
import { ClientsComponent, Client } from '../../components/clients/clients.component';

@Component({
  imports: [ClientsComponent],
  template: `
    <div class="busca">
      <input 
        type="text" 
        placeholder="Buscar clientes..."
        [(ngModel)]="termoBusca"
        (input)="buscarClientes()">
    </div>
    
    <app-clients
      [clients]="clientesEncontrados"
      title="Resultados da Busca"
      description="{{ clientesEncontrados.length }} cliente(s) encontrado(s)">
    </app-clients>
  `
})
export class ClientesBuscaComponent {
  todosClientes: Client[] = [/* ... */];
  clientesEncontrados: Client[] = this.todosClientes;
  termoBusca: string = '';

  buscarClientes(): void {
    if (!this.termoBusca.trim()) {
      this.clientesEncontrados = this.todosClientes;
      return;
    }

    const termo = this.termoBusca.toLowerCase();
    this.clientesEncontrados = this.todosClientes.filter(client =>
      client.name.toLowerCase().includes(termo) ||
      client.description.toLowerCase().includes(termo) ||
      client.services.some(service => 
        service.name.toLowerCase().includes(termo)
      )
    );
  }
}
```

## 8. Uso com Lazy Loading

```typescript
// clientes-lazy.component.ts
import { ClientsComponent, Client } from '../../components/clients/clients.component';

@Component({
  imports: [ClientsComponent],
  template: `
    <app-clients
      [clients]="clientesCarregados"
      title="Nossos Clientes"
      description="Carregando mais clientes...">
    </app-clients>
    
    <div class="carregar-mais" *ngIf="!todosCarregados">
      <button (click)="carregarMais()" [disabled]="carregando">
        {{ carregando ? 'Carregando...' : 'Carregar Mais' }}
      </button>
    </div>
  `
})
export class ClientesLazyComponent {
  clientesCarregados: Client[] = [];
  todosCarregados = false;
  carregando = false;
  pagina = 1;

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.carregando = true;
    // Simular chamada à API
    setTimeout(() => {
      const novosClientes = this.obterClientesDaAPI(this.pagina);
      this.clientesCarregados.push(...novosClientes);
      this.pagina++;
      this.carregando = false;
      
      if (novosClientes.length < 6) {
        this.todosCarregados = true;
      }
    }, 1000);
  }

  obterClientesDaAPI(pagina: number): Client[] {
    // Implementar lógica de busca na API
    return [];
  }
}
```

## Dicas de Implementação

1. **Imagens**: Sempre forneça imagens otimizadas para web
2. **Alt Text**: Use descrições significativas para acessibilidade
3. **Lazy Loading**: O componente já suporta lazy loading de imagens
4. **Responsividade**: Teste em diferentes tamanhos de tela
5. **Performance**: Considere usar OnPush change detection para listas grandes
6. **SEO**: Use dados estruturados quando apropriado
