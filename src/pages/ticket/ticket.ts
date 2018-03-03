import {Component} from '@angular/core';
import {NavController, NavParams, ModalController, IonicPage} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {AlertController} from 'ionic-angular';
import {TicketProvider} from '../../providers/ticket';
import {Ticket} from '../../models/ticket';
import {TicketModalPage} from '../ticket-modal/ticket-modal';
import {MasterPage} from '../master/master';

@IonicPage()
@Component({
    selector: 'page-ticket',
    templateUrl: 'ticket.html',
})

export class TicketPage extends MasterPage {
    private form: FormGroup;
    public subscriptionActive: boolean = false;
    public tickets: Ticket[] = [];

    constructor(private alertCtrl: AlertController,
                public navCtrl: NavController,
                public navParams: NavParams,
                private formBuilder: FormBuilder,
                private barcodeScanner: BarcodeScanner,
                private ticketProvider: TicketProvider,
                private modalCtrl: ModalController,
    ) {
        super(navCtrl, navParams);

        this.form = this.formBuilder.group({
            last_name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            code: ['', Validators.required],
        });

        this.ticketSubscription();
    }

    removeTicket(t) {
        this.tickets.forEach((ticket, index) => {
            if (t.code == ticket.code) {
                this.tickets.splice(index, 1);
            }
        });
        this.ticketProvider.updateTickets(this.tickets);
    }

    showTicket(t) {
        let modal = this.modalCtrl.create(TicketModalPage, {ticket: t});
        modal.present();
    }

    openCamera(event) {

        this.barcodeScanner.scan().then((barcodeData) => {
            this.form.patchValue({code: barcodeData.text});
        }, (err) => {
            // An error occurred
        });
        event.stopPropagation();
    }

    doRefresh(refresher?) {
        if (this.connectivityService.isOffline()) {
            if (refresher) {
                refresher.complete();
            }
            return;
        }
        this.ticketSubscription(refresher);
    }

    ticketSubscription(refresher?) {
        this.ticketProvider.loadTickets().then(result => {
            this.subscriptionActive = true;
            this.tickets = result;
            if (refresher) {
                refresher.complete();
            }
        });
    }

    submit() {
        this.ticketProvider.ticketRequest(this.form.value)
            .subscribe(result => {
                    result.then(tickets => this.tickets = <any>tickets);
                    this.form.reset();
                },
                err => {
                    let alert = this.alertCtrl.create({
                        title: 'Unsuccessful :(',
                        subTitle: 'Looks like this ticket code is invalid or you entered the wrong last name',
                        buttons: ['OK']
                    });
                    alert.present();
                }
            );
    }
}
