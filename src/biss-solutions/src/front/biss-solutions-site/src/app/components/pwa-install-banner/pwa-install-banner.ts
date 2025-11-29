import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwaService } from '../../services/pwa.service';

@Component({
  selector: 'app-pwa-install-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="install-banner" *ngIf="showBanner && !isInstalled">
      <div class="banner-content">
        <div class="banner-icon">
          <i class="ri-download-line"></i>
        </div>
        <div class="banner-text">
          <h3>Instale nosso app!</h3>
          <p>Adicione à tela inicial para acesso rápido e melhor experiência.</p>
        </div>
        <div class="banner-actions">
          <button class="btn-install" (click)="installApp()">
            <i class="ri-download-line"></i>
            Instalar
          </button>
          <button class="btn-dismiss" (click)="dismissBanner()">
            <i class="ri-close-line"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .install-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: white;
      padding: 16px;
      box-shadow: 0 -4px 12px rgba(37, 99, 235, 0.3);
      z-index: 1000;
      animation: slideUp 0.3s ease-out;
    }

    .banner-content {
      display: flex;
      align-items: center;
      gap: 16px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .banner-icon {
      font-size: 24px;
      color: white;
      flex-shrink: 0;
    }

    .banner-text {
      flex: 1;
    }

    .banner-text h3 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
    }

    .banner-text p {
      margin: 0;
      font-size: 14px;
      opacity: 0.9;
    }

    .banner-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-install {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn-install:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }

    .btn-dismiss {
      background: transparent;
      color: white;
      border: none;
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-dismiss:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    @keyframes slideUp {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    /* Mobile responsivo */
    @media (max-width: 768px) {
      .banner-content {
        flex-direction: column;
        text-align: center;
        gap: 12px;
      }

      .banner-text {
        order: 2;
      }

      .banner-actions {
        order: 3;
        justify-content: center;
        width: 100%;
      }

      .banner-icon {
        order: 1;
        font-size: 32px;
      }
    }

    /* Esconde banner quando há bottom navigation */
    @media (max-width: 768px) {
      .install-banner {
        bottom: 60px; /* Altura da bottom navigation */
      }
    }
  `]
})
export class PwaInstallBannerComponent implements OnInit, OnDestroy {
  showBanner = false;
  isInstalled = false;
  private bannerDismissed = false;

  constructor(private pwaService: PwaService) {}

  ngOnInit(): void {
    this.checkInstallationStatus();
    this.listenToPWAEvents();
    this.checkBannerVisibility();
  }

  ngOnDestroy(): void {
    // Cleanup se necessário
  }

  private checkInstallationStatus(): void {
    const pwaInfo = this.pwaService.getPWAInfo();
    this.isInstalled = pwaInfo.isInstalled;
  }

  private listenToPWAEvents(): void {
    // Escuta evento de prompt disponível
    window.addEventListener('pwa-install-available', () => {
      this.checkBannerVisibility();
    });

    // Escuta evento de instalação bem-sucedida
    window.addEventListener('pwa-install-success', () => {
      this.isInstalled = true;
      this.showBanner = false;
    });
  }

  private checkBannerVisibility(): void {
    // Verifica se deve mostrar o banner
    const pwaInfo = this.pwaService.getPWAInfo();
    const wasDismissed = localStorage.getItem('pwa-banner-dismissed') === 'true';
    
    this.showBanner = !this.isInstalled && 
                     pwaInfo.canInstall && 
                     !wasDismissed &&
                     !this.bannerDismissed;
  }

  async installApp(): Promise<void> {
    try {
      const success = await this.pwaService.installPWA();
      
      if (success) {
        this.showBanner = false;
        // Pode mostrar uma mensagem de sucesso
        console.log('✅ PWA instalada com sucesso!');
      }
    } catch (error) {
      console.error('❌ Erro ao instalar PWA:', error);
    }
  }

  dismissBanner(): void {
    this.showBanner = false;
    this.bannerDismissed = true;
    
    // Salva no localStorage para não mostrar novamente
    localStorage.setItem('pwa-banner-dismissed', 'true');
  }
}
