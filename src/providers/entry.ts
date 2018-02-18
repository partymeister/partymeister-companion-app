import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {SettingsProvider} from './settings';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {sprintf} from "sprintf-js";
import {AuthProvider} from './auth';
import {Entry} from '../models/entry';
import {CacheService} from "ionic-cache";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN})
};

@Injectable()
export class EntryProvider {

    constructor(public http: HttpClient, private authProvider: AuthProvider, private cache: CacheService) {
    }

    loadEntries() {
        let request = this.http.get(sprintf(SettingsProvider.variables.ENTRY_API, this.authProvider.uniqid()) + '?' + Math.floor((Math.random() * 1000000) + 1), httpOptions);
        return this.cache.loadFromDelayedObservable('entries', request, 'entries', SettingsProvider.variables.CACHE_TIMEOUT_ENTRIES).map(res => {
                return <Entry[]>res['data'];
            }
        );
    }

}