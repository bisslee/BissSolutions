import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { TopBar } from './components/top-bar/top-bar';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { FloatingButtons } from './components/floating-buttons/floating-buttons';
import { BottomNavigation } from './components/bottom-navigation/bottom-navigation';
import { PwaInstallBannerComponent } from './components/pwa-install-banner/pwa-install-banner';
import { PwaUpdateNotificationComponent } from './components/pwa-update-notification/pwa-update-notification';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner';
import { ToastComponent } from './components/toast/toast';
import { PwaService } from './services/pwa.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    TopBar,
    Header,
    Footer,
    FloatingButtons,
    BottomNavigation,
    PwaInstallBannerComponent,
    PwaUpdateNotificationComponent,
    CookieBannerComponent,
    ToastComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Biss Solutions');
  isAdminRoute = false;

  constructor(
    private pwaService: PwaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // PWA Service é inicializado automaticamente no construtor
    console.log('🚀 Biss Solutions PWA inicializada!');

    // Verificar se está em rota admin
    this.checkAdminRoute();
    
    // Observar mudanças de rota
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAdminRoute();
      });
  }

  private checkAdminRoute(): void {
    const url = this.router.url;
    this.isAdminRoute = url.startsWith('/admin');
  }
}
