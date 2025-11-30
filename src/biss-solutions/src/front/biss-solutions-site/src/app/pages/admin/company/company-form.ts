import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { ToastService } from '../../../services/toast.service';
import { Company } from '../../../models/company.models';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-form.html',
  styleUrl: './company-form.css'
})
export class CompanyFormComponent implements OnInit {
  companyForm: FormGroup;
  isLoading = false;
  isSaving = false;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.companyForm = this.formBuilder.group({
      // Informações Básicas
      name: ['', [Validators.maxLength(200)]],
      legalName: ['', [Validators.maxLength(200)]],
      cnpj: ['', [Validators.maxLength(18)]],
      
      // Contato
      email: ['', [Validators.maxLength(100)]],
      phone: ['', [Validators.maxLength(50)]],
      website: ['', [Validators.maxLength(500)]],
      
      // Endereço
      address: ['', [Validators.maxLength(500)]],
      city: ['', [Validators.maxLength(100)]],
      state: ['', [Validators.maxLength(50)]],
      zipCode: ['', [Validators.maxLength(10)]],
      
      // Redes Sociais
      linkedInUrl: ['', [Validators.maxLength(500)]],
      facebookUrl: ['', [Validators.maxLength(500)]],
      instagramUrl: ['', [Validators.maxLength(500)]],
      twitterUrl: ['', [Validators.maxLength(500)]],
      youtubeUrl: ['', [Validators.maxLength(500)]],
      
      // Mídia
      logoUrl: ['', [Validators.maxLength(500)]],
      bannerUrl: ['', [Validators.maxLength(500)]],
      
      // Informações Institucionais
      description: ['', [Validators.maxLength(2000)]],
      mission: ['', [Validators.maxLength(2000)]],
      vision: ['', [Validators.maxLength(2000)]],
      values: ['', [Validators.maxLength(2000)]],
      history: ['', [Validators.maxLength(5000)]],
      
      // Informações Adicionais
      foundedYear: [null],
      numberOfEmployees: ['', [Validators.maxLength(50)]],
      
      // Status
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany(): void {
    this.isLoading = true;
    this.companyService.getCompany().subscribe({
      next: (company) => {
        this.companyForm.patchValue({
          name: company.name || '',
          legalName: company.legalName || '',
          cnpj: company.cnpj || '',
          email: company.email || '',
          phone: company.phone || '',
          website: company.website || '',
          address: company.address || '',
          city: company.city || '',
          state: company.state || '',
          zipCode: company.zipCode || '',
          linkedInUrl: company.linkedInUrl || '',
          facebookUrl: company.facebookUrl || '',
          instagramUrl: company.instagramUrl || '',
          twitterUrl: company.twitterUrl || '',
          youtubeUrl: company.youtubeUrl || '',
          logoUrl: company.logoUrl || '',
          bannerUrl: company.bannerUrl || '',
          description: company.description || '',
          mission: company.mission || '',
          vision: company.vision || '',
          values: company.values || '',
          history: company.history || '',
          foundedYear: company.foundedYear || null,
          numberOfEmployees: company.numberOfEmployees || '',
          isActive: company.isActive ?? true
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.show('Erro ao carregar informações da empresa.', 'error');
        this.isLoading = false;
        console.error('Erro ao carregar empresa:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.companyForm.invalid) {
      this.markFormGroupTouched(this.companyForm);
      return;
    }

    this.isSaving = true;

    const formValue = this.companyForm.value;

    this.companyService.updateCompany(formValue).subscribe({
      next: () => {
        this.toastService.show('Informações da empresa atualizadas com sucesso!', 'success');
        this.isSaving = false;
        // Recarregar dados após salvar
        this.loadCompany();
      },
      error: (error) => {
        this.toastService.show('Erro ao atualizar informações da empresa. Tente novamente.', 'error');
        this.isSaving = false;
        console.error('Erro ao atualizar:', error);
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getFieldError(fieldName: string): string | null {
    const field = this.companyForm.get(fieldName);
    if (field && field.invalid && field.touched) {
      if (field.errors?.['required']) {
        return 'Este campo é obrigatório';
      }
      if (field.errors?.['maxlength']) {
        return `Máximo de ${field.errors['maxlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }
}

