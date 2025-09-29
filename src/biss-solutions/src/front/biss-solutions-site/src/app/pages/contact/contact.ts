import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeroSection } from '../../components/hero-section/hero-section';
import { SeoService } from '../../services/seo.service';
import { SchemaService } from '../../services/schema.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeroSection],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit {

  constructor(
    private seoService: SeoService,
    private schemaService: SchemaService
  ) {}

  ngOnInit(): void {
    this.seoService.updateSEOWithSchema(this.seoService.getContactSEO());
    this.schemaService.addLocalBusinessSchema();
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
    console.log('Formulário enviado:', this.formData);
    // Aqui você pode implementar a lógica de envio do formulário
    alert('Mensagem enviada com sucesso! Entraremos em contact em breve.');

    // Limpar o formulário
    this.formData = {
      nome: '',
      email: '',
      telefone: '',
      company: '',
      assunto: '',
      mensagem: ''
    };
  }
}
