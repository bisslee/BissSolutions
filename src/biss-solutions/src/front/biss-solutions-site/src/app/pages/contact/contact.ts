import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeroSection } from '../../components/hero-section/hero-section';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb';
import { SeoService } from '../../services/seo.service';
import { SchemaService } from '../../services/schema.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { ToastService } from '../../services/toast.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeroSection, BreadcrumbComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit {

  isSubmitting = false;

  constructor(
    private seoService: SeoService,
    private schemaService: SchemaService,
    private breadcrumbService: BreadcrumbService,
    private toastService: ToastService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.seoService.updateSEOWithSchema(this.seoService.getContactSEO());
    this.schemaService.addLocalBusinessSchema();
    this.breadcrumbService.setBreadcrumbs(this.breadcrumbService.getBreadcrumbsForPage('contact'));
  }
  formData = {
    nome: '',
    email: '',
    telefone: '',
    company: '',
    assunto: '',
    mensagem: ''
  };

  onSubmit() {
    if (this.isSubmitting) {
      return;
    }

    // Validar campos obrigatórios conforme a API
    if (!this.formData.nome || !this.formData.email || !this.formData.telefone ||
        !this.formData.assunto || !this.formData.mensagem) {
      this.toastService.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.isSubmitting = true;

    const contactRequest = {
      fullName: this.formData.nome,
      email: this.formData.email,
      phone: this.formData.telefone,
      company: this.formData.company || null,
      subject: this.formData.assunto,
      message: this.formData.mensagem
    };

    // Enviar via API mktools.biss.com.br
    this.contactService.sendContact(contactRequest).subscribe({
      next: (response) => {
        console.log('Mensagem enviada com sucesso:', response);
        this.toastService.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        this.resetForm();
      },
      error: (error) => {
        console.error('Erro ao enviar mensagem via API:', error);
        const errorMessage = error?.error?.message || error?.message || 'Erro ao enviar mensagem. Tente novamente.';
        this.toastService.error(errorMessage);
        this.isSubmitting = false;
      }
    });
  }

  private resetForm(): void {
    this.formData = {
      nome: '',
      email: '',
      telefone: '',
      company: '',
      assunto: '',
      mensagem: ''
    };
    this.isSubmitting = false;
  }

}
