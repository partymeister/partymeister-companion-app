import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Entry, Image} from '../../models/entry';
import {ModalController} from 'ionic-angular';
import {EntryModalPage} from '../entry-modal/entry-modal';
import {EntryProvider} from '../../providers/entry';
import {MasterPage} from '../master/master';
import {PhotoViewer} from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
    selector: 'page-entry',
    templateUrl: 'entry.html'
})
export class EntryPage extends MasterPage {
    public entries: Entry[];
    public subscriptionActive: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private modalCtrl: ModalController,
                private entryProvider: EntryProvider,
                private photoViewer: PhotoViewer) {
        super(navCtrl, navParams);

        this.entrySubscription();
    }

    entrySubscription(refresher?) {
        this.entryProvider.loadEntries().subscribe(result => {
            this.subscriptionActive = true;
            this.entries = result;
            if (refresher) {
                refresher.complete();
            }
        });
    }

    doRefresh(refresher?) {
        if (this.connectivityService.isOffline()) {
            if (refresher) {
                refresher.complete();
            }
            return;
        }
        this.entrySubscription(refresher);
    }

    presentEntryModal(entry: Entry) {
        let entryModal = this.modalCtrl.create(EntryModalPage, {entry: entry});
        entryModal.onDidDismiss(data => {
            console.log("Modal closed");
        });
        entryModal.present();
    }

    showPreview(entry) {
        this.photoViewer.show(entry.screenshot.url, 'Screenshot preview', {share: false});
    }
}