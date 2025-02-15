import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Przechwycono błąd:', error); 
        switch (error.status) {
          case 400:
            this.toastr.error(error.error?.message || 'Błąd żądania', '400');
            break;

          case 401:
            this.toastr.error('Brak autoryzacji', '401');
            break;

          case 403:
            this.toastr.error('Brak dostępu', '403');
            break;

          case 404:
            this.toastr.error('Nie znaleziono zasobu', '404');
            break;

          case 500:
            const navigationExtras: NavigationExtras = { state: { error: error.error } };
            this.router.navigateByUrl('/server-error', navigationExtras);
            break;

          default:
            this.toastr.error('Coś poszło nie tak');
            console.error(error);
            break;
        }

        return throwError(() => error);
      })
    );
  }
}
