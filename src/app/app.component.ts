import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {CacheService} from "ionic-cache/ionic-cache";

import {HomePage} from '../pages/home/home';
import {SettingsPage} from '../pages/settings/settings';
import {RegistrationPage} from '../pages/registration/registration';
import {NavigationProvider} from '../providers/navigation';
import ImgCache           from 'imgcache.js';
import {Auth, User} from '@ionic/cloud-angular';
import {SettingsProvider} from '../providers/settings';

let components = {'HomePage': HomePage, 'SettingsPage': SettingsPage, 'RegistrationPage': RegistrationPage};

@Component({
    templateUrl: 'app.html'
})
export class PartyMeisterCompanionApp {
    @ViewChild(Nav) nav: Nav;

    // make HelloIonicPage the root (or first) page
    rootPage: any = HomePage;
    pages: Array<{title: string, component: any, params?: any}>;
    showSubmenu: {};
    cache: CacheService;

    menuItemHandler(page): void {
        this.showSubmenu[page.title] = !this.showSubmenu[page.title];
    }

    constructor(public platform: Platform,
                public menu: MenuController,
                private navigationProvider: NavigationProvider,
                cache: CacheService,
                public auth: Auth,
                public menuCtrl: MenuController,
                private settings: SettingsProvider,) {

        this.cache = cache;

        this.cache.setDefaultTTL(60 * 60); //set default cache TTL for 1 hour

        this.pages = [];
        this.showSubmenu = {};

        navigationProvider.load().subscribe(navigationItems => {
            for (let item of navigationItems) {
                let parent = {
                    title: item.title,
                    icon: item.icon,
                    component: components[item.container],
                    params: item.parameters,
                    children: []

                };
                this.showSubmenu[item.title] = false;
                if (item.items) {
                    let children = [];
                    for (let subitem of item.items) {
                        let parameters = subitem.parameters;
                        parameters.subitem = true;
                        children.push({
                            title: subitem.title,
                            icon: subitem.icon,
                            component: components[subitem.container],
                            params: subitem.parameters
                        });
                    }
                    parent.children = children;
                }
                this.pages.push(parent);
            }
        });

        this.initializeApp();
        // // set our app's pages
        // this.pages = [
        //     {title: 'HomePage', component: HomePage},
        //     {
        //         title: 'General',
        //         component: HomePage,
        //         params: 'https://2016.revision-party.net/frontend/default/en/app_about/app_general.json'
        //     },
        //     {
        //         title: 'Location',
        //         component: HomePage,
        //         params: 'https://2016.revision-party.net/frontend/default/en/app_about/app_location.json'
        //     },
        //     {
        //         title: 'Tickets',
        //         component: HomePage,
        //         params: 'https://2016.revision-party.net/frontend/default/en/app_about/app_tickets.json'
        //     },
        // ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();

            // activated debug mode
            ImgCache.options.debug = true;
            // page is set until img cache has started
            ImgCache.init(() => {
                    if (this.auth.isAuthenticated()) {
                        console.log("authenticated");
                        this.nav.setRoot(HomePage, {
                            "url": "https://2016.revision-party.net/frontend/default/en/app_about/app_visitors.json",
                            "title": "Visitors"
                        });
                    } else {
                        console.log("not authenticated");
                        this.nav.setRoot(RegistrationPage, {title: "Registration"});
                    }
                },
                () => {
                    console.error('ImgCache init: error! Check the log for errors');
                });

            this.menuCtrl.open();
        });
    }

    openPage(page) {
        if (page.children && page.children.length > 0) {
            return;
        }
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component, page.params);
    }
}
