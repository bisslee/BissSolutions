import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { ToastService } from '../../../services/toast.service';
import { Client } from '../../../models/client.models';

type StatusFilter = 'All' | 'Active' | 'Inactive';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './clients-list.html',
  styleUrl: './clients-list.css'
})
export class ClientsListComponent implements OnInit {
  clients: Client[] = [];
  isLoading = false;
  searchTerm = '';
  statusFilter: StatusFilter = 'All';

  constructor(
    private clientService: ClientService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.isLoading = true;
    // Sempre carregar todos (incluindo inativos) para poder filtrar localmente
    this.clientService.getAllClients(true).subscribe({
      next: (data) => {
        // Filtrar localmente baseado no statusFilter
        if (this.statusFilter === 'Active') {
          this.clients = data.filter(c => c.isActive);
        } else if (this.statusFilter === 'Inactive') {
          this.clients = data.filter(c => !c.isActive);
        } else {
          this.clients = data; // 'All' - mostrar todos
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.show('Erro ao carregar clientes. Tente novamente.', 'error');
        this.isLoading = false;
        console.error('Erro ao carregar clientes:', error);
      }
    });
  }

  onStatusFilterChange(): void {
    this.loadClients();
  }

  toggleActive(client: Client): void {
    if (!client.id) return;

    this.clientService.toggleActive(client.id).subscribe({
      next: (updatedClient) => {
        client.isActive = updatedClient.isActive;
        this.toastService.show(
          `Cliente ${updatedClient.isActive ? 'ativado' : 'desativado'} com sucesso!`,
          'success'
        );
      },
      error: (error) => {
        this.toastService.show('Erro ao alterar status do cliente.', 'error');
        console.error('Erro ao alterar status:', error);
      }
    });
  }

  deleteClient(client: Client): void {
    if (!client.id) return;

    if (!confirm(`Tem certeza que deseja excluir o cliente "${client.name}"?`)) {
      return;
    }

    this.clientService.deleteClient(client.id).subscribe({
      next: () => {
        this.toastService.show('Cliente excluído com sucesso!', 'success');
        this.loadClients(); // Recarregar lista
      },
      error: (error) => {
        this.toastService.show('Erro ao excluir cliente.', 'error');
        console.error('Erro ao excluir:', error);
      }
    });
  }

  editClient(client: Client): void {
    if (!client.id) return;
    this.router.navigate(['/admin/clients/edit', client.id]);
  }

  get filteredClients(): Client[] {
    if (!this.searchTerm.trim()) {
      return this.clients;
    }

    const term = this.searchTerm.toLowerCase();
    return this.clients.filter(client =>
      client.name.toLowerCase().includes(term) ||
      client.description?.toLowerCase().includes(term) ||
      client.versions?.toLowerCase().includes(term)
    );
  }
}

