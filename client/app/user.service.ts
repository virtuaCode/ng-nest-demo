import { Injectable } from '@angular/core'
import { Headers, Http, Response} from '@angular/http'

import { User } from "./user"
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthHttp } from "angular2-jwt/angular2-jwt";


@Injectable()
export class UserService {

    baseUrl = "/api/users/"

    constructor(private authHttp: AuthHttp) { }

    getUsers(): Observable<User[]> {
        return this.authHttp.get(this.baseUrl)
        .map((response: Response) => response.json())
        .catch(this.handleErrorObservable);
        
        //return Promise.resolve(UserS)
    }

    getUser(id: number): Observable<User> {
        return this.authHttp.get(`${this.baseUrl}${id}`)
        .map((response: Response) => response.json())
        .catch(this.handleErrorObservable);
    }

    private handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}