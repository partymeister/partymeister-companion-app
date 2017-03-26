import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs/Subject';
import {NavigationItem} from '../models/navigation_item';

@Injectable()
export class LinkService {

    // Observable string sources
    private linkClickedSource = new Subject<any>();

    // Observable string streams
    linkClicked$ = this.linkClickedSource.asObservable();

    // Service message commands
    clickLink(link: string, root: boolean = false) {
        console.log("Called linkservice with url " + link);
        this.linkClickedSource.next({link: link, root: root});
    }

    searchPage(pages: any[], link: string) {
        let targetPage: any = null;
        // find link
        for (let page of pages) {
            if (page.params != undefined && page.params.url != undefined) {
                if (page.params.url == link) {
                    targetPage = page;
                }
            }
            if (page.children.length > 0) {
                for (let child of page.children) {
                    if (child.params != undefined && child.params.url != undefined) {
                        if (child.params.url == link) {
                            targetPage = child;
                        }
                    }
                }
            }
        }

        if (targetPage == null) {
            for (let page of pages) {
                if (page.component != undefined && page.component.name == link) {
                    targetPage = page;
                }
                if (page.children.length > 0) {
                    for (let child of page.children) {
                        if (child.component != undefined && child.component.name == link) {
                            targetPage = child;
                        }
                    }
                }
            }
        }

        return targetPage;
    }
}