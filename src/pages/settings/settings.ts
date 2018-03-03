import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {AppVersion} from '@ionic-native/app-version';
import {OneSignal} from '@ionic-native/onesignal';
import {StorageProvider} from '../../providers/storage';
// import {NavigationProvider} from '../../providers/navigation';

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    public notifications: {} = {
        Competitions: false,
        Deadlines: false,
        Seminars: false,
        Events: false,
        Nightshuttle: false,
        Location: false,
        Developer: false,
    };
    public version: string;
    public operationTypes = {local: false, remote: false};
    private developerModeTaps: number = 0;
    public developerMode: boolean = false;
    private initialized: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private platform: Platform,
                private storageProvider: StorageProvider,
                // private navigationProvider: NavigationProvider,
                private appVersion: AppVersion,
                private oneSignal: OneSignal) {

    }

    ionViewDidLoad() {
        this.appVersion.getVersionNumber().then(res => this.version = res).catch(err => {
            this.version = 'Browser - no version available';
        });

        this.storageProvider.get('developerMode').then(res => {
            if (<any>res == true) {
                this.developerMode = true;
                this.storageProvider.get('forcedOperationType').then(operationType => {
                    this.operationTypes[operationType.toString()] = true;
                });
            }
        });

        this.storageProvider.get('pushNotificationTags').then(res => {
            let notifications = {};
            for (let key in res) {
                if (res.hasOwnProperty(key)) {
                    notifications[key] = !!res[key];
                }
            }

            this.notifications = notifications;

            this.initialized = true;

            setTimeout(() => {
                this.getTags();
            }, 1000);
        });
    }

    setOperationType(type: String) {
        if (type == 'local' && this.operationTypes.local == true) {
            this.operationTypes.remote = false;
            this.storageProvider.set('forcedOperationType', 'local');
            // this.navigationProvider.updateNavigation('local');
        } else if (type == 'remote' && this.operationTypes.remote == true) {
            this.operationTypes.local = false;
            this.storageProvider.set('forcedOperationType', 'remote');
            // this.navigationProvider.updateNavigation('remote');
        } else if (this.operationTypes.remote == false && this.operationTypes.local == false) {
            this.storageProvider.set('forcedOperationType', false);
            this.storageProvider.get('operationType').then(operationType => {
                // this.navigationProvider.updateNavigation(operationType);
            })
        }
    }

    enableDeveloperMode() {
        this.developerModeTaps++;

        if (this.developerModeTaps >= 7) {
            this.developerMode = !this.developerMode;
            this.developerModeTaps = 0;
            this.storageProvider.set('developerMode', this.developerMode);
            if (this.developerMode == false) {
                this.notifications['Developer'] = false;
                this.setTags();
                this.storageProvider.set('forcedOperationMode', false);
                this.operationTypes.local = false;
                this.operationTypes.remote = false;
                this.storageProvider.get('operationType').then(operationType => {
                    // this.navigationProvider.updateNavigation(operationType);
                });
            }
        }
    }

    getTags() {
        if (this.platform.is('cordova')) {
            this.oneSignal.getTags().then(res => {
                    for (let key in res) {
                        if (res.hasOwnProperty(key)) {
                            this.notifications[key] = (res[key] == 'true'? true: false);
                        }
                    }
                    this.storageProvider.set('pushNotificationTags', this.notifications);
                }
            );
        }
    }

    setTags() {
        if (this.platform.is('cordova') && this.initialized == true) {
            this.oneSignal.sendTags(this.notifications);
            this.storageProvider.set('pushNotificationTags', this.notifications);
        }
    }
}
