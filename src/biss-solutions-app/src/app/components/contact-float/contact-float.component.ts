import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent, ContactFormData } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-float',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  template: `
    <!-- Botão Flutuante -->
    <button
      class="contact-float-btn"
      (click)="toggleContactForm()"
      [class.active]="isContactFormOpen"
      [attr.aria-label]="isContactFormOpen ? 'Fechar formulário de contato' : 'Abrir formulário de contato'"
    >
      <i class="fas fa-comments" *ngIf="!isContactFormOpen"></i>
      <i class="fas fa-times" *ngIf="isContactFormOpen"></i>
    </button>

    <!-- Overlay do Formulário -->
    <div
      class="contact-overlay"
      [class.active]="isContactFormOpen"
      (click)="closeContactForm()"
    ></div>

    <!-- Formulário de Contato -->
    <div class="contact-form-wrapper" [class.active]="isContactFormOpen">
      <div class="contact-form-header">
        <h3>Entre em Contato</h3>
        <button
          class="close-btn"
          (click)="closeContactForm()"
          aria-label="Fechar formulário"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <app-contact-form
        (formSubmit)="onFormSubmit($event)"
      ></app-contact-form>
    </div>
  `,
  styles: [`
    .contact-float-btn {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #2563eb;
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
      transition: all 0.3s ease;
      z-index: 1001;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .contact-float-btn:hover {
      background: #1d4ed8;
      transform: scale(1.1);
      box-shadow: 0 12px 35px rgba(37, 99, 235, 0.4);
    }

    .contact-float-btn.active {
      background: #ef4444;
      transform: rotate(90deg);
    }

    .contact-float-btn.active:hover {
      background: #dc2626;
    }

    .contact-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1002;
    }

    .contact-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .contact-form-wrapper {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1003;
      max-width: 90vw;
      max-height: 90vh;
      overflow-y: auto;
    }

    .contact-form-wrapper.active {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
      visibility: visible;
    }

    .contact-form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #2563eb;
      color: white;
      padding: 1.5rem 2rem;
      border-radius: 12px 12px 0 0;
      margin-bottom: 0;
    }

    .contact-form-header h3 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .close-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 1.25rem;
      padding: 0.5rem;
      border-radius: 50%;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
    }

    .close-btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    /* Ajustes para o formulário dentro do wrapper */
    .contact-form-wrapper ::ng-deep .contact-form-container {
      border-radius: 0 0 12px 12px;
      margin: 0;
      box-shadow: none;
    }

    .contact-form-wrapper ::ng-deep .form-header {
      display: none;
    }

    @media (max-width: 768px) {
      .contact-float-btn {
        bottom: 1.5rem;
        right: 1.5rem;
        width: 55px;
        height: 55px;
        font-size: 1.25rem;
      }

      .contact-form-wrapper {
        max-width: 95vw;
        max-height: 95vh;
      }

      .contact-form-header {
        padding: 1rem 1.5rem;
      }

      .contact-form-header h3 {
        font-size: 1.25rem;
      }
    }

    @media (max-width: 480px) {
      .contact-float-btn {
        bottom: 1rem;
        right: 1rem;
        width: 50px;
        height: 50px;
        font-size: 1.125rem;
      }

      .contact-form-wrapper {
        max-width: 98vw;
        max-height: 98vh;
      }

      .contact-form-header {
        padding: 0.875rem 1.25rem;
      }

      .contact-form-header h3 {
        font-size: 1.125rem;
      }
    }

    /* Animações */
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }

    .contact-float-btn:not(.active) {
      animation: bounce 2s infinite;
    }

    .contact-float-btn.active {
      animation: none;
    }
  `]
})
export class ContactFloatComponent {
  @Output() contactFormSubmit = new EventEmitter<ContactFormData>();

  isContactFormOpen: boolean = false;

  toggleContactForm(): void {
    this.isContactFormOpen = !this.isContactFormOpen;

    // Previne scroll do body quando o formulário está aberto
    if (this.isContactFormOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeContactForm(): void {
    this.isContactFormOpen = false;
    document.body.style.overflow = '';
  }

  onFormSubmit(formData: ContactFormData): void {
    this.contactFormSubmit.emit(formData);
    this.closeContactForm();
  }
}
