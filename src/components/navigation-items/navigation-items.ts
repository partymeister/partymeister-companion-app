import {Component} from '@angular/core';

import {SettingsProvider} from '../../providers/settings';
import {PartyMeisterCompanionApp} from "../../app/app.component";
import {LinkProvider} from "../../providers/link/link";
import {SettingsLoaderProvider} from "../../providers/settings-loader/settings-loader";
import {Observable} from 'rxjs/Observable';
import {Navigation} from "../../models/navigation";
import {AuthProvider} from "../../providers/auth";
import {TranslateService} from "@ngx-translate/core";
import {AppSettings} from "../../models/app-settings";
import {Link} from "../../models/link";
import {AboutPage} from "../../pages/about/about";
import {CampaignProvider} from "../../providers/campaign/campaign";
import {MenuLink} from "../../models/menu-link";
import {NavigationItem} from "../../models/navigation_item";
import {App} from "../../models/app";
import {AppProvider} from "../../providers/app/app";

/**
 * Generated class for the NavigationItemsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
    selector: 'navigation-items',
    templateUrl: 'navigation-items.html'
})
export class NavigationItemsComponent {

    settings;
    localNavigation$: Observable<NavigationItem[]>;
    remoteNavigation$: Observable<NavigationItem[]>;
    app$: Observable<App>;
    public childrenOpenState: any = {};
    public navigationReady = false;

    constructor(private app: PartyMeisterCompanionApp,
                public authProvider: AuthProvider,
                private appProvider: AppProvider) {

        this.settings = SettingsProvider.variables;
    }

    ngOnInit() {
        this.localNavigation$ = this.appProvider.subscribeToLocalNavigation();
        this.remoteNavigation$ = this.appProvider.subscribeToRemoteNavigation();
        this.app$ = this.appProvider.subscribeToDataService();

        this.remoteNavigation$.subscribe(pages => {
            for (let p of pages) {
                if (p.items && p.items.length > 0) {
                    if (!this.childrenOpenState.hasOwnProperty(p.name)) {
                        this.childrenOpenState[p.name] = false;
                    }
                }
            }
            this.navigationReady = true;
        });
    }

    public toggleChildren(page) {
        if (page.items && page.items.length > 0) {
            this.childrenOpenState[page.name] = true;
        }

        // close all other menus
        for (let c in this.childrenOpenState) {
            if (c != page.name) {
                this.childrenOpenState[c] = false;
            }
        }
    }

    public openPage(page) {
        if (page.items && page.items.length > 0) {
            return;
        }
        this.app.openPage(page);
    }

    public showPage(page) {
        return this.app.showPage(page);
    }
}
