import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav, AlertController, Events} from 'ionic-angular';

// Plugins
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Network} from '@ionic-native/network';
import { InAppBrowser } from '@ionic-native/in-app-browser';


// Providers and services
import {SettingsProvider} from '../providers/settings';
import {StorageProvider} from '../providers/storage';
import {LinkService} from '../services/link';
import {AuthProvider} from '../providers/auth';
import {TicketProvider} from '../providers/ticket';
import {ConnectivityService} from '../providers/connectivity-service';
import {CacheService} from "ionic-cache";
// import {ImageLoaderConfig} from "ionic-image-loader";
import {AppProvider} from "../providers/app/app";
import {App} from "../models/app";
import {Observable} from "rxjs/Observable";
import {NavigationProvider} from "../providers/navigation";
import {PushProvider} from "../providers/push/push";

@Component({
    templateUrl: 'app.html'
})
export class PartyMeisterCompanionApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;

    pages: Array<{ title: string, component: any, params?: any, children: any[] }>;
    showSubmenu: {};
    public operationType: string = 'remote';
    private initialized: boolean = false;

    public atHome: boolean = false;

    app$: Observable<App>;

    constructor(public platform: Platform,
                public menu: MenuController,
                private navigationProvider: NavigationProvider,
                public menuCtrl: MenuController,
                private storageProvider: StorageProvider,
                private linkService: LinkService,
                private ticketProvider: TicketProvider,
                public authProvider: AuthProvider,
                private connectivityService: ConnectivityService,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                private network: Network,
                private alertCtrl: AlertController,
                private cacheService: CacheService,
                // private imageLoaderConfig: ImageLoaderConfig,
                private appProvider: AppProvider,
                private pushProvider: PushProvider,
                private events: Events,
                public iab: InAppBrowser) {

        if (SettingsProvider.variables.environment == 'dev') {
            this.cacheService.clearAll();
            console.log('Developer mode - clearing all observable caches');
        }

        this.cacheService.setDefaultTTL(60 * 60); //set default cache TTL for 1 hour

        this.navigationProvider.updated$.subscribe(operationType => {
            this.loadNavigation(operationType);
        });

        linkService.linkClicked$.subscribe(
            data => {
                if (data.root) {
                    this.openPage(data.page);
                } else {
                    this.nav.push(data.page, data.url);
                }
            });

        // get info if we have an atHome ticket
        this.storageProvider.get('atHome').then(res => {
            this.atHome = <any>res;
        });

        // Subscribe to the atHome ticket
        ticketProvider.atHome$.subscribe(
            data => {
                this.atHome = data.atHome;
            });

        this.initializeApp();
    }

    loadNavigation(operationType) {
        // this.navigationProvider.load(operationType).subscribe(navigationItems => {
        //     let result = this.navigationProvider.parseItems(navigationItems, components, this.showSubmenu);
        //     this.showSubmenu = result.submenu;
        //     this.pages = result.pages;
        //     this.initializeApp();
        // });
    }

    initializeApp() {
        if (this.initialized == true) {
            return;
        }
        this.platform.ready().then(() => {

            this.initialized = true;

            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();

            this.addConnectivityListeners();

            // this.imageLoaderConfig.enableSpinner(false);

            // set the maximum concurrent connections to 10
            // this.imageLoaderConfig.setConcurrency(10);

            // this.imageLoaderConfig.enableDebugMode();

            this.app$ = this.appProvider.subscribeToDataService();

            this.appProvider.subscribeToDataService().subscribe(appSettings => {

                if (appSettings.onesignal_ios != undefined) {
                    this.pushProvider.initialize();
                }

                // Check if this is the first start - and if it is - delete all data from local storage
                this.storageProvider.get('already-started-in-2018').then( res => {
                    if (res == undefined || res == false) {
                        console.log('First start in 2018 - deleting stored data');
                        this.storageProvider.remove('user');
                        this.storageProvider.remove('tickets');
                        this.storageProvider.remove('atHome');
                        this.storageProvider.set('already-started-in-2018', true);
                    }
                });

                if (appSettings.local_api_base_url != undefined) {
                    this.navigationProvider.operationType(appSettings).subscribe(operationType => {
                        this.storageProvider.get('forcedOperationType').then(forcedOperationType => {
                            let actualOperationType = operationType;
                            if (<any>forcedOperationType != false && <any>forcedOperationType != null) {
                                this.storageProvider.set('operationType', forcedOperationType);
                                this.navigationProvider.updateNavigation(forcedOperationType);
                            } else {
                                this.storageProvider.set('operationType', operationType);
                                this.navigationProvider.updateNavigation(operationType);
                            }
                        });
                    }, err => {
                        // Load local menu as a fallback
                        // navigationProvider.loadOffline('remote').subscribe(navigationItems => {
                        //     this.storageProvider.set('operationType', 'remote');
                        //     let result = navigationProvider.parseItems(navigationItems, components);
                        //     this.showSubmenu = result.submenu;
                        //     this.pages = result.pages;
                        //     this.initializeApp();
                        // });
                    });
                }

                // if (appSettings.homepage == '') {
                //     this.rootPage = SettingsProvider.variables.homePage;
                // } else {
                //     this.rootPage = appSettings.homepage;
                // }
                // if (appSettings.open_menu) {
                //     this.menuController.open();
                // }
            });

            this.events.subscribe('images:preloaded', res => {
                console.log('PartymeisterCompanionApp: Event images:preloaded received - hiding splashscreen');
                this.storageProvider.get('introShown').then(res => {
                    console.log('Introshown: ' + res);
                    if (<any>res !== true) {
                        console.log("Showing intro page");
                        this.nav.setRoot('IntroPage');
                        this.splashScreen.hide();
                    } else {
                        this.linkService.searchDefaultPageAndRedirect();
                        this.menuCtrl.open();
                        this.splashScreen.hide();
                    }
                });
            }, error => {
            });

        });

        this.platform.registerBackButtonAction(() => {
            console.log("Back button Action registered");
            if (this.menuCtrl.isOpen()) {
                this.menuCtrl.close();
                return;
            }
            if (!this.nav.canGoBack()) {
                let alert = this.alertCtrl.create({
                    title: 'Exit?',
                    message: 'Do you want to exit the app?',
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: () => {
                                alert = null;
                            }
                        },
                        {
                            text: 'Exit',
                            handler: () => {
                                this.platform.exitApp();
                            }
                        }
                    ]
                });
                alert.present();
                return;
            }
            this.nav.pop();
        });
    }

    addConnectivityListeners() {
        let onOnline = () => {
            console.log("ONLINE");
            this.connectivityService.online = true;
        };

        let onOffline = () => {
            console.log("OFFLINE");
            this.connectivityService.online = false;
        };

        window.addEventListener('online', onOnline, false);
        window.addEventListener('offline', onOffline, false);

        // if (this.platform.is('cordova')) {
            let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
            console.log('network DISconnected!');
            this.connectivityService.online = false;
          });

          let connectSubscription = this.network.onConnect().subscribe(() => {
            // We just got a connection but we need to wait briefly
            // before we determine the connection type.  Might need to wait 
            // prior to doing any api requests as well.
            setTimeout(() => {
              console.log('network connected!');
              this.connectivityService.online = true;
            }, 3000);
          });
        // }
    }

    isAuthenticated() {
        return this.authProvider.isAuthenticated();
    }

    showPage(p) {
        if (!this.atHome && p.is_visible_for_at_home) {
            return false;
        }

        if (!p.is_protected && this.isAuthenticated() && p.is_hidden_when_logged_in) {
            return false;
        }

        if (!p.is_protected && this.isAuthenticated() && p.is_hidden_when_logged_in) {
            return false;
        }
        if (p.is_protected && !this.isAuthenticated()) {
            return false;
        }
        return true;
    }

    openPage(page) {
        if (page.call_function == 'doLogout') {
            this.authProvider.doLogout();
            this.linkService.searchPageByPageNameAndRedirect('LoginPage');
            return;
        }
        if (page.page == '' && page.url == '') {
            return;
        }
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.page, {url: page.url, name: page.name}, {animate: true, direction: 'forward'});
    }
}
