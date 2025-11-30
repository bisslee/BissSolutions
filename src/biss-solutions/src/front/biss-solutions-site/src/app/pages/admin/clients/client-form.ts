import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { ToastService } from '../../../services/toast.service';
import { Client } from '../../../models/client.models';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.html',
  styleUrl: './client-form.css'
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isLoading = false;
  isEditMode = false;
  clientId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.clientForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      versions: ['', [Validators.maxLength(200)]],
      description: ['', [Validators.maxLength(2000)]],
      servicesProvided: ['', [Validators.maxLength(2000)]],
      logo: ['', [Validators.maxLength(500)]],
      projectImage: ['', [Validators.maxLength(500)]],
      projectLink: ['', [Validators.maxLength(500)]],
      website: ['', [Validators.maxLength(500)]],
      isActive: [true],
      order: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.clientId = id; // GUID como string
      this.loadClient();
    }
  }

  loadClient(): void {
    if (!this.clientId) return;

    this.isLoading = true;
    this.clientService.getClientById(this.clientId).subscribe({
      next: (client) => {
        this.clientForm.patchValue({
          name: client.name,
          versions: client.versions || '',
          description: client.description || '',
          servicesProvided: client.servicesProvided || '',
          logo: client.logo || '',
          projectImage: client.projectImage || '',
          projectLink: client.projectLink || '',
          website: client.website || '',
          isActive: client.isActive,
          order: client.order
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.show('Erro ao carregar cliente.', 'error');
        this.isLoading = false;
        this.router.navigate(['/admin/clients']);
        console.error('Erro ao carregar cliente:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      this.markFormGroupTouched(this.clientForm);
      return;
    }

    this.isLoading = true;

    const formValue = this.clientForm.value;

    if (this.isEditMode && this.clientId) {
      // Atualizar
      this.clientService.updateClient(this.clientId, { ...formValue, id: this.clientId }).subscribe({
        next: () => {
          this.toastService.show('Cliente atualizado com sucesso!', 'success');
          this.router.navigate(['/admin/clients']);
        },
        error: (error) => {
          this.toastService.show('Erro ao atualizar cliente. Tente novamente.', 'error');
          this.isLoading = false;
          console.error('Erro ao atualizar:', error);
        }
      });
    } else {
      // Criar
      this.clientService.createClient(formValue).subscribe({
        next: () => {
          this.toastService.show('Cliente criado com sucesso!', 'success');
          this.router.navigate(['/admin/clients']);
        },
        error: (error) => {
          this.toastService.show('Erro ao criar cliente. Tente novamente.', 'error');
          this.isLoading = false;
          console.error('Erro ao criar:', error);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/clients']);
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
    const field = this.clientForm.get(fieldName);
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

