import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CompanyComponent } from './pages/company/company.component';
import { ClientsPageComponent } from './pages/clients/clients.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServicesComponent } from './pages/services/services.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'empresa', component: CompanyComponent },
  { path: 'clients', component: ClientsPageComponent },
  { path: 'produtos', component: ProductsComponent },
  { path: 'sobre', component: AboutComponent },
  { path: 'contato', component: ContactComponent },
  { path: 'servicos', component: ServicesComponent },
  // Lazy Loading para páginas de serviços
  {
    path: 'servicos/desenvolvimento-software',
    loadComponent: () => import('./pages/services/software-development/software-development.component').then(m => m.SoftwareDevelopmentComponent)
  },
  {
    path: 'servicos/consultoria',
    loadComponent: () => import('./pages/services/consulting/consulting.component').then(m => m.ConsultingComponent)
  },
  {
    path: 'servicos/cloud',
    loadComponent: () => import('./pages/services/cloud-solutions/cloud-solutions.component').then(m => m.CloudSolutionsComponent)
  },
  {
    path: 'servicos/seguranca',
    loadComponent: () => import('./pages/services/information-security/information-security.component').then(m => m.InformationSecurityComponent)
  },
  {
    path: 'servicos/suporte',
    loadComponent: () => import('./pages/services/technical-support/technical-support.component').then(m => m.TechnicalSupportComponent)
  },
  {
    path: 'servicos/analytics',
    loadComponent: () => import('./pages/services/analytics-bi/analytics-bi.component').then(m => m.AnalyticsBiComponent)
  },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: '**', component: NotFoundComponent }
];
