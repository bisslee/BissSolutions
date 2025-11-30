import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../services/service.service';
import { ToastService } from '../../../services/toast.service';
import { Service } from '../../../models/service.models';

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './service-form.html',
  styleUrl: './service-form.css'
})
export class ServiceFormComponent implements OnInit {
  serviceForm: FormGroup;
  isLoading = false;
  isEditMode = false;
  serviceId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.serviceForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.maxLength(2000)]],
      serviceTypes: ['', [Validators.maxLength(5000)]],
      image: ['', [Validators.maxLength(500)]],
      slug: ['', [Validators.maxLength(200)]],
      isNew: [false],
      featuredOnHome: [false],
      isActive: [true],
      order: [0, [Validators.required, Validators.min(0)]]
    });

    // Auto-gerar slug a partir do título
    this.serviceForm.get('title')?.valueChanges.subscribe(title => {
      if (title && !this.isEditMode) {
        const slug = this.generateSlug(title);
        this.serviceForm.patchValue({ slug }, { emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.serviceId = id; // GUID como string
      this.loadService();
    }
  }

  loadService(): void {
    if (!this.serviceId) return;

    this.isLoading = true;
    this.serviceService.getServiceById(this.serviceId).subscribe({
      next: (service) => {
        this.serviceForm.patchValue({
          title: service.title,
          description: service.description || '',
          serviceTypes: service.serviceTypes || '',
          image: service.image || '',
          slug: service.slug,
          isNew: service.isNew,
          featuredOnHome: service.featuredOnHome,
          isActive: service.isActive,
          order: service.order
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.show('Erro ao carregar serviço.', 'error');
        this.isLoading = false;
        this.router.navigate(['/admin/services']);
        console.error('Erro ao carregar serviço:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.serviceForm.invalid) {
      this.markFormGroupTouched(this.serviceForm);
      return;
    }

    this.isLoading = true;

    const formValue = this.serviceForm.value;

    if (this.isEditMode && this.serviceId) {
      // Atualizar
      this.serviceService.updateService(this.serviceId, {
        ...formValue,
        id: this.serviceId
      }).subscribe({
        next: () => {
          this.toastService.show('Serviço atualizado com sucesso!', 'success');
          this.router.navigate(['/admin/services']);
        },
        error: (error) => {
          this.toastService.show('Erro ao atualizar serviço. Tente novamente.', 'error');
          this.isLoading = false;
          console.error('Erro ao atualizar:', error);
        }
      });
    } else {
      // Criar
      this.serviceService.createService(formValue).subscribe({
        next: () => {
          this.toastService.show('Serviço criado com sucesso!', 'success');
          this.router.navigate(['/admin/services']);
        },
        error: (error) => {
          this.toastService.show('Erro ao criar serviço. Tente novamente.', 'error');
          this.isLoading = false;
          console.error('Erro ao criar:', error);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/services']);
  }

  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
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
    const field = this.serviceForm.get(fieldName);
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

