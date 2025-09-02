import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToasterService } from '../toaster/toaster.service';
import { ContactService, ContactRequest } from '../../services/contact.service';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contact-form-container">
      <div class="form-header">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>

      <form class="contact-form" (ngSubmit)="onSubmit()" #contactForm="ngForm">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Nome Completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              [(ngModel)]="formData.name"
              required
              [class.error]="showErrors && !formData.name"
              placeholder="Digite seu nome completo"
            />
            <span class="error-message" *ngIf="showErrors && !formData.name">
              Nome é obrigatório
            </span>
          </div>

          <div class="form-group">
            <label for="email">E-mail *</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="formData.email"
              required
              [class.error]="showErrors && !isValidEmail(formData.email)"
              placeholder="seu@email.com"
            />
            <span class="error-message" *ngIf="showErrors && !isValidEmail(formData.email)">
              E-mail válido é obrigatório
            </span>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="phone">Telefone *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              [(ngModel)]="formData.phone"
              required
              [class.error]="showErrors && !formData.phone"
              placeholder="(11) 99999-9999"
            />
            <span class="error-message" *ngIf="showErrors && !formData.phone">
              Telefone é obrigatório
            </span>
          </div>

          <div class="form-group">
            <label for="company">Empresa</label>
            <input
              type="text"
              id="company"
              name="company"
              [(ngModel)]="formData.company"
              placeholder="Nome da sua empresa"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="subject">Assunto *</label>
          <select
            id="subject"
            name="subject"
            [(ngModel)]="formData.subject"
            required
            [class.error]="showErrors && !formData.subject"
          >
            <option value="">Selecione um assunto</option>
            <option value="orcamento">Solicitar Orçamento</option>
            <option value="consultoria">Consultoria</option>
            <option value="parceria">Proposta de Parceria</option>
            <option value="suporte">Suporte Técnico</option>
            <option value="outro">Outro</option>
          </select>
          <span class="error-message" *ngIf="showErrors && !formData.subject">
            Assunto é obrigatório
          </span>
        </div>

        <div class="form-group">
          <label for="message">Mensagem *</label>
          <textarea
            id="message"
            name="message"
            [(ngModel)]="formData.message"
            required
            rows="5"
            [class.error]="showErrors && !formData.message"
            placeholder="Descreva sua necessidade ou solicitação..."
          ></textarea>
          <span class="error-message" *ngIf="showErrors && !formData.message">
            Mensagem é obrigatória
          </span>
        </div>

        <div class="form-actions">
          <button
            type="submit"
            class="btn btn-primary"
            [disabled]="isSubmitting"
          >
            <span *ngIf="!isSubmitting">Enviar Mensagem</span>
            <span *ngIf="isSubmitting">
              <i class="fas fa-spinner fa-spin"></i>
              Enviando...
            </span>
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .contact-form-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .form-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .form-header h3 {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1f2937;
      margin: 0 0 0.5rem 0;
    }

    .form-header p {
      color: #6b7280;
      margin: 0;
      line-height: 1.5;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 0.75rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: white;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
      border-color: #ef4444;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
    }

    .btn-primary {
      background: #2563eb;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #1d4ed8;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
    }

    .btn-primary:disabled {
      background: #9ca3af;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    @media (max-width: 768px) {
      .contact-form-container {
        padding: 1.5rem;
        margin: 0 1rem;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }

      .form-header h3 {
        font-size: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .contact-form-container {
        padding: 1rem;
      }

      .form-header h3 {
        font-size: 1.25rem;
      }

      .btn {
        padding: 0.875rem 1.5rem;
        font-size: 0.875rem;
      }
    }
  `]
})
export class ContactFormComponent {
  @Output() formSubmit = new EventEmitter<ContactFormData>();

  title: string = 'Entre em Contato';
  description: string = 'Preencha o formulário abaixo e entraremos em contato em breve.';

  constructor(
    private toasterService: ToasterService,
    private contactService: ContactService
  ) {}

  formData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  };

  isSubmitting: boolean = false;
  showErrors: boolean = false;

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onSubmit(): void {
    this.showErrors = true;

    if (this.isFormValid()) {
      this.isSubmitting = true;

      // Mapeia os dados do formulário para o formato da API
      const contactRequest: ContactRequest = {
        fullName: this.formData.name,
        email: this.formData.email,
        phone: this.formData.phone,
        company: this.formData.company || undefined,
        subject: this.formData.subject,
        message: this.formData.message
      };

      // Envia para a API
      this.contactService.sendContact(contactRequest).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.toasterService.showSuccess('Mensagem enviada com sucesso! Entraremos em contato em breve.');
          this.formSubmit.emit(this.formData);
          this.resetForm();
          console.log('Contato enviado com sucesso:', response);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.toasterService.showError(error.message);
          console.error('Erro ao enviar contato:', error);
        }
      });
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.formData.name &&
      this.formData.email &&
      this.isValidEmail(this.formData.email) &&
      this.formData.phone &&
      this.formData.subject &&
      this.formData.message
    );
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    };
    this.showErrors = false;
  }
}
