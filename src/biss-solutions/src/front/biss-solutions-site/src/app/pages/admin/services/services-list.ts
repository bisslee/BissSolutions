import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { ToastService } from '../../../services/toast.service';
import { Service } from '../../../models/service.models';

type StatusFilter = 'All' | 'Active' | 'Inactive';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './services-list.html',
  styleUrl: './services-list.css'
})
export class ServicesListComponent implements OnInit {
  services: Service[] = [];
  isLoading = false;
  searchTerm = '';
  statusFilter: StatusFilter = 'All';
  totalCount = 0;

  constructor(
    private serviceService: ServiceService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadServices();
    this.loadCount();
  }

  loadServices(): void {
    this.isLoading = true;
    // Sempre carregar todos (incluindo inativos) para poder filtrar localmente
    this.serviceService.getAllServices(true).subscribe({
      next: (data) => {
        // Filtrar localmente baseado no statusFilter
        if (this.statusFilter === 'Active') {
          this.services = data.filter(s => s.isActive);
        } else if (this.statusFilter === 'Inactive') {
          this.services = data.filter(s => !s.isActive);
        } else {
          this.services = data; // 'All' - mostrar todos
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.show('Erro ao carregar serviços. Tente novamente.', 'error');
        this.isLoading = false;
        console.error('Erro ao carregar serviços:', error);
      }
    });
  }

  loadCount(): void {
    this.serviceService.getServicesCount(this.statusFilter).subscribe({
      next: (response) => {
        this.totalCount = response.count;
      },
      error: (error) => {
        console.error('Erro ao carregar contagem de serviços:', error);
      }
    });
  }

  onStatusFilterChange(): void {
    this.loadServices();
    this.loadCount();
  }

  toggleActive(service: Service): void {
    if (!service.id) return;

    this.serviceService.toggleActive(service.id).subscribe({
      next: (updatedService) => {
        service.isActive = updatedService.isActive;
        this.toastService.show(
          `Serviço ${updatedService.isActive ? 'ativado' : 'desativado'} com sucesso!`,
          'success'
        );
      },
      error: (error) => {
        this.toastService.show('Erro ao alterar status do serviço.', 'error');
        console.error('Erro ao alterar status:', error);
      }
    });
  }

  deleteService(service: Service): void {
    if (!service.id) return;

    if (!confirm(`Tem certeza que deseja excluir o serviço "${service.title}"?`)) {
      return;
    }

    this.serviceService.deleteService(service.id).subscribe({
      next: () => {
        this.toastService.show('Serviço excluído com sucesso!', 'success');
        this.loadServices(); // Recarregar lista
      },
      error: (error) => {
        this.toastService.show('Erro ao excluir serviço.', 'error');
        console.error('Erro ao excluir:', error);
      }
    });
  }

  editService(service: Service): void {
    if (!service.id) return;
    this.router.navigate(['/admin/services/edit', service.id]);
  }

  get filteredServices(): Service[] {
    if (!this.searchTerm.trim()) {
      return this.services;
    }

    const term = this.searchTerm.toLowerCase();
    return this.services.filter(service =>
      service.title.toLowerCase().includes(term) ||
      service.description?.toLowerCase().includes(term) ||
      service.slug.toLowerCase().includes(term)
    );
  }
}

