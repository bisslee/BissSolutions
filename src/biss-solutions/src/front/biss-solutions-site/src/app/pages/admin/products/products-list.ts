import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ToastService } from '../../../services/toast.service';
import { Product } from '../../../models/product.models';

type StatusFilter = 'All' | 'Active' | 'Inactive';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css'
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  searchTerm = '';
  statusFilter: StatusFilter = 'All';
  categoryFilter = '';

  constructor(
    private productService: ProductService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts(true).subscribe({
      next: (data) => {
        // Filtrar localmente baseado no statusFilter
        if (this.statusFilter === 'Active') {
          this.products = data.filter(p => p.isActive);
        } else if (this.statusFilter === 'Inactive') {
          this.products = data.filter(p => !p.isActive);
        } else {
          this.products = data; // 'All' - mostrar todos
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.show('Erro ao carregar produtos. Tente novamente.', 'error');
        this.isLoading = false;
        console.error('Erro ao carregar produtos:', error);
      }
    });
  }

  onStatusFilterChange(): void {
    this.loadProducts();
  }

  onCategoryFilterChange(): void {
    this.loadProducts();
  }

  toggleActive(product: Product): void {
    if (!product.id) return;

    this.productService.toggleActive(product.id).subscribe({
      next: (updatedProduct) => {
        product.isActive = updatedProduct.isActive;
        this.toastService.show(
          `Produto ${updatedProduct.isActive ? 'ativado' : 'desativado'} com sucesso!`,
          'success'
        );
      },
      error: (error) => {
        this.toastService.show('Erro ao alterar status do produto.', 'error');
        console.error('Erro ao alterar status:', error);
      }
    });
  }

  deleteProduct(product: Product): void {
    if (!product.id) return;

    if (!confirm(`Tem certeza que deseja excluir o produto "${product.title}"?`)) {
      return;
    }

    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.toastService.show('Produto excluído com sucesso!', 'success');
        this.loadProducts(); // Recarregar lista
      },
      error: (error) => {
        this.toastService.show('Erro ao excluir produto.', 'error');
        console.error('Erro ao excluir:', error);
      }
    });
  }

  editProduct(product: Product): void {
    if (!product.id) return;
    this.router.navigate(['/admin/products/edit', product.id]);
  }

  get filteredProducts(): Product[] {
    let filtered = this.products;

    // Filtrar por busca
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term) ||
        product.category?.toLowerCase().includes(term)
      );
    }

    // Filtrar por categoria
    if (this.categoryFilter) {
      filtered = filtered.filter(product => product.category === this.categoryFilter);
    }

    return filtered;
  }

  get uniqueCategories(): string[] {
    const categories = this.products
      .map(p => p.category)
      .filter((c): c is string => !!c);
    return [...new Set(categories)].sort();
  }
}

