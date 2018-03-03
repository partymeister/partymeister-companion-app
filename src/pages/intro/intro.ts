import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides, Platform, IonicPage} from 'ionic-angular';
import {LinkService} from '../../services/link';
import {StorageProvider} from '../../providers/storage';
import {SettingsProvider} from '../../providers/settings';
import {App} from "../../models/app";
import {Observable} from "rxjs/Observable";
import {AppProvider} from "../../providers/app/app";

@IonicPage()
@Component({
    selector: 'page-intro',
    templateUrl: 'intro.html'
})
export class IntroPage {
    @ViewChild(Slides) slides: Slides;
    public deviceHeight: string = 'large';

    app$: Observable<App>;

    constructor(private storageProvider: StorageProvider,
                public navCtrl: NavController,
                public navParams: NavParams,
                private linkService: LinkService,
                private platform: Platform,
                private appProvider: AppProvider) {

        this.platform.ready().then(() => {
            if (platform.height() < 600) {
                this.deviceHeight = 'small';
            } else {
                this.deviceHeight = 'large';
            }
        });
    }

    ngOnInit() {
        this.app$ = this.appProvider.subscribeToDataService();
    }

    navigateHome() {
        this.storageProvider.get('operationType').then(res => {
            if (<any>res == null || res.toString() == 'remote') {
                this.linkService.clickLink(SettingsProvider.variables.DEFAULT_PAGE_REMOTE, true);
            } else {
                this.linkService.clickLink(SettingsProvider.variables.DEFAULT_PAGE_LOCAL, true);
            }
            this.storageProvider.set('introShown', true);
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
