import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {NavigationItem, NavigationParameter} from '../models/navigation_item';
import {Observable} from 'rxjs/Rx';
import {Subject}    from 'rxjs/Subject';
import {CacheService} from "ionic-cache/ionic-cache";

import 'rxjs/add/operator/map';

/*
 Generated class for the Navigation provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class NavigationProvider {

    // Observable string sources
    private forceNavigationUpdate = new Subject<any>();

    // Observable string streams
    updated$ = this.forceNavigationUpdate.asObservable();

    // Service message commands
    updateNavigation(operationType) {
        this.forceNavigationUpdate.next(operationType);
    }

    constructor(public http: Http, public cache: CacheService) {
    }

    // Get App operation type
    operationType(): Observable<string> {
        return Observable.timer(0, 10000).mergeMap(() => this.http.get(`https://local.revision-party.net/revision2017.txt`).map(res => res.text().trim()));
    }

    // Load the navigation tree
    load(type): Observable<NavigationItem[]> {
        let request = this.http.get(`https://dl.dropboxusercontent.com/u/166337/pm-companion-app-menu-new.json`);
        return this.cache.loadFromDelayedObservable('navigation', request, 'navigation', 5).map(res => {
                let result = res.json();
                return <NavigationItem[]>result[type];
            }
        );
    }

    // Load the navigation tree from disk
    loadOffline(type): Observable<NavigationItem[]> {
        let request = this.http.get('./assets/data/offline-menu.json');
        return this.cache.loadFromDelayedObservable('navigation', request, 'navigation', 5).map(res => {
                let result = res.json();
                return <NavigationItem[]>result[type];
            }
        );
    }

    parseItems(navigationItems: NavigationItem[], components, submenu: {} = {}) {
        let pages = [];
        for (let item of navigationItems) {
            let parent = {
                title: item.title,
                icon: item.icon,
                component: components[item.container],
                callFunction: item.callFunction,
                params: item.parameters,
                children: []

            };
            if (!submenu.hasOwnProperty(item.title)) {
                submenu[item.title] = false;
            }
            if (item.items) {
                let children = [];
                for (let subitem of item.items) {
                    let parameters = subitem.parameters;
                    parameters.subitem = true;
                    children.push({
                        title: subitem.title,
                        icon: subitem.icon,
                        component: components[subitem.container],
                        callFunction: subitem.callFunction,
                        params: subitem.parameters
                    });
                }
                parent.children = children;
            }
            pages.push(parent);
        }
        return {pages: pages, submenu: submenu};
    }

}
