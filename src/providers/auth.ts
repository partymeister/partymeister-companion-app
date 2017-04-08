import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {SettingsProvider} from './settings';
import 'rxjs/add/operator/map';
import {StorageProvider} from '../providers/storage';
import {User} from '../models/user';

@Injectable()
export class AuthProvider {

    private authenticated: boolean = false;
    public user: User;

    constructor(public http: Http, private storageProvider: StorageProvider) {
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
        let headers = new Headers({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN}); // ... Set content type to JSON
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.post(SettingsProvider.variables.LOGIN_API, bodyString, options)
            .map(res => {
                return res;
            });
    }

    registrationRequest(data) {
        let bodyString = JSON.stringify(data); // Stringify payload
        let headers = new Headers({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN}); // ... Set content type to JSON
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.post(SettingsProvider.variables.REGISTRATION_API, bodyString, options).map(res => { return res;} );
    }

}
