import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PartnerService } from '../../../services/partner.service';
import { ToastService } from '../../../services/toast.service';
import { Partner } from '../../../models/partner.models';

@Component({
  selector: 'app-partner-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './partner-form.html',
  styleUrl: './partner-form.css'
})
export class PartnerFormComponent implements OnInit {
  partnerForm: FormGroup;
  isLoading = false;
  isEditMode = false;
  partnerId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private partnerService: PartnerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.partnerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      logo: ['', [Validators.maxLength(500)]],
      description: ['', [Validators.maxLength(2000)]],
      website: ['', [Validators.maxLength(500)]],
      isActive: [true],
      order: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.partnerId = parseInt(id, 10);
      this.loadPartner();
    }
  }

  loadPartner(): void {
    if (!this.partnerId) return;

    this.isLoading = true;
    this.partnerService.getPartnerById(this.partnerId).subscribe({
      next: (partner) => {
        this.partnerForm.patchValue({
          name: partner.name,
          logo: partner.logo || '',
          description: partner.description || '',
          website: partner.website || '',
          isActive: partner.isActive,
          order: partner.order
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.show('Erro ao carregar parceiro.', 'error');
        this.isLoading = false;
        this.router.navigate(['/admin/partners']);
        console.error('Erro ao carregar parceiro:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.partnerForm.invalid) {
      this.markFormGroupTouched(this.partnerForm);
      return;
    }

    this.isLoading = true;

    const formValue = this.partnerForm.value;

    if (this.isEditMode && this.partnerId) {
      // Atualizar
      this.partnerService.updatePartner(this.partnerId, formValue).subscribe({
        next: () => {
          this.toastService.show('Parceiro atualizado com sucesso!', 'success');
          this.router.navigate(['/admin/partners']);
        },
        error: (error) => {
          this.toastService.show('Erro ao atualizar parceiro. Tente novamente.', 'error');
          this.isLoading = false;
          console.error('Erro ao atualizar:', error);
        }
      });
    } else {
      // Criar
      this.partnerService.createPartner(formValue).subscribe({
        next: () => {
          this.toastService.show('Parceiro criado com sucesso!', 'success');
          this.router.navigate(['/admin/partners']);
        },
        error: (error) => {
          this.toastService.show('Erro ao criar parceiro. Tente novamente.', 'error');
          this.isLoading = false;
          console.error('Erro ao criar:', error);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/partners']);
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
    const field = this.partnerForm.get(fieldName);
    if (field && field.invalid && field.touched) {
      if (field.errors?.['required']) {
        return 'Este campo é obrigatório';
      }
      if (field.errors?.['maxlength']) {
        return `Máximo de ${field.errors['maxlength'].requiredLength} caracteres`;
      }
      if (field.errors?.['min']) {
        return `Valor mínimo é ${field.errors['min'].min}`;
      }
    }
    return null;
  }
}

