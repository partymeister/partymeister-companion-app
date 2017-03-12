import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {CacheService} from "ionic-cache/ionic-cache";

import {ContentPage} from '../pages/content/content';
import {SettingsPage} from '../pages/settings/settings';
import {IntroPage} from '../pages/intro/intro';
import {RegistrationPage} from '../pages/registration/registration';
import {NavigationProvider} from '../providers/navigation';
import ImgCache           from 'imgcache.js';
import {Auth, User} from '@ionic/cloud-angular';
import {SettingsProvider} from '../providers/settings';
import {LinkService} from '../services/link';
import { Storage } from '@ionic/storage';

let components = {'ContentPage': ContentPage, 'SettingsPage': SettingsPage, 'RegistrationPage': RegistrationPage, 'IntroPage': IntroPage};

@Component({
    templateUrl: 'app.html'
})
export class PartyMeisterCompanionApp {
    @ViewChild(Nav) nav: Nav;

    // make HelloIonicPage the root (or first) page
    rootPage: any = ContentPage;
    pages: Array<{title: string, component: any, params?: any, children: any[]}>;
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
                private settings: SettingsProvider,
                private storage: Storage,
                private linkService: LinkService) {

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

        linkService.linkClicked$.subscribe(
            link => {
                let targetPage: any = null;
                // find link
                for (let page of this.pages) {
                    if (page.params != undefined && page.params.url != undefined){
                        if (page.params.url == link) {
                            targetPage = page;
                        }
                    }
                    if (page.children.length > 0) {
                        for (let child of page.children) {
                            if (child.params != undefined && child.params.url != undefined){
                                if (child.params.url == link) {
                                    targetPage = child;
                                }
                            }
                        }
                    }
                }
                if (targetPage != null) {
                    if (this.nav.getActive().component.name == 'IntroPage') {
                        this.openPage(targetPage);
                        this.menuCtrl.open();
                    } else {
                        this.nav.push(targetPage.component, targetPage.params);
                    }
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
                        this.nav.setRoot(ContentPage, {
                            "url": "https://2017.revision-party.net/frontend/default/en/app_about/app_visitors.json",
                            "title": "Visitors"
                        });
                        this.menuCtrl.open();
                    } else {
                        console.log("not authenticated");
                        this.storage.get('introShown').then((result) => {
                            if (result == null) {
                                this.nav.setRoot(IntroPage);
                            } else {
                                this.nav.setRoot(ContentPage, {
                                    "url": "https://2017.revision-party.net/app_at_a_glance.json",
                                    "title": "Revision At A Glance"
                                });
                                this.menuCtrl.open();
                            }
                        });
                    }
                },
                () => {
                    console.error('ImgCache init: error! Check the log for errors');
                });
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
