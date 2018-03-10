import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides, Platform, IonicPage} from 'ionic-angular';
import {LinkService} from '../../services/link';
import {StorageProvider} from '../../providers/storage';
import {MasterPage} from "../master/master";

@IonicPage()
@Component({
    selector: 'page-intro',
    templateUrl: 'intro.html'
})
export class IntroPage extends MasterPage {
    @ViewChild(Slides) slides: Slides;
    public deviceHeight: string = 'large';


    constructor(private storageProvider: StorageProvider,
                public navCtrl: NavController,
                public navParams: NavParams,
                private linkService: LinkService,
                private platform: Platform) {

        super(navCtrl, navParams);

        this.platform.ready().then(() => {
            if (platform.height() < 600) {
                this.deviceHeight = 'small';
            } else {
                this.deviceHeight = 'large';
            }
        });
    }


    navigateHome() {
        this.linkService.searchDefaultPageAndRedirect();

        this.storageProvider.set('introShown', true);
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
