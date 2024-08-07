import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> { 
    request = request.clone()
    if (request.url.includes('/login') ){ 
      // Se for a página de login, simplesmente continue com a solicitação sem modificá-la
      return next.handle(request);
    }else{
      let localToken = localStorage.getItem('token');
        if (localToken){
          localToken = localToken.replace(/["']/g, ''); // Isso remove todas as aspas duplas na string
          request = request.clone({headers: request.headers.set('Authorization', 'Bearer '+ localToken)})
        }
        return next.handle(request); 
      }
  }
}
