import {Injectable} from '@angular/core';
import {SettingsProvider} from './settings';
import 'rxjs/add/operator/map';
import {StorageProvider} from '../providers/storage';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN})
};

@Injectable()
export class AuthProvider {

    private authenticated: boolean = false;
    public user: User;

    constructor(public http: HttpClient, private storageProvider: StorageProvider) {
        this.storageProvider.get('user').then(res => {
            if (res != null) {
                this.user = <User><any>res;
                this.authenticated = true;
            }
        });
    }

    uniqid() {
        return this.user.uniqid;
    }

    doLogin(user) {
        this.user = <User>user;
        this.storageProvider.set('user', user);
        this.authenticated = true;

        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    doLogout() {
        this.user = <User>{};
        this.storageProvider.remove('user');
        this.authenticated = false;
    }

    isAuthenticated() {
        return this.authenticated;
    }

    loginRequest(data) {
        let bodyString = JSON.stringify(data); // Stringify payload

        return Observable.fromPromise(this.storageProvider.get('local-api-base-url').then(res => {
            return res;
        })).flatMap(res => {
            return this.http.post(res + SettingsProvider.variables.LOGIN_API, bodyString, httpOptions)
                .map(res => {
                    return res;
                });
        });

    }

    registrationRequest(data) {
        let bodyString = JSON.stringify(data); // Stringify payload

        return Observable.fromPromise(this.storageProvider.get('local-api-base-url').then(res => {
            return res;
        })).flatMap(res => {
            return this.http.post(res + SettingsProvider.variables.REGISTRATION_API, bodyString, httpOptions).map(res => {
                return res;
            });
        });
    }

}
