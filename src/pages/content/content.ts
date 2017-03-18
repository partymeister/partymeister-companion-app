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
    selector: 'page-content',
    templateUrl: 'content.html'
})

export class ContentPage {
    page: Page;
    title: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private pageProvider: PagesProvider) {
        this.title = navParams.data.title;
        let force = navParams.data.force;
        if (navParams.data.url) {
            pageProvider.load(navParams.data.url, force).subscribe(result => {
                this.page = result;
            })
        }
    }

    doRefresh(refresher?) {
        this.pageProvider.load(this.navParams.data.url, true).subscribe(result => {
            this.page = result;
            if(refresher){
                refresher.complete();
            }
        })
    }

    getRefresherNotification(event) {
        this.doRefresh();
    }

}
