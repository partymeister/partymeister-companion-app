import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Entry, Image} from '../../models/entry';
import {CacheService} from "ionic-cache/ionic-cache";
import {SettingsProvider} from '../../providers/settings';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {sprintf} from "sprintf-js";
import {AuthProvider} from '../../providers/auth';
import {ModalController, Nav} from 'ionic-angular';
import {EntryModalPage} from '../entry-modal/entry-modal';

/*
 Generated class for the Entries page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-entry',
    templateUrl: 'entry.html'
})
export class EntryPage {
    public title: string;
    public entries: Entry[];

    constructor(private modalCtrl: ModalController, private authProvider: AuthProvider, private cache: CacheService, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
        this.title = navParams.data.title;

        this.entrySubscription();

    }

    entrySubscription(refresher?) {
        this.loadEntries().subscribe(result => {
            this.entries = result;
            if (refresher) {
                refresher.complete();
            }
        });
    }

    doRefresh(refresher?) {
        this.entrySubscription(refresher);
    }

    loadEntries() {
        let headers = new Headers({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN}); // ... Set content type to JSON
        let options = new RequestOptions({headers: headers}); // Create a request option

        let request = this.http.get(sprintf(SettingsProvider.variables.ENTRY_API, this.authProvider.uniqid()) + '?' + Math.floor((Math.random() * 1000000) + 1), options);
        return this.cache.loadFromObservable('entries', request, 'entries', 1).map(res => {
                return <Entry[]>res.json().data;
            }
        );
    }

    presentEntryModal(entry: Entry)  {
        let entryModal = this.modalCtrl.create(EntryModalPage, {entry: entry});
        entryModal.onDidDismiss(data => {
            console.log("Modal closed");
        });
        entryModal.present(EntryModalPage);
    }
}



