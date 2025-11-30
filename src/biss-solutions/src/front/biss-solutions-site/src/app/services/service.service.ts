import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Service, ServiceCreateRequest, ServiceUpdateRequest } from '../models/service.models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private readonly apiUrl = `${API_CONFIG.apiUrl}/api/admin/services`;
  private readonly publicApiUrl = `${API_CONFIG.apiUrl}/api/services`;

  constructor(private http: HttpClient) {}

  /**
   * Lista todos os serviços (admin - inclui inativos)
   */
  getAllServices(includeInactive: boolean = true): Observable<Service[]> {
    const params = includeInactive ? '?includeInactive=true' : '';
    return this.http.get<Service[]>(`${this.apiUrl}${params}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Lista serviços ativos (público)
   */
  getActiveServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.publicApiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtém um serviço por ID
   */
  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtém um serviço por slug (público)
   */
  getServiceBySlug(slug: string): Observable<Service> {
    return this.http.get<Service>(`${this.publicApiUrl}/slug/${slug}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Cria um novo serviço
   */
  createService(service: ServiceCreateRequest): Observable<Service> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Service>(this.apiUrl, service, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Atualiza um serviço existente
   */
  updateService(id: number, service: ServiceUpdateRequest): Observable<Service> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<Service>(`${this.apiUrl}/${id}`, service, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Deleta um serviço (soft delete)
   */
  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Ativa/Desativa um serviço
   */
  toggleActive(id: number): Observable<Service> {
    return this.http.patch<Service>(`${this.apiUrl}/${id}/toggle-active`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtém o total de serviços com filtro opcional
   */
  getServicesCount(statusFilter: 'Active' | 'Inactive' | 'All' = 'All'): Observable<{ count: number; statusFilter: string }> {
    return this.http.get<{ count: number; statusFilter: string }>(`${this.apiUrl}/count?statusFilter=${statusFilter}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro no ServiceService:', error);
    let errorMessage = 'Ocorreu um erro ao processar a requisição.';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}

