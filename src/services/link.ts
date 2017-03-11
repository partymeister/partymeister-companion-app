import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs/Subject';

@Injectable()
export class LinkService {

    // Observable string sources
    private linkClickedSource = new Subject<string>();

    // Observable string streams
    linkClicked$ = this.linkClickedSource.asObservable();

    // Service message commands
    clickLink(link: string) {
        console.log("Called linkservice with url " + link);
        this.linkClickedSource.next(link);
    }
}