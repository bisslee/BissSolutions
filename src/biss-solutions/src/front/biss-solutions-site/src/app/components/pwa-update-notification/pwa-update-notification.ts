import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwaService } from '../../services/pwa.service';

@Component({
  selector: 'app-pwa-update-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="update-notification" *ngIf="showUpdateNotification">
      <div class="notification-content">
        <div class="notification-icon">
          <i class="ri-refresh-line"></i>
        </div>
        <div class="notification-text">
          <h3>Nova versão disponível!</h3>
          <p>Uma atualização está disponível com melhorias e correções.</p>
        </div>
        <div class="notification-actions">
          <button class="btn-update" (click)="updateApp()">
            <i class="ri-download-line"></i>
            Atualizar
          </button>
          <button class="btn-dismiss" (click)="dismissNotification()">
            <i class="ri-close-line"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .update-notification {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      color: white;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
      z-index: 1001;
      animation: slideDown 0.3s ease-out;
    }

    .notification-content {
      display: flex;
      align-items: center;
      gap: 16px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .notification-icon {
      font-size: 24px;
      color: white;
      flex-shrink: 0;
      animation: spin 2s linear infinite;
    }

    .notification-text {
      flex: 1;
    }

    .notification-text h3 {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
    }

    .notification-text p {
      margin: 0;
      font-size: 14px;
      opacity: 0.9;
    }

    .notification-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-update {
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

    .btn-update:hover {
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

    @keyframes slideDown {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* Mobile responsivo */
    @media (max-width: 768px) {
      .notification-content {
        flex-direction: column;
        text-align: center;
        gap: 12px;
      }

      .notification-text {
        order: 2;
      }

      .notification-actions {
        order: 3;
        justify-content: center;
        width: 100%;
      }

      .notification-icon {
        order: 1;
        font-size: 32px;
      }
    }
  `]
})
export class PwaUpdateNotificationComponent implements OnInit, OnDestroy {
  showUpdateNotification = false;

  constructor(private pwaService: PwaService) {}

  ngOnInit(): void {
    this.listenToUpdateEvents();
  }

  ngOnDestroy(): void {
    // Cleanup se necessário
  }

  private listenToUpdateEvents(): void {
    // Escuta evento de atualização disponível
    window.addEventListener('pwa-update-available', () => {
      this.showUpdateNotification = true;
    });
  }

  async updateApp(): Promise<void> {
    try {
      await this.pwaService.updatePWA();
      this.showUpdateNotification = false;
    } catch (error) {
      console.error('❌ Erro ao atualizar PWA:', error);
    }
  }

  dismissNotification(): void {
    this.showUpdateNotification = false;
  }
}
