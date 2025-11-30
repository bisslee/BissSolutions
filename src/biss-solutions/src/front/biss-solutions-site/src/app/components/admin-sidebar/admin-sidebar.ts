import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserInfo } from '../../models/auth.models';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
  children?: MenuItem[];
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css'
})
export class AdminSidebarComponent implements OnInit {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  currentUser: UserInfo | null = null;

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'ri-dashboard-line',
      route: '/admin'
    },
    {
      label: 'Serviços',
      icon: 'ri-service-line',
      route: '/admin/services',
      children: [
        { label: 'Listar Serviços', icon: 'ri-list-check', route: '/admin/services' },
        { label: 'Novo Serviço', icon: 'ri-add-circle-line', route: '/admin/services/new' }
      ]
    },
    {
      label: 'Parceiros',
      icon: 'ri-group-line',
      route: '/admin/partners',
      children: [
        { label: 'Listar Parceiros', icon: 'ri-list-check', route: '/admin/partners' },
        { label: 'Novo Parceiro', icon: 'ri-add-circle-line', route: '/admin/partners/new' }
      ]
    },
    {
      label: 'Clientes',
      icon: 'ri-user-line',
      route: '/admin/clients',
      children: [
        { label: 'Listar Clientes', icon: 'ri-list-check', route: '/admin/clients' },
        { label: 'Novo Cliente', icon: 'ri-add-circle-line', route: '/admin/clients/new' }
      ]
    },
    {
      label: 'Produtos',
      icon: 'ri-shopping-bag-line',
      route: '/admin/products',
      children: [
        { label: 'Listar Produtos', icon: 'ri-list-check', route: '/admin/products' },
        { label: 'Novo Produto', icon: 'ri-add-circle-line', route: '/admin/products/new' }
      ]
    },
    {
      label: 'Conteúdo',
      icon: 'ri-file-text-line',
      route: '/admin/content',
      children: [
        { label: 'Empresa', icon: 'ri-building-line', route: '/admin/content/company' },
        { label: 'Sobre o Site', icon: 'ri-information-line', route: '/admin/content/about-site' }
      ]
    },
    {
      label: 'Mensagens',
      icon: 'ri-mail-line',
      route: '/admin/contacts',
      badge: 0
    }
  ];

  expandedItems: Set<string> = new Set();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserValue();
    
    // Observar mudanças no usuário
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleExpand(item: MenuItem): void {
    if (item.children && item.children.length > 0) {
      if (this.expandedItems.has(item.route)) {
        this.expandedItems.delete(item.route);
      } else {
        this.expandedItems.add(item.route);
      }
    }
  }

  isExpanded(item: MenuItem): boolean {
    return this.expandedItems.has(item.route);
  }

  hasChildren(item: MenuItem): boolean {
    return !!(item.children && item.children.length > 0);
  }
}

