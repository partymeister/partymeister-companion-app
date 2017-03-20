import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ViewController} from 'ionic-angular';
import {Entry, Image} from '../../models/entry';

@Component({
    selector: 'page-entry-modal',
    templateUrl: 'entry-modal.html'
})
export class EntryModalPage {
    public entry: Entry;

    constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
        this.entry = this.navParams.data.entry;
    }

    closeMe(refresh) {
        this.viewCtrl.dismiss();
    }
}
