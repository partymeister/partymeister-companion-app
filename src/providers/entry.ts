import {Injectable} from '@angular/core';
import {CacheService} from "ionic-cache/ionic-cache";
import 'rxjs/add/operator/map';
import {SettingsProvider} from './settings';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {sprintf} from "sprintf-js";
import {AuthProvider} from './auth';
import {Entry} from '../models/entry';

@Injectable()
export class EntryProvider {

    constructor(public http: Http, private authProvider: AuthProvider, private cache: CacheService) {
    }

    loadEntries() {
        let headers = new Headers({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN}); // ... Set content type to JSON
        let options = new RequestOptions({headers: headers}); // Create a request option

        let request = this.http.get(sprintf(SettingsProvider.variables.ENTRY_API, this.authProvider.uniqid()) + '?' + Math.floor((Math.random() * 1000000) + 1), options);
        return this.cache.loadFromDelayedObservable('entries', request, 'entries', SettingsProvider.variables.CACHE_TIMEOUT_ENTRIES).map(res => {
                return <Entry[]>res.json().data;
            }
        );
    }

}