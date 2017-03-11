import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {Page} from '../models/page';
import {CacheService} from "ionic-cache/ionic-cache";
import {Md5} from 'ts-md5/dist/md5';
/*
 Generated class for the Pages provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class PagesProvider {

    constructor(public http: Http, public cache: CacheService) {
    }

    // Load a page
    load(data: string, force: boolean): Observable<Page> {
        let request = this.http.get(`${data}`);
        if (force) {
            return request.map(res => <Page>res.json());
        }
        return this.cache.loadFromObservable('page_' + Md5.hashStr(data), request, 'pages', 60*60).map(res => <Page>res.json());
    }

}
