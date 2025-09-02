import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent, ContactFormData } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-float',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './contact-float.component.html',
  styleUrls: ['./contact-float.component.css']
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
