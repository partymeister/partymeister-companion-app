import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ViewController} from 'ionic-angular';
import {Entry} from '../../models/entry';
import {PhotoViewer} from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
    selector: 'page-entry-modal',
    templateUrl: 'entry-modal.html'
})
export class EntryModalPage {
    public entry: Entry;

    constructor(private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private photoViewer: PhotoViewer) {
        this.entry = this.navParams.data.entry;
    }

    closeMe(refresh) {
        this.viewCtrl.dismiss();
    }

    showPreview() {
        this.photoViewer.show(this.entry.preview.url, 'Beamslide preview', {share:false});
    }
}
