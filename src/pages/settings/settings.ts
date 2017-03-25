import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { AppVersion } from 'ionic-native';
import { OneSignal } from 'ionic-native';
import {Storage} from '@ionic/storage';
import {NavigationProvider} from '../../providers/navigation';

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
    public operationTypes = {local: false, remote: false};
    private developerModeTaps: number = 0;
    public developerMode: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private storage: Storage, private navigationProvider: NavigationProvider) {

    }

    ionViewDidLoad() {
        AppVersion.getVersionNumber().then(res => this.appVersion = res).catch(err => {
            this.appVersion = 'Browser - no version available';
        });

        this.storage.get('developerMode').then(res => {
            if (res == true) {
                this.developerMode = true;
                this.storage.get('forcedOperationType').then(operationType => {
                    this.operationTypes[operationType] = true;
                });
            }
        });

        this.getTags();
    }

    setOperationType(type: String) {
        if (type == 'local' && this.operationTypes.local == true) {
            this.operationTypes.remote = false;
            this.storage.set('forcedOperationType', 'local');
            this.navigationProvider.updateNavigation('local');
        } else if (type == 'remote' && this.operationTypes.remote == true) {
            this.operationTypes.local = false;
            this.storage.set('forcedOperationType', 'remote');
            this.navigationProvider.updateNavigation('remote');
        } else if (this.operationTypes.remote == false && this.operationTypes.local == false) {
            this.storage.set('forcedOperationType', false);
            this.storage.get('operationType').then(operationType => {
                this.navigationProvider.updateNavigation(operationType);
            })
        }
    }

    enableDeveloperMode() {
        this.developerModeTaps++;

        if (this.developerModeTaps >= 7) {
            this.developerMode = !this.developerMode;
            this.developerModeTaps = 0;
            this.storage.set('developerMode', this.developerMode);
            if (this.developerMode == false) {
                this.storage.set('forcedOperationMode', false);
                this.operationTypes.local = false;
                this.operationTypes.remote = false;
            }
        }
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
