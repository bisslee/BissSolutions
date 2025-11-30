import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'company',
    loadComponent: () => import('./pages/company/company').then(m => m.Company)
  },
  {
    path: 'clients',
    loadComponent: () => import('./pages/clients/clients').then(m => m.Clients)
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products').then(m => m.Products)
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services').then(m => m.Services)
  },
  {
    path: 'services/development',
    loadComponent: () => import('./pages/services/development/development').then(m => m.Development)
  },
  {
    path: 'services/consulting',
    loadComponent: () => import('./pages/services/consulting/consulting').then(m => m.Consulting)
  },
  {
    path: 'services/cloud',
    loadComponent: () => import('./pages/services/cloud/cloud').then(m => m.Cloud)
  },
  {
    path: 'services/security',
    loadComponent: () => import('./pages/services/security/security').then(m => m.Security)
  },
  {
    path: 'services/support',
    loadComponent: () => import('./pages/services/support/support').then(m => m.Support)
  },
  {
    path: 'services/analytics',
    loadComponent: () => import('./pages/services/analytics/analytics').then(m => m.Analytics)
  },
  {
    path: 'services/hosting',
    loadComponent: () => import('./pages/services/hosting/hosting').then(m => m.Hosting)
  },
  {
    path: 'services/landing-pages',
    loadComponent: () => import('./pages/services/landing-pages/landing-pages').then(m => m.LandingPages)
  },
  {
    path: 'services/pacote-completo',
    loadComponent: () => import('./pages/services/pacote-completo/pacote-completo').then(m => m.PacoteCompleto)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy').then(m => m.Privacy)
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms').then(m => m.Terms)
  },
  // Rotas do Admin
  {
    path: 'admin/login',
    loadComponent: () => import('./pages/admin/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./components/admin-layout/admin-layout').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.DashboardComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFoundComponent)
  }
];
