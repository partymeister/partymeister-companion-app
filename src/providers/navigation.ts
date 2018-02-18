import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NavigationItem} from '../models/navigation_item';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {SettingsProvider} from "./settings";
import 'rxjs/add/operator/map';
import {CacheService} from "ionic-cache";

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

    constructor(public http: HttpClient, public cache: CacheService) {
    }

    // Get App operation type
    operationType(): Observable<string> {
        return Observable.timer(0, 10000).mergeMap(() => this.http.get(SettingsProvider.variables.OPERATION_TYPE_URL, {responseType: 'text'}).map(res => res.trim()));
    }

    // Load the navigation tree
    load(type): Observable<NavigationItem[]> {
        let request = this.http.get(SettingsProvider.variables.MENU_URL);
        return this.cache.loadFromDelayedObservable('navigation', request, 'navigation', SettingsProvider.variables.CACHE_TIMEOUT_NAVIGATION).map(res => {
                return <NavigationItem[]>res[type];
            }
        );
    }

    // Load the navigation tree from disk
    loadOffline(type): Observable<NavigationItem[]> {
        let request = this.http.get('./assets/data/offline-menu.json');
        return this.cache.loadFromDelayedObservable('navigation', request, 'navigation', SettingsProvider.variables.CACHE_TIMEOUT_NAVIGATION).map(res => {
                return <NavigationItem[]>res[type];
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
