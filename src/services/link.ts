import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs/Subject';
import {NavigationItem} from '../models/navigation_item';
import {HttpClient} from "@angular/common/http";
import {StorageProvider} from "../providers/storage";
import {User} from "../models/user";
import {AppProvider} from "../providers/app/app";

@Injectable()
export class LinkService {

    // Observable string sources
    private linkClickedSource = new Subject<any>();

    // Observable string streams
    linkClicked$ = this.linkClickedSource.asObservable();

    constructor(private appProvider: AppProvider,
                private storageProvider: StorageProvider) {
    }

    // Service message commands
    clickLink(page: string, root: boolean = false) {
        console.log("Called linkservice with url " + JSON.stringify(page));
        this.linkClickedSource.next({page: page, root: root});
    }

    searchDefaultPageAndRedirect() {
        this.storageProvider.get('current-navigation').then( navigationItems => {
            if (navigationItems != undefined && navigationItems != null) {
                let targetPage = this.searchDefaultPage(navigationItems);
                if (targetPage != null) {
                    this.linkClickedSource.next({page: targetPage, root: true});
                }
            }
        });
    }
    searchPageAndRedirect(url) {
        this.storageProvider.get('current-navigation').then( navigationItems => {
            if (navigationItems != undefined && navigationItems != null) {
                let targetPage = this.searchPage(navigationItems, url);
                if (targetPage != null) {
                    this.linkClickedSource.next({page: targetPage, root: true});
                }
            }
        });
    }

    searchDefaultPage(pages: any[]) {
        for (let page of pages) {
            if (page.is_default) {
                return page;
            }
            if (page.items && page.items.length > 0) {
                for (let child of page.items) {
                    if (child.is_default) {
                        return child;
                    }
                }
            }
        }

        return null;
    };

    searchPage(pages: any[], url: string) {
        let targetPage: any = null;
        // find link
        for (let page of pages) {
            if (page.url != '' && page.url == url) {
                return page;
            }
            if (page.items && page.items.length > 0) {
                for (let child of page.items) {
                    if (child.url != '' && child.url == url) {
                        return child;
                    }
                }
            }
        }

        if (targetPage == null) {
            for (let page of pages) {
                if (page.page != undefined && page.page == url) {
                    return page;
                }
                if (page.items && page.items.length > 0) {
                    for (let child of page.items) {
                        if (child.page != '' && child.page == url) {
                            return child;
                        }
                    }
                }
            }
        }

        console.log('LinkService: Targetpage not found for url '+url);
        return null;
    }
}