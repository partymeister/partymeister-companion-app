import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {SettingsProvider} from './settings';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {Ticket} from '../models/ticket';


@Injectable()
export class TicketProvider {

    public ticket: Ticket;

    constructor(public http: Http, private storage: Storage) {
    }

    loadTickets() {
        return this.storage.get('tickets').then(res => {
            if (res == null) {
                return [];
            }
            return <Ticket[]>res;
        });
    }

    ticketRequest(data) {
        let bodyString = JSON.stringify(data); // Stringify payload
        let headers = new Headers({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN}); // ... Set content type to JSON
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.post(SettingsProvider.variables.TICKET_API, bodyString, options).map(res => {
            let result = res.json();
            let ticket = <Ticket>result.data;
            return this.storage.get('tickets').then(res => {
                if (res == null) {
                    res = [];
                }
                res.push(ticket);
                this.storage.set('tickets', res);
                return res;
            });
        });
    }

}
