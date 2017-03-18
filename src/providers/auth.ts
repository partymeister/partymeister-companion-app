import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {User} from '../models/user';

/*
 Generated class for the Auth provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AuthProvider {

    private authenticated: boolean = false;
    public user: User;

    constructor(public http: Http, private storage: Storage) {
        storage.get('user').then(res => {
            console.log(res);
            if (res != null) {
                this.user = <User>res;
                this.authenticated = true;
            }
        });
    }

    doLogin(user) {
        this.user = <User>user;
        this.storage.set('user', user);
        this.authenticated = true;

        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    doLogout() {
        this.user = <User>{};
        this.storage.remove('user');
        this.authenticated = false;
    }

    isAuthenticated() {
        return this.authenticated;
    }

}
