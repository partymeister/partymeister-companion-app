import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {SettingsProvider} from './settings';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class VisitorProvider {

    constructor(public http: Http) {
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
        let headers = new Headers({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN}); // ... Set content type to JSON
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.post(SettingsProvider.variables.VISITOR_SIGNUP_API, bodyString, options).map(res => { return res} );
    }

}