import { HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';
import { map, Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(
    private token: TokenStorageService,
    private toastr: ToastrService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.token.getToken();
    if (token != null) {
      request = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    return next.handle(request).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            // console.log("api call success :", event);
          }
        },
        error => {
          //logging the http response to browser's console in case of a failuer
          if (error instanceof HttpErrorResponse && error.status === 403) {
            this.toastr.error("Cette action n'est pas permise en mode démo")
          }
        }
      )
    );
  }
}