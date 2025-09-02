import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterService } from './toaster.service';
import { Subscription } from 'rxjs';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toaster-container" *ngIf="messages.length > 0">
             <div
         *ngFor="let message of messages"
         class="toast-message"
         [ngClass]="message.type"
       >
        <div class="toast-icon">
          <i *ngIf="message.type === 'success'" class="ri-check-line"></i>
          <i *ngIf="message.type === 'error'" class="ri-error-warning-line"></i>
          <i *ngIf="message.type === 'warning'" class="ri-alert-line"></i>
          <i *ngIf="message.type === 'info'" class="ri-information-line"></i>
        </div>
        <div class="toast-content">
          <p class="toast-text">{{ message.message }}</p>
        </div>
        <button class="toast-close" (click)="removeMessage(message.id)">
          <i class="ri-close-line"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toaster-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 400px;
    }

    .toast-message {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideInRight 0.3s ease-out;
      border-left: 4px solid;
      min-height: 60px;
    }

    .toast-message.success {
      background: #f0fdf4;
      border-left-color: #22c55e;
      color: #166534;
    }

    .toast-message.error {
      background: #fef2f2;
      border-left-color: #ef4444;
      color: #991b1b;
    }

    .toast-message.warning {
      background: #fffbeb;
      border-left-color: #f59e0b;
      color: #92400e;
    }

    .toast-message.info {
      background: #eff6ff;
      border-left-color: #3b82f6;
      color: #1e40af;
    }

    .toast-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .toast-icon i {
      font-size: 1.25rem;
    }

    .toast-content {
      flex: 1;
      min-width: 0;
    }

    .toast-text {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 500;
      line-height: 1.4;
    }

    .toast-close {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      opacity: 0.7;
      transition: opacity 0.2s ease;
    }

    .toast-close:hover {
      opacity: 1;
      background: rgba(0, 0, 0, 0.1);
    }

    .toast-close i {
      font-size: 1rem;
    }

    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    /* Responsivo */
    @media (max-width: 768px) {
      .toaster-container {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
      }

      .toast-message {
        padding: 14px 16px;
        min-height: 56px;
      }

      .toast-text {
        font-size: 0.9rem;
      }
    }

    @media (max-width: 480px) {
      .toaster-container {
        top: 5px;
        right: 5px;
        left: 5px;
      }

      .toast-message {
        padding: 12px 14px;
        gap: 10px;
      }

      .toast-icon {
        width: 20px;
        height: 20px;
      }

      .toast-icon i {
        font-size: 1.125rem;
      }

      .toast-close {
        width: 20px;
        height: 20px;
      }
    }
  `],

})
export class ToasterComponent implements OnInit, OnDestroy {
  messages: ToastMessage[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private toasterService: ToasterService) {}

  ngOnInit() {
    this.subscription = this.toasterService.messages$.subscribe(
      messages => this.messages = messages
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeMessage(id: string) {
    this.toasterService.removeMessage(id);
  }
}
