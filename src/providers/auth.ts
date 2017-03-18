import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  private authenticated: boolean = false;

  constructor(public http: Http) {
  }

  doLogin() {
    this.authenticated = true;
  }

  doLogout() {
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }

}
