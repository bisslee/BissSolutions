import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Product, ProductCreateRequest, ProductUpdateRequest } from '../models/product.models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = `${API_CONFIG.apiUrl}/api/admin/products`;
  private readonly publicApiUrl = `${API_CONFIG.apiUrl}/api/products`;

  constructor(private http: HttpClient) {}

  /**
   * Lista todos os produtos (admin - inclui inativos)
   */
  getAllProducts(includeInactive: boolean = true): Observable<Product[]> {
    const params = includeInactive ? '?includeInactive=true' : '';
    return this.http.get<Product[]>(`${this.apiUrl}${params}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Lista produtos ativos (público)
   */
  getActiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.publicApiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Lista produtos por categoria (público)
   */
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.publicApiUrl}/category/${category}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtém um produto por ID
   */
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Cria um novo produto
   */
  createProduct(product: ProductCreateRequest): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Product>(this.apiUrl, product, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Atualiza um produto existente
   */
  updateProduct(id: string, product: ProductUpdateRequest): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Deleta um produto (soft delete)
   */
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Ativa/Desativa um produto
   */
  toggleActive(id: string): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}/toggle-active`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro no ProductService:', error);
    let errorMessage = 'Ocorreu um erro ao processar a requisição.';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}

