import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {SettingsProvider} from './settings';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {sprintf} from "sprintf-js";
import {AuthProvider} from './auth';
import {Entry} from '../models/entry';
import {CacheService} from "ionic-cache";
import {Observable} from "rxjs/Observable";
import {StorageProvider} from "./storage";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN})
};

@Injectable()
export class EntryProvider {

    constructor(public http: HttpClient, private authProvider: AuthProvider, private cache: CacheService, private storageProvider: StorageProvider) {
    }

    loadEntries() {

        return Observable.fromPromise(this.storageProvider.get('local-api-base-url').then(res => {
            return res;
        })).flatMap(res => {
            return Observable.fromPromise(this.storageProvider.get('user').then(user => {
                return user;
            })).flatMap(user => {
                let request = this.http.get(res + sprintf(SettingsProvider.variables.ENTRY_API, user.uniqid) + '?' + Math.floor((Math.random() * 1000000) + 1), httpOptions);
                return request.map(res => {
                        return <Entry[]>res['data'];
                    }
                );
            });
        });
    }

}