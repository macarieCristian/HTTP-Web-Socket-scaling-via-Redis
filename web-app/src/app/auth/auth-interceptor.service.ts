import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {exhaustMap, take} from 'rxjs/operators';
import {CurrentUserService} from './current-user.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private currentUser: CurrentUserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.currentUser.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({headers: new HttpHeaders().set('Authorization', `Bearer ${user.token}`)});
        return next.handle(modifiedReq);
      })
    );
  }
}
