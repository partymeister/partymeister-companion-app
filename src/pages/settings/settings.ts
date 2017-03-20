import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { AppVersion } from 'ionic-native';
import { OneSignal } from 'ionic-native';

/*
 Generated class for the Settings page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    public notifications: {} = {Competitions: false, Deadlines: false, Seminars: false, Events: false, Nightshuttle: false, Location: false};
    public appVersion: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {

    }

    ionViewDidLoad() {
        AppVersion.getVersionNumber().then(res => this.appVersion = res).catch(err => {
            this.appVersion = 'Browser - no version available';
        });

        this.getTags();
    }

    getTags() {
        if (this.platform.is('cordova')) {
            OneSignal.getTags().then(res => {
                for (let key in res) {
                    if (res.hasOwnProperty(key)) {
                        this.notifications[key] = !!res[key];
                    }
                }
                console.log('Recieved tags');
                console.log(res);
            });
        }
    }

    setTags() {
        if (this.platform.is('cordova')) {
            OneSignal.sendTags(this.notifications);
        }
    }

}
