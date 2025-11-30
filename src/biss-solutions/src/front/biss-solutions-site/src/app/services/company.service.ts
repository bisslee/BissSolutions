import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Company, CompanyUpdateRequest } from '../models/company.models';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly apiUrl = `${API_CONFIG.apiUrl}/api/admin/company`;
  private readonly publicApiUrl = `${API_CONFIG.apiUrl}/api/company`;

  constructor(private http: HttpClient) {}

  /**
   * Obtém as informações da empresa (admin)
   */
  getCompany(): Observable<Company> {
    return this.http.get<Company>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtém as informações públicas da empresa
   */
  getPublicCompany(): Observable<Company> {
    return this.http.get<Company>(this.publicApiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Atualiza as informações da empresa
   */
  updateCompany(company: CompanyUpdateRequest): Observable<Company> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<Company>(this.apiUrl, company, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro no CompanyService:', error);
    let errorMessage = 'Ocorreu um erro ao processar a requisição.';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}

