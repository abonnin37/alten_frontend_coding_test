import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoginPayload, Login, SignupResponse} from '../../models/auth.class';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated: boolean;
  public user: Login;
  private signupResponse$: BehaviorSubject<SignupResponse> = new BehaviorSubject<SignupResponse>(null);
  public login$: BehaviorSubject<Login> = new BehaviorSubject<Login>(null);

  constructor(private http: HttpClient) { }

  signup(signup: LoginPayload): Observable<SignupResponse> {
    this.http.post<SignupResponse>('http://localhost:3000/api/auth/signup', signup).subscribe(
      response => {
        this.signupResponse$.next(response);
      },
      (error: HttpErrorResponse) => {
        this.signupResponse$.error(error.error.error);
      }
    );

    return this.signupResponse$;
  }

  login(login: LoginPayload): Observable<Login> {
    this.http.post<Login>('http://localhost:3000/api/auth/login', login).subscribe(
      response => {
        this.isAuthenticated = true;
        this.user = response;
        this.login$.next(response);
      },
      error => {
        this.login$.error(error.error);
      }
    );

    return this.login$;
  }
}
