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
        console.error('Error intercepted:', error); // Debugging line

        if (error) {
          switch (error.status) {
            //case 200: console.log("All good - 200");
            //  break;
            //case 204: console.log("Everything works fine - 204");
            //  break;
            case 400:
              if (error.error.errors) {
                const modalStateErrors: string[] = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                modalStateErrors.flat().forEach((errMsg) =>
                  this.toastr.error(errMsg)
                );
                return throwError(() => modalStateErrors.flat());
              } else if (typeof error.error === 'object') {
                this.toastr.error('Błąd żądania', error.status.toString());
              } else {
                this.toastr.error(error.error, error.status.toString());
              }
              break;
            case 401:
              this.toastr.error('Brak autoryzacji 401', error.status.toString());
              break;
              case 403:
              this.toastr.error('Brak autoryzacji 403', error.status.toString());
              break;
            case 404:
              this.toastr.error('Nieznaleziono', error.status.toString());
              // this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            //default:
            //  this.toastr.error('Coś poszło nie tak');
            //  console.error(error);
            //  break;
          }
        }
        return throwError(() => error);
      })
    );
  }
}
