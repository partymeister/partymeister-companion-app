import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {NavigationItem, NavigationParameter} from '../models/navigation_item';
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

    // Get App operation type
    operationType(): Observable<string> {
        return Observable.timer(0, 10000).mergeMap(() => this.http.get(`https://local.revision-party.net/revision2017.txt`).map(res => res.text().trim()));
    }

    // Load the navigation tree
    load(type): Observable<NavigationItem[]> {
        let request = this.http.get(`https://dl.dropboxusercontent.com/u/166337/pm-companion-app-menu-new.json`);
        return this.cache.loadFromObservable('navigation', request, 'navigation', 5).map(res => {
                let result = res.json();
                return <NavigationItem[]>result[type];
            }
        );
    }

}
