import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private cookieConsentSubject = new BehaviorSubject<boolean>(false);
  public cookieConsent$ = this.cookieConsentSubject.asObservable();

  private readonly COOKIE_CONSENT_KEY = 'cookie-consent';

  constructor() {
    this.loadCookieConsent();
  }

  // Verificar se o usuário já deu consentimento
  hasConsent(): boolean {
    return this.cookieConsentSubject.value;
  }

  // Dar consentimento para cookies
  giveConsent(): void {
    this.cookieConsentSubject.next(true);
    this.saveCookieConsent(true);
  }

  // Recusar cookies
  denyConsent(): void {
    this.cookieConsentSubject.next(false);
    this.saveCookieConsent(false);
  }

  // Carregar consentimento salvo
  private loadCookieConsent(): void {
    const consent = localStorage.getItem(this.COOKIE_CONSENT_KEY);
    if (consent !== null) {
      this.cookieConsentSubject.next(consent === 'true');
    }
  }

  // Salvar consentimento
  private saveCookieConsent(consent: boolean): void {
    localStorage.setItem(this.COOKIE_CONSENT_KEY, consent.toString());
  }

  // Verificar se é primeira visita
  isFirstVisit(): boolean {
    return localStorage.getItem(this.COOKIE_CONSENT_KEY) === null;
  }

  // Limpar dados de consentimento (para testes)
  clearConsent(): void {
    localStorage.removeItem(this.COOKIE_CONSENT_KEY);
    this.cookieConsentSubject.next(false);
  }
}
