import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ViewController} from 'ionic-angular';
import {CountryPickerService} from 'angular2-countrypicker';
import {CountryProvider} from '../../providers/country';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Entry, Image} from '../../models/entry';

/*
 Generated class for the SignupModal page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-entry-modal',
    templateUrl: 'entry-modal.html'
})
export class EntryModalPage {
    public entry: Entry;
    constructor(private http: Http, private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
        this.entry = this.navParams.data.entry;
    }

    closeMe(refresh) {
        this.viewCtrl.dismiss();
    }

}
