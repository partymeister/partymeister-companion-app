import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {Page} from '../models/page';
import {Md5} from 'ts-md5/dist/md5';
import {SettingsProvider} from "./settings";
import {CacheService} from "ionic-cache";

@Injectable()
export class PagesProvider {

    constructor(public http: HttpClient, public cache: CacheService) {
    }

    // Load a page
    load(data: string, force: boolean): Observable<Page> {
        let request = this.http.get(`${data}`);
        if (force) {
            this.cache.clearGroup('page_' + Md5.hashStr(data));
            return this.cache.loadFromDelayedObservable('page_' + Md5.hashStr(data), request, 'page_' + Md5.hashStr(data), SettingsProvider.variables.CACHE_TIMEOUT_PAGES).map(res => <Page>res);
        }
        return this.cache.loadFromDelayedObservable('page_' + Md5.hashStr(data), request, 'page_' + Md5.hashStr(data), SettingsProvider.variables.CACHE_TIMEOUT_PAGES).map(res => <Page>res);
    }

}
