import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Page} from '../../models/page';
import {PagesProvider} from '../../providers/pages';
import {MasterPage} from '../master/master';

@Component({
    selector: 'page-content',
    templateUrl: 'content.html'
})

export class ContentPage extends MasterPage {
    page: Page;

    constructor( public navCtrl: NavController, public navParams: NavParams, private pageProvider: PagesProvider) {
        super(navCtrl, navParams);

        if (navParams.data.url) {
            pageProvider.load(navParams.data.url, this.force).subscribe(result => {
                this.page = result;
            })
        }
    }

    doRefresh(refresher?) {
        if (this.connectivityService.isOffline()) {
            refresher.complete();
            return;
        }
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
