import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

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

}