import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {SettingsProvider} from './settings';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN})
};


@Injectable()
export class VisitorProvider {

    constructor(public http: HttpClient) {
    }

    filterItems(visitors, searchTerm) {

        if (searchTerm == '') {
            return visitors;
        }

        return visitors.filter((visitor) => {
            let a = visitor.handle.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            let b = visitor.groups.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            let c = visitor.country_code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            if (a || b || c) {
                return visitor;
            }
        });

    }

    signupRequest(data) {
        let bodyString = JSON.stringify(data); // Stringify payload

        return this.http.post(SettingsProvider.variables.VISITOR_SIGNUP_API, bodyString, httpOptions).map(res => {
            return res
        });
    }

}