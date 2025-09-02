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
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
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
