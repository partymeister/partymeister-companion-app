/**
 * Generated class for the NavigationItemsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
import {Component} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {NavigationItem} from "../../models/navigation_item";
import {App} from "../../models/app";
import {PartyMeisterCompanionApp} from "../../app/app.component";
import {AuthProvider} from "../../providers/auth";
import {AppProvider} from "../../providers/app/app";
import {SettingsProvider} from "../../providers/settings";


@Component({
    selector: 'navigation-items',
    templateUrl: 'navigation-items.html'
})
export class NavigationItemsComponent {

    settings;
    navigation$: Observable<NavigationItem[]>;
    app$: Observable<App>;
    public childrenOpenState: any = {};
    public navigationReady = false;

    constructor(private app: PartyMeisterCompanionApp,
                public authProvider: AuthProvider,
                private appProvider: AppProvider) {

        this.settings = SettingsProvider.variables;
    }

    ngOnInit() {
        this.navigation$ = this.appProvider.subscribeToCurrentNavigation();

        this.navigation$.subscribe(pages => {
            for (let p of pages) {
                if (p.items && p.items.length > 0) {
                    if (!this.childrenOpenState.hasOwnProperty(p.name)) {
                        this.childrenOpenState[p.name] = false;
                    }
                }
            }
            this.navigationReady = true;
        });

        this.app$ = this.appProvider.subscribeToDataService();
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
