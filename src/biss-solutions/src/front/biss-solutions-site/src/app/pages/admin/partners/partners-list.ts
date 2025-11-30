import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PartnerService } from '../../../services/partner.service';
import { ToastService } from '../../../services/toast.service';
import { Partner } from '../../../models/partner.models';

type StatusFilter = 'All' | 'Active' | 'Inactive';

@Component({
  selector: 'app-partners-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './partners-list.html',
  styleUrl: './partners-list.css'
})
export class PartnersListComponent implements OnInit {
  partners: Partner[] = [];
  isLoading = false;
  searchTerm = '';
  statusFilter: StatusFilter = 'All';

  constructor(
    private partnerService: PartnerService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners(): void {
    this.isLoading = true;
    // Sempre carregar todos (incluindo inativos) para poder filtrar localmente
    this.partnerService.getAllPartners(true).subscribe({
      next: (data) => {
        // Filtrar localmente baseado no statusFilter
        if (this.statusFilter === 'Active') {
          this.partners = data.filter(p => p.isActive);
        } else if (this.statusFilter === 'Inactive') {
          this.partners = data.filter(p => !p.isActive);
        } else {
          this.partners = data; // 'All' - mostrar todos
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.show('Erro ao carregar parceiros. Tente novamente.', 'error');
        this.isLoading = false;
        console.error('Erro ao carregar parceiros:', error);
      }
    });
  }

  onStatusFilterChange(): void {
    this.loadPartners();
  }

  toggleActive(partner: Partner): void {
    if (!partner.id) return;

    this.partnerService.toggleActive(partner.id).subscribe({
      next: (updatedPartner) => {
        partner.isActive = updatedPartner.isActive;
        this.toastService.show(
          `Parceiro ${updatedPartner.isActive ? 'ativado' : 'desativado'} com sucesso!`,
          'success'
        );
      },
      error: (error) => {
        this.toastService.show('Erro ao alterar status do parceiro.', 'error');
        console.error('Erro ao alterar status:', error);
      }
    });
  }

  deletePartner(partner: Partner): void {
    if (!partner.id) return;

    if (!confirm(`Tem certeza que deseja excluir o parceiro "${partner.name}"?`)) {
      return;
    }

    this.partnerService.deletePartner(partner.id).subscribe({
      next: () => {
        this.toastService.show('Parceiro excluído com sucesso!', 'success');
        this.loadPartners(); // Recarregar lista
      },
      error: (error) => {
        this.toastService.show('Erro ao excluir parceiro.', 'error');
        console.error('Erro ao excluir:', error);
      }
    });
  }

  editPartner(partner: Partner): void {
    if (!partner.id) return;
    this.router.navigate(['/admin/partners/edit', partner.id]);
  }

  get filteredPartners(): Partner[] {
    if (!this.searchTerm.trim()) {
      return this.partners;
    }

    const term = this.searchTerm.toLowerCase();
    return this.partners.filter(partner =>
      partner.name.toLowerCase().includes(term) ||
      partner.description?.toLowerCase().includes(term)
    );
  }
}

