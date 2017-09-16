import { Injectable } from '@angular/core'
import { Headers, Http, Response } from '@angular/http'

import { User } from "./user"
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { ProfileData } from './profile-data';
import { AuthService } from './auth.service';
import { Profile } from './profile';


@Injectable()
export class UserService {

    baseUrl = "/api/users/"

    constructor(private authHttp: AuthHttp, private authService: AuthService) { }

    getUsers(): Observable<User[]> {
        return this.authHttp.get(this.baseUrl)
            .map((response: Response) => response.json())
            .catch(this.handleErrorObservable);
    }

    getUser(id: number): Observable<User> {
        return this.authHttp.get(`${this.baseUrl}${id}`)
            .map((response: Response) => response.json())
            .catch(this.handleErrorObservable);
    }

    getProfile(): Observable<Profile> {
        const userId = this.authService.getUserId();

        if (userId === undefined)
            return Observable.throw(new Error("Not logged in"));

        return this.authHttp.get(`${this.baseUrl}${userId}/profile`)
            .map((response: Response) => response.json())
            .catch(this.handleErrorObservable);
    }

    setProfile(profile: ProfileData): Observable<Profile> {
        const userId = this.authService.getUserId();

        if (userId === undefined)
            return Observable.throw(new Error("Not logged in"));

        return this.authHttp.put(`${this.baseUrl}${userId}/profile`, profile)
            .map((response: Response) => response.json())
            .catch(this.handleErrorObservable);
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}