import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {SettingsProvider} from './settings';
import 'rxjs/add/operator/map';
import {StorageProvider} from './storage';
import {Ticket} from '../models/ticket';

@Injectable()
export class TicketProvider {

    public ticket: Ticket;

    constructor(public http: Http, private storageProvider: StorageProvider) {
    }

    loadTickets() {
        return this.storageProvider.get('tickets').then(res => {
            if (res == null) {
                return [];
            }
            return <Ticket[]>res;
        });
    }

    updateTickets(tickets) {
        this.storageProvider.set('tickets', tickets);
    }

    ticketRequest(data) {
        let bodyString = JSON.stringify(data); // Stringify payload
        let headers = new Headers({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN}); // ... Set content type to JSON
        let options = new RequestOptions({headers: headers}); // Create a request option

        return this.http.post(SettingsProvider.variables.TICKET_API, bodyString, options).map(res => {
            let result = res.json();
            let ticket = <Ticket>result.data;
            return this.storageProvider.get('tickets').then(res => {
                if (res == null) {
                    res = [];
                }
                let duplicate: boolean = false;
                res.forEach((r, index) => {
                    if (r.code == ticket.code) {
                        duplicate = true;
                    }
                });

                if (duplicate == false) {
                    res.push(ticket);
                }
                this.storageProvider.set('tickets', res);
                return res;
            });
        });
    }

}
