import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserValue();
    
    // Carregar estatísticas (futuro: integrar com API)
    this.loadStatistics();
  }

  private loadStatistics(): void {
    // TODO: Carregar estatísticas reais da API
    // Por enquanto, valores mockados
    this.statistics = this.statistics.map(stat => ({
      ...stat,
      value: 0 // Será substituído por valores reais quando a API estiver pronta
    }));
  }
}

