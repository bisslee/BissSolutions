

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ContactRequest {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  message: string;
  contactId: string;
}

export interface ContactError {
  type: string;
  title: string;
  status: number;
  errors: { [key: string]: string[] };
  traceId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly apiUrl = 'https://mktools.biss.com.br/api/Contact/BissSolutions';

  constructor(private http: HttpClient) {}

  sendContact(contactData: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.apiUrl, contactData)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Erro ao enviar mensagem. Tente novamente.';

    if (error.error instanceof ErrorEvent) {
      // Erro do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do servidor
      if (error.status === 400 && error.error?.errors) {
        const validationErrors = error.error.errors;
        const errorMessages = Object.values(validationErrors).flat();
        errorMessage = `Erros de validação: ${errorMessages.join(', ')}`;
      } else if (error.status === 0) {
        errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
      } else if (error.status >= 500) {
        errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
