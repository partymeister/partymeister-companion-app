import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SettingsProvider} from "../settings";
import {ImageLoader} from "ionic-image-loader";
import {Events} from "ionic-angular";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {sprintf} from "sprintf-js";
import {App} from "../../models/app";
import {NavigationItem} from "../../models/navigation_item";
import {Observable} from "rxjs/Observable";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};


/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppProvider {

    app: any;
    private app$: BehaviorSubject<App>;
    private remoteNavigation$: BehaviorSubject<NavigationItem[]>;
    private localNavigation$: BehaviorSubject<NavigationItem[]>;

    constructor(public http: HttpClient,
                private imageLoader: ImageLoader,
                private events: Events) {
        this.initializeDataService();
    }

    initializeDataService() {
        if (!this.app$) {
            this.app$ = <BehaviorSubject<App>> new BehaviorSubject({});
            this.remoteNavigation$ = <BehaviorSubject<NavigationItem[]>> new BehaviorSubject([]);
            this.localNavigation$ = <BehaviorSubject<NavigationItem[]>> new BehaviorSubject([]);

            let request = this.http.get(SettingsProvider.variables.SETTINGS_API + '?api_token=' + SettingsProvider.variables.API_TOKEN, httpOptions);
            // this.cache.loadFromDelayedObservable('settings', request, 'settings', SettingsProvider.variables.timeouts.appSettings).map(res => {
            //     return res.data;
            // });
            request.subscribe(
                res => {
                    this.app = <App>res['data'];

                    let images = [];
                    let imageIdentifiers = [];

                    if (this.app.logo.file_original != undefined) {
                        images.push(this.imageLoader.preload(this.app.logo.file_original));
                        imageIdentifiers.push('logo');
                    }
                    if (this.app.menu_header.file_original != undefined) {
                        images.push(this.imageLoader.preload(this.app.menu_header.file_original));
                        imageIdentifiers.push('menu_header');
                    }
                    if (this.app.menu_bg.file_original != undefined) {
                        images.push(this.imageLoader.preload(this.app.menu_bg.file_original));
                        imageIdentifiers.push('menu_bg');
                    }
                    if (this.app.page_bg.file_original != undefined) {
                        images.push(this.imageLoader.preload(this.app.page_bg.file_original));
                        imageIdentifiers.push('page_bg');
                    }
                    if (this.app.intro_bg_1.file_original != undefined) {
                        images.push(this.imageLoader.preload(this.app.intro_bg_1.file_original));
                        imageIdentifiers.push('intro_bg_1');
                    }
                    if (this.app.intro_bg_2.file_original != undefined) {
                        images.push(this.imageLoader.preload(this.app.intro_bg_2.file_original));
                        imageIdentifiers.push('intro_bg_2');
                    }
                    if (this.app.intro_bg_3.file_original != undefined) {
                        images.push(this.imageLoader.preload(this.app.intro_bg_3.file_original));
                        imageIdentifiers.push('intro_bg_3');
                    }
                    if (this.app.intro_bg_4.file_original != undefined) {
                        images.push(this.imageLoader.preload(this.app.intro_bg_4.file_original));
                        imageIdentifiers.push('intro_bg_4');
                    }

                    Promise.all(images).then(res => {
                        imageIdentifiers.forEach( (item, index) => {
                            this.app[item].cached_image_path = res[index];
                        });
                        this.app$.next(this.app);
                        this.events.publish('images:preloaded', true);
                        console.log("AppProvider: All images preloaded");
                    });

                    let remoteNavigation = <NavigationItem[]>[];
                    let localNavigation = <NavigationItem[]>[];

                    if (res['data']['remote_navigation'] != undefined) {
                        remoteNavigation = <NavigationItem[]>res['data']['remote_navigation']['data'];
                    }

                    if (res['data']['local_navigation'] != undefined) {
                        remoteNavigation = <NavigationItem[]>res['data']['local_navigation']['data'];
                    }

                    this.remoteNavigation$.next(remoteNavigation);
                    this.localNavigation$.next(localNavigation);

                    this.events.publish('app:loaded', true);
                },
                error => console.log("AppProvider: subscribing to DataService: " + JSON.stringify(error))
            );
        }
    }

    subscribeToDataService(): Observable<App> {
        return this.app$.asObservable();
    }

    subscribeToLocalNavigation(): Observable<NavigationItem[]> {
        return this.localNavigation$.asObservable();
    }

    subscribeToRemoteNavigation(): Observable<NavigationItem[]> {
        return this.remoteNavigation$.asObservable();
    }

}
