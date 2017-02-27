import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NavigationItem, NavigationParameter } from '../models/navigation_item';
import {Observable} from 'rxjs/Rx';
import {CacheService} from "ionic-cache/ionic-cache";

import 'rxjs/add/operator/map';

/*
  Generated class for the Navigation provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NavigationProvider {

  constructor(public http: Http, public cache: CacheService) {
  }

  // Load the navigation tree
  load(): Observable<NavigationItem[]> {
    let request = this.http.get(`https://dl.dropboxusercontent.com/u/166337/pm-companion-app-menu.json`);
    return this.cache.loadFromObservable('navigation', request, 'navigation', 5).map(res => <NavigationItem[]>res.json());
  }

}
