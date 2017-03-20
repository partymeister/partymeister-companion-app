import {NavController, NavParams} from 'ionic-angular';
import {ConnectivityService} from '../../providers/connectivity-service';
import {Injectable} from '@angular/core';
import {ServiceLocator} from '../../services/service-locator';
import {AuthProvider} from '../../providers/auth';

@Injectable()
export class MasterPage {
    public title: string;
    public force: boolean = false;
    public connectivityService: ConnectivityService;
    protected authProvider: AuthProvider;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.title = navParams.data.title;
        this.force = navParams.data.force;

        this.connectivityService = ServiceLocator.injector.get(ConnectivityService);
        this.authProvider = ServiceLocator.injector.get(AuthProvider);
    }
}
