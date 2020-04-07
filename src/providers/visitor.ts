import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {SettingsProvider} from './settings';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {StorageProvider} from "./storage";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN})
};


@Injectable()
export class VisitorProvider {

    constructor(public http: HttpClient, private storageProvider: StorageProvider) {
    }

    filterItems(visitors, searchTerm) {

        if (searchTerm == '') {
            return visitors;
        }

        return visitors.filter((visitor) => {
            let a = visitor.handle.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            let b = visitor.groups.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            let c = visitor.country.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            if (a || b || c) {
                return visitor;
            }
        });

    }

    signupRequest(data) {
        let bodyString = JSON.stringify(data); // Stringify payload

        return Observable.fromPromise(this.storageProvider.get('website-api-base-url').then(apiUrl => {
            return apiUrl;
        })).flatMap(apiUrl => {
            return this.http.post(apiUrl + SettingsProvider.variables.VISITOR_SIGNUP_API, bodyString, httpOptions).map(res => {
                return res
            });
        });
    }

}
