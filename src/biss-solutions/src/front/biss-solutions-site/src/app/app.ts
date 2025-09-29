import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './components/top-bar/top-bar';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { FloatingButtons } from './components/floating-buttons/floating-buttons';
import { BottomNavigation } from './components/bottom-navigation/bottom-navigation';
import { PwaInstallBannerComponent } from './components/pwa-install-banner/pwa-install-banner';
import { PwaUpdateNotificationComponent } from './components/pwa-update-notification/pwa-update-notification';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner';
import { PwaService } from './services/pwa.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TopBar,
    Header,
    Footer,
    FloatingButtons,
    BottomNavigation,
    PwaInstallBannerComponent,
    PwaUpdateNotificationComponent,
    CookieBannerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Biss Solutions');

  constructor(private pwaService: PwaService) {}

  ngOnInit(): void {
    // PWA Service é inicializado automaticamente no construtor
    console.log('🚀 Biss Solutions PWA inicializada!');
  }
}
