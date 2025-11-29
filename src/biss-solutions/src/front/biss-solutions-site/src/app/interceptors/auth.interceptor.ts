import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Interceptor para adicionar token JWT automaticamente nas requisições
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obter token
  const token = authService.getToken();

  // Clonar request e adicionar header Authorization se houver token
  let clonedRequest = req;
  
  if (token) {
    clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Executar request e tratar erros
  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // Se for erro 401 (não autorizado), fazer logout e redirecionar
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/admin/login'], {
          queryParams: { returnUrl: router.url }
        });
      }

      return throwError(() => error);
    })
  );
};

