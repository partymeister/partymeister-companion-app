import {Injectable} from '@angular/core';
import {SettingsProvider} from './settings';
import 'rxjs/add/operator/map';
import {StorageProvider} from './storage';
import {AuthProvider} from './auth';
import {Ticket} from '../models/ticket';
import {Subject}    from 'rxjs/Subject';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN})
};

@Injectable()
export class TicketProvider {

    public ticket: Ticket;

    // Observable string sources
    private atHomeUpdated = new Subject<any>();

    // Observable string streams
    atHome$ = this.atHomeUpdated.asObservable();

    constructor(public http: HttpClient, private storageProvider: StorageProvider, private authProvider: AuthProvider) {
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
        return this.http.post(SettingsProvider.variables.TICKET_API + '?api_token=' + SettingsProvider.variables.API_TOKEN, bodyString, httpOptions).map(res => {
            let ticket = <Ticket>res['data'];
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
