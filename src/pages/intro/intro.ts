import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides} from 'ionic-angular';
import {LinkService} from '../../services/link';
import {Storage} from '@ionic/storage';
import {SettingsProvider} from '../../providers/settings';

@Component({
    selector: 'page-intro',
    templateUrl: 'intro.html'
})
export class IntroPage {
    @ViewChild(Slides) slides: Slides;

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

    checkSwipeLock() {
        if (this.slides) {
            this.slides.lockSwipeToPrev(false);
            this.slides.lockSwipeToNext(false);
            if (this.slides.isBeginning()) {
                this.slides.lockSwipeToPrev(true);
            }
            if (this.slides.isEnd()) {
                this.slides.lockSwipeToNext(true);
            }
        }
    }
}
