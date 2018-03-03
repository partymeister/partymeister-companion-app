import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ViewController} from 'ionic-angular';
import {Ticket} from '../../models/ticket';

@IonicPage()
@Component({
    selector: 'page-ticket-modal',
    templateUrl: 'ticket-modal.html'
})
export class TicketModalPage {
    public ticket: Ticket;

    constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
        this.ticket = this.navParams.data.ticket;
    }

    closeMe(refresh) {
        this.viewCtrl.dismiss();
    }
}
