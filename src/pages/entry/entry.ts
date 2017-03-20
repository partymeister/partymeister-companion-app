import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Entry, Image} from '../../models/entry';
import {ModalController} from 'ionic-angular';
import {EntryModalPage} from '../entry-modal/entry-modal';
import {EntryProvider} from '../../providers/entry';
import {MasterPage} from '../master/master';

@Component({
    selector: 'page-entry',
    templateUrl: 'entry.html'
})
export class EntryPage extends MasterPage {
    public entries: Entry[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private entryProvider: EntryProvider) {
        super(navCtrl, navParams);

        this.title = navParams.data.title;

        this.entrySubscription();

    }

    entrySubscription(refresher?) {
        this.entryProvider.loadEntries().subscribe(result => {
            this.entries = result;
            if (refresher) {
                refresher.complete();
            }
        });
    }

    doRefresh(refresher?) {
        this.entrySubscription(refresher);
    }

    presentEntryModal(entry: Entry)  {
        let entryModal = this.modalCtrl.create(EntryModalPage, {entry: entry});
        entryModal.onDidDismiss(data => {
            console.log("Modal closed");
        });
        entryModal.present(EntryModalPage);
    }
}