import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {User} from './user.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import jwtDecode from 'jwt-decode';
import {WebSocketService} from '../events/web-socket.service';
import {CurrentUserService} from './current-user.service';

export interface AuthResponseData {
  idToken: string;
}

export interface AuthToken {
  username: string;
  sub: string;
  iat: number;
  exp: number;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router,
              private currentUser: CurrentUserService,
              private webSocketService: WebSocketService) {
  }

  login(username: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${environment.restApiBaseUrl}/auth/login`,
      {
        username, password
      }).pipe(catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.idToken,
        );
      }));
  }

  logout(): void {
    this.currentUser.user.next(null);
    this.webSocketService.disconnect();
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin(): void {
    const userData: {
      username: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.username,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.currentUser.user.next(loadedUser);
      this.webSocketService.connect();
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    } else {
      this.logout();
    }
  }

  autoLogout(expirationDuration: number): void {
    const date = new Date(0);
    date.setSeconds(Math.floor(expirationDuration / 1000));
    console.log(`expires in: ${date.getMinutes()}m ${date.getSeconds()}s`);

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(token: string): void {
    const decodedToken: AuthToken = jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    const user = new User(
      decodedToken.username,
      decodedToken.sub,
      token,
      expirationDate
    );
    this.currentUser.user.next(user);
    this.webSocketService.connect();
    this.autoLogout(expirationDate.getTime() - new Date().getTime());
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse): Observable<never> {
    const errorMessage = 'Username - Password combination is wrong!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    return throwError(errorMessage);
  }

}
