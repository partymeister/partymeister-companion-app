import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Page} from '../../models/page';

import {PagesProvider} from '../../providers/pages';

/*
 Generated class for the Home page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    page: Page;
    title: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private pageProvider: PagesProvider) {
        this.title = navParams.data.title;
        if (navParams.data.url) {
            pageProvider.load(navParams.data.url).subscribe(result => {
                this.page = result;
                console.log(result);
            })
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HomePage');
    }

}
