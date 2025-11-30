import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Client, ClientCreateRequest, ClientUpdateRequest } from '../models/client.models';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly apiUrl = `${API_CONFIG.apiUrl}/api/admin/clients`;
  private readonly publicApiUrl = `${API_CONFIG.apiUrl}/api/clients`;

  constructor(private http: HttpClient) {}

  /**
   * Lista todos os clientes (admin - inclui inativos)
   */
  getAllClients(includeInactive: boolean = true): Observable<Client[]> {
    const params = includeInactive ? '?includeInactive=true' : '';
    return this.http.get<Client[]>(`${this.apiUrl}${params}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Lista clientes ativos (público)
   */
  getActiveClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.publicApiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtém um cliente por ID
   */
  getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Cria um novo cliente
   */
  createClient(client: ClientCreateRequest): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Atualiza um cliente existente
   */
  updateClient(id: string, client: ClientUpdateRequest): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Deleta um cliente (soft delete)
   */
  deleteClient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Ativa/Desativa um cliente
   */
  toggleActive(id: string): Observable<Client> {
    return this.http.patch<Client>(`${this.apiUrl}/${id}/toggle-active`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro no ClientService:', error);
    let errorMessage = 'Ocorreu um erro ao processar a requisição.';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}

