import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {SettingsProvider} from './settings';
import 'rxjs/add/operator/map';
import {StorageProvider} from './storage';
import {AuthProvider} from './auth';
import {Ticket} from '../models/ticket';
import {Subject}    from 'rxjs/Subject';

@Injectable()
export class TicketProvider {

    public ticket: Ticket;

    // Observable string sources
    private atHomeUpdated = new Subject<any>();

    // Observable string streams
    atHome$ = this.atHomeUpdated.asObservable();

    constructor(public http: Http, private storageProvider: StorageProvider, private authProvider: AuthProvider) {
    }

    loadTickets() {
        return this.storageProvider.get('tickets').then(res => {
            if (res == null) {
                return [];
            }

            let tickets = <Ticket[]><any>res;

            // check if there are any @home tickets in the database
            this.checkAtHomeTicket(tickets);

            return tickets;
        });
    }

    updateTickets(tickets) {
        this.storageProvider.set('tickets', tickets);
        this.checkAtHomeTicket(tickets);
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
                    res = <any>[];
                }
                let tickets = <any> res;
                let duplicate: boolean = false;
                for (let r of tickets) {
                    if (r.code == ticket.code) {
                        duplicate = true;
                    }
                }

                if (duplicate == false) {
                    tickets.push(ticket);
                }

                // check if there are any @home tickets in the database
                this.checkAtHomeTicket(tickets);

                this.storageProvider.set('tickets', tickets);
                return tickets;
            });
        });
    }

    checkAtHomeTicket(tickets) {
        let found = false;
        for (let t of tickets) {
            if (t.type == 'I Love Revision but I can&#39;t be there Ticket') {
                found = true;
            }
        }
        this.storageProvider.set('atHome', found);

        // Log out user in case we're dealing with an atHome ticket holder
        if (found) {
            this.authProvider.doLogout();
        }

        this.atHomeUpdated.next({atHome: found});
    }

}
