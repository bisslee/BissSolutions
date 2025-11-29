import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactRequest {
  fullName: string;
  email: string;
  phone: string;
  company?: string | null;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success?: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly apiBaseUrl = 'https://mktools.biss.com.br/api/Contact';
  private readonly clientName = 'biss-solutions';

  constructor(private http: HttpClient) {}

  sendContact(contact: ContactRequest): Observable<ContactResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${this.apiBaseUrl}/${this.clientName}`;
    return this.http.post<ContactResponse>(url, contact, { headers });
  }
}

