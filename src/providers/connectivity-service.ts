import {Injectable, Output} from '@angular/core';
import {Network} from 'ionic-native';
import {Platform} from 'ionic-angular';

declare let Connection;
declare let navigator: any;

@Injectable()
export class ConnectivityService {

    onDevice: boolean;
    @Output() public online: boolean;

    constructor(public platform: Platform) {
        this.onDevice = this.platform.is('cordova');
        this.online = this.isOnline();
    }

    isOnline(): boolean {
        if (this.onDevice && Network.type) {
            return Network.type !== Connection.NONE;
        } else {
            return navigator.onLine;
        }
    }

    isOffline(): boolean {
        if (this.onDevice && Network.type) {
            return Network.type === Connection.NONE;
        } else {
            return !navigator.onLine;
        }
    }
}