import {Injectable, Output} from '@angular/core';
import {Network} from '@ionic-native/network';
import {Platform} from 'ionic-angular';

declare let Connection;
declare let navigator: any;

@Injectable()
export class ConnectivityService {

    onDevice: boolean;
    @Output() public online: boolean;

    constructor(
        public platform: Platform,
        private network: Network) {
        this.onDevice = this.platform.is('cordova');
        this.platform.ready().then(() => {
            this.online = this.isOnline();
        });
    }

    isOnline(): boolean {
        if (this.onDevice && this.network.type) {
            return this.network.type !== Connection.NONE;
        } else {
            return navigator.onLine;
        }
    }

    isOffline(): boolean {
        if (this.onDevice && this.network.type) {
            return this.network.type === Connection.NONE;
        } else {
            return !navigator.onLine;
        }
    }
}
