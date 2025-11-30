import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Partner, PartnerCreateRequest, PartnerUpdateRequest } from '../models/partner.models';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private readonly apiUrl = `${API_CONFIG.apiUrl}/api/admin/partners`;
  private readonly publicApiUrl = `${API_CONFIG.apiUrl}/api/partners`;

  constructor(private http: HttpClient) {}

  /**
   * Lista todos os parceiros (admin - inclui inativos)
   */
  getAllPartners(includeInactive: boolean = true): Observable<Partner[]> {
    const params = includeInactive ? '?includeInactive=true' : '';
    return this.http.get<Partner[]>(`${this.apiUrl}${params}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Lista parceiros ativos (público)
   */
  getActivePartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.publicApiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtém um parceiro por ID
   */
  getPartnerById(id: string): Observable<Partner> {
    return this.http.get<Partner>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Cria um novo parceiro
   */
  createPartner(partner: PartnerCreateRequest): Observable<Partner> {
    return this.http.post<Partner>(this.apiUrl, partner)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Atualiza um parceiro existente
   */
  updatePartner(id: string, partner: PartnerUpdateRequest): Observable<Partner> {
    return this.http.put<Partner>(`${this.apiUrl}/${id}`, partner)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Deleta um parceiro (soft delete)
   */
  deletePartner(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Ativa/Desativa um parceiro
   */
  toggleActive(id: string): Observable<Partner> {
    return this.http.patch<Partner>(`${this.apiUrl}/${id}/toggle-active`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro no PartnerService:', error);
    let errorMessage = 'Ocorreu um erro ao processar a requisição.';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}

