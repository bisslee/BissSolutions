import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ServiceService } from '../../../services/service.service';
import { UserInfo } from '../../../models/auth.models';

interface StatisticCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  change?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  currentUser: UserInfo | null = null;
  isLoading = false;

  statistics: StatisticCard[] = [
    {
      title: 'Total de Serviços',
      value: 0,
      icon: 'ri-service-line',
      color: '#4A90E2'
    },
    {
      title: 'Total de Parceiros',
      value: 0,
      icon: 'ri-group-line',
      color: '#10b981'
    },
    {
      title: 'Total de Produtos',
      value: 0,
      icon: 'ri-shopping-bag-line',
      color: '#f59e0b'
    },
    {
      title: 'Mensagens de Contato',
      value: 0,
      icon: 'ri-mail-line',
      color: '#ef4444'
    }
  ];

  constructor(
    private authService: AuthService,
    private serviceService: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserValue();
    
    // Carregar estatísticas (futuro: integrar com API)
    this.loadStatistics();
  }

  private loadStatistics(): void {
    this.isLoading = true;
    
    // Carregar total de serviços ativos
    this.serviceService.getServicesCount('Active').subscribe({
      next: (response) => {
        const servicesStat = this.statistics.find(s => s.title === 'Total de Serviços');
        if (servicesStat) {
          servicesStat.value = response.count;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar estatísticas de serviços:', error);
        this.isLoading = false;
      }
    });
    
    // TODO: Carregar outras estatísticas quando os endpoints estiverem disponíveis
    // this.partnerService.getCount('Active').subscribe(...)
    // this.productService.getCount('Active').subscribe(...)
    // this.contactService.getUnreadCount().subscribe(...)
  }
}

