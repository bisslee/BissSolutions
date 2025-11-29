import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { API_CONFIG } from '../config/api.config';
import { LoginRequest, LoginResponse, UserInfo } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${API_CONFIG.apiUrl}/api/admin/auth`;
  private readonly tokenKey = 'jwt_token';
  private readonly refreshTokenKey = 'refresh_token';
  private readonly userKey = 'user_info';

  private currentUserSubject = new BehaviorSubject<UserInfo | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Realiza login
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials, { headers })
      .pipe(
        tap(response => {
          this.storeTokens(response);
          this.storeUser(response.user);
          this.currentUserSubject.next(response.user);
        }),
        catchError(error => {
          console.error('Erro no login:', error);
          throw error;
        })
      );
  }

  /**
   * Realiza logout
   */
  logout(): void {
    const token = this.getToken();
    
    if (token) {
      // Opcional: chamar endpoint de logout no backend
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.http.post(`${this.apiUrl}/logout`, {}, { headers })
        .subscribe({
          next: () => console.log('Logout realizado com sucesso no backend'),
          error: (error) => console.error('Erro ao realizar logout no backend:', error)
        });
    }

    this.clearAuthData();
    this.currentUserSubject.next(null);
    this.router.navigate(['/admin/login']);
  }

  /**
   * Obtém informações do usuário logado
   */
  getCurrentUser(): Observable<UserInfo> {
    const headers = this.getAuthHeaders();

    return this.http.get<UserInfo>(`${this.apiUrl}/me`, { headers })
      .pipe(
        tap(user => {
          this.storeUser(user);
          this.currentUserSubject.next(user);
        }),
        catchError(error => {
          console.error('Erro ao obter usuário atual:', error);
          // Se o token estiver inválido, fazer logout
          if (error.status === 401) {
            this.logout();
          }
          throw error;
        })
      );
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    // Verificar se o token não expirou
    try {
      const tokenData = this.decodeToken(token);
      const expirationTime = tokenData.exp * 1000; // Converter para milissegundos
      const now = Date.now();
      
      if (now >= expirationTime) {
        this.clearAuthData();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      this.clearAuthData();
      return false;
    }
  }

  /**
   * Obtém o token JWT
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Obtém o refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  /**
   * Obtém o usuário atual
   */
  getCurrentUserValue(): UserInfo | null {
    return this.currentUserSubject.value;
  }

  /**
   * Obtém headers com autenticação
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  /**
   * Armazena tokens no localStorage
   */
  private storeTokens(response: LoginResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.refreshTokenKey, response.refreshToken);
  }

  /**
   * Armazena informações do usuário no localStorage
   */
  private storeUser(user: UserInfo): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  /**
   * Obtém usuário armazenado
   */
  private getStoredUser(): UserInfo | null {
    const stored = localStorage.getItem(this.userKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Erro ao parsear usuário armazenado:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Limpa dados de autenticação
   */
  private clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
  }

  /**
   * Decodifica token JWT (sem verificação)
   */
  private decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}

