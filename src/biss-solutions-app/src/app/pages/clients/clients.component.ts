import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalPageComponent, InternalPageData } from '../../components/internal-page/internal-page.component';
import { ClientsComponent } from '../../components/clients/clients.component';

@Component({
  selector: 'app-clients-page',
  standalone: true,
  imports: [CommonModule, InternalPageComponent, ClientsComponent],
  template: `
    <app-internal-page [pageData]="pageData">
      <!-- Seção de Clientes -->
      <app-clients
        title="Nossos Clientes"
        description="Empresas que confiam em nossas soluções e serviços"
      ></app-clients>
    </app-internal-page>
  `,
  styles: [`
    /* Estilos específicos da página de clientes podem ser adicionados aqui */
  `]
})
export class ClientsPageComponent {
  pageData: InternalPageData = {
    title: 'Nossos Clientes',
    subtitle: 'Conheça os projetos e soluções que desenvolvemos para nossos clientes',
    backgroundImage: '/images/services/analytics.jpg',
    breadcrumbItems: [
      { label: 'Home', route: '/home' },
      { label: 'Clientes', route: '/clients', active: true }
    ]
  };
}
