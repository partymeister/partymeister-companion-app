import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {LinkService} from '../../services/link';
import {Storage} from '@ionic/storage';
import {SettingsProvider} from '../../providers/settings';

@Component({
    selector: 'page-intro',
    templateUrl: 'intro.html'
})
export class IntroPage {

    constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private linkService: LinkService) {
    }

    navigateHome() {
        this.storage.get('operationType').then(res => {
            if (res == null || res == 'remote') {
                this.linkService.clickLink(SettingsProvider.variables.DEFAULT_PAGE_REMOTE, true);
            } else {
                this.linkService.clickLink(SettingsProvider.variables.DEFAULT_PAGE_LOCAL, true);
            }
            this.storage.set('introShown', true);
        });
    }
}
