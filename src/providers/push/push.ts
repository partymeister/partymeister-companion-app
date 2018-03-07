import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {OneSignal} from "@ionic-native/onesignal";
import {SettingsLoaderProvider} from "../settings-loader/settings-loader";
import {Events, Platform} from "ionic-angular";
import {SettingsProvider} from "../settings";
import {sprintf} from "sprintf-js";
import {AuthProvider} from "../auth";
import {StorageProvider} from "../storage";
import {OpenNativeSettings} from "@ionic-native/open-native-settings";
import {Diagnostic} from "@ionic-native/diagnostic";
import {AppProvider} from "../app/app";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

/*
  Generated class for the PushProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushProvider {

    private enabled: boolean = false;

    constructor(private http: HttpClient,
                private oneSignal: OneSignal,
                private appProvider: AppProvider,
                private platform: Platform,
                private authProvider: AuthProvider,
                private diagnostic: Diagnostic,
                private openNativeSettings: OpenNativeSettings,
                private storageProvider: StorageProvider,
                private events: Events) {


        this.platform.ready().then(() => {
            if (this.platform.is('cordova') && this.platform.is('ios')) {

                this.diagnostic.getRemoteNotificationsAuthorizationStatus().then(res => {
                    if (res == 'authorized') {
                        this.enabled = true;
                    } else {
                        this.enabled = false;
                    }
                    console.log('PushProvider: Checking push status');
                }, error => {
                    this.diagnostic.isRegisteredForRemoteNotifications().then(res => {
                        this.enabled = res;
                    })
                });
            }
        });


        this.platform.ready().then(() => {
            if (this.platform.is('cordova') && this.platform.is('ios')) {
                let onResumeSubscription = platform.resume.subscribe(() => {
                    console.log('PushProvider: Application resumes - check push status');

                    this.diagnostic.getRemoteNotificationsAuthorizationStatus().then(res => {
                        if (res == 'authorized') {
                            this.enabled = true;
                        } else {
                            this.enabled = false;
                        }
                        console.log('PushProvider: Checking push status');
                    }, error => {
                        this.diagnostic.isRegisteredForRemoteNotifications().then(res => {
                            this.enabled = res;
                        })
                    });
                });
            }
        });
    }

    isEnabled() {
        return this.enabled;
    }

    openSystemSettings() {
        if (this.platform.is('cordova')) {
            this.openNativeSettings.open('application_details').then(res => {
                console.log("NotificationProvider: Notification settings opened");
            });
        }
    }

    initialize() {
        console.log('PushProvider: Initialize OneSignal');

        this.appProvider.subscribeToDataService().subscribe(settings => {
            if (this.platform.is('cordova') && settings.onesignal_ios != undefined) {
                console.log('PushProvider: OneSignal iOS Key: '+ settings.onesignal_ios);

                this.oneSignal.startInit(settings.onesignal_ios, settings.onesignal_android);
                // this.oneSignal.iOSSettings({
                //         'kOSSettingsKeyAutoPrompt': false,
                //         'kOSSettingsKeyInAppLaunchURL': false
                //     });
                this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
                this.oneSignal.handleNotificationReceived().subscribe(() => {
                    // do something when notification is received
                });
                this.oneSignal.handleNotificationOpened().subscribe(data => {
                });
                // this.oneSignal.setLogLevel({logLevel: 5, visualLevel: 5});
                this.oneSignal.endInit();
            }
        }, error => {
            console.log('PushProvider: Error retrieving data from SettingsLoaderProvider');
            console.log(error);
        });
    }
}
