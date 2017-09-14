import { Injectable, ChangeDetectorRef } from '@angular/core'
import { Headers, Http, Response } from '@angular/http'
import { tokenNotExpired } from 'angular2-jwt';
import { User } from "./user"
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LoginData } from "./login-data";
import { UserCreate } from "./user-create";
import { Token } from "./token";


@Injectable()
export class AuthService {

  loggedInSubject: BehaviorSubject<boolean>;
  loggedIn: Observable<boolean>;

  baseUrl = "/api/auth/"

  constructor(
    private http: Http
  ) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.loggedIn = this.loggedInSubject.asObservable()
  }

  login(data: LoginData): Observable<boolean> {
    return this.http.post(`${this.baseUrl}login`, data)
      .map((response) => response.json())
      .map((json) => {
        if (json.token) {
          localStorage.setItem("token", json.token);
          this.loggedInSubject.next(true);
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleErrorObservable);
  }

  register(data: UserCreate): Observable<boolean> {
    return this.http.post(`${this.baseUrl}register`, data)
      .map((response) => response.json())
      .map((json) => {
        if (json.token) {
          localStorage.setItem("token", json.token);
          this.loggedInSubject.next(true);
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleErrorObservable);
  }

  logout() {
    localStorage.removeItem("token");
    this.loggedInSubject.next(false);
  }

  private hasToken() {
    return !!localStorage.getItem("token");
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
