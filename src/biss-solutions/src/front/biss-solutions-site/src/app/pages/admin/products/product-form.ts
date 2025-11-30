import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ToastService } from '../../../services/toast.service';
import { Product } from '../../../models/product.models';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isLoading = false;
  isEditMode = false;
  productId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.maxLength(2000)]],
      currentVersion: ['', [Validators.maxLength(50)]],
      technologyItems: ['', [Validators.maxLength(2000)]],
      features: ['', [Validators.maxLength(5000)]],
      nugetLink: ['', [Validators.maxLength(500)]],
      documentationLink: ['', [Validators.maxLength(500)]],
      githubLink: ['', [Validators.maxLength(500)]],
      productLink: ['', [Validators.maxLength(500)]],
      image: ['', [Validators.maxLength(500)]],
      price: [null],
      category: ['', [Validators.maxLength(100)]],
      isActive: [true],
      order: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = id;
      this.loadProduct();
    }
  }

  loadProduct(): void {
    if (!this.productId) return;

    this.isLoading = true;
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          title: product.title,
          description: product.description || '',
          currentVersion: product.currentVersion || '',
          technologyItems: product.technologyItems || '',
          features: product.features || '',
          nugetLink: product.nugetLink || '',
          documentationLink: product.documentationLink || '',
          githubLink: product.githubLink || '',
          productLink: product.productLink || '',
          image: product.image || '',
          price: product.price || null,
          category: product.category || '',
          isActive: product.isActive,
          order: product.order
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.show('Erro ao carregar produto.', 'error');
        this.isLoading = false;
        this.router.navigate(['/admin/products']);
        console.error('Erro ao carregar produto:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.markFormGroupTouched(this.productForm);
      return;
    }

    this.isLoading = true;

    const formValue = this.productForm.value;

    if (this.isEditMode && this.productId) {
      // Atualizar
      this.productService.updateProduct(this.productId, {
        ...formValue,
        id: this.productId
      }).subscribe({
        next: () => {
          this.toastService.show('Produto atualizado com sucesso!', 'success');
          this.router.navigate(['/admin/products']);
        },
        error: (error) => {
          this.toastService.show('Erro ao atualizar produto. Tente novamente.', 'error');
          this.isLoading = false;
          console.error('Erro ao atualizar:', error);
        }
      });
    } else {
      // Criar
      this.productService.createProduct(formValue).subscribe({
        next: () => {
          this.toastService.show('Produto criado com sucesso!', 'success');
          this.router.navigate(['/admin/products']);
        },
        error: (error) => {
          this.toastService.show('Erro ao criar produto. Tente novamente.', 'error');
          this.isLoading = false;
          console.error('Erro ao criar:', error);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/products']);
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
    const field = this.productForm.get(fieldName);
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

