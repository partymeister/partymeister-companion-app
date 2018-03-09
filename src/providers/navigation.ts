import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import {CacheService} from "ionic-cache";
import {StorageProvider} from "./storage";

@Injectable()
export class NavigationProvider {

    // Observable string sources
    private forceNavigationUpdate = new Subject<any>();

    // Observable string streams
    updated$ = this.forceNavigationUpdate.asObservable();

    // Service message commands
    updateNavigation(operationType) {
        // Check if a forced operationtype is set
        this.storageProvider.get('forcedOperationType').then( forcedOperationType => {
            if (forcedOperationType == undefined || forcedOperationType == false) {
                this.forceNavigationUpdate.next(operationType);
            } else {
                this.forceNavigationUpdate.next(forcedOperationType);
            }
        });
    }

    constructor(public http: HttpClient,
                public cache: CacheService,
                private storageProvider: StorageProvider) {
    }

    // Get App operation type
    operationType(appSettings): Observable<string> {
        return Observable.timer(0, 10000)
            .mergeMap(() => {
                    return this.http.get(appSettings.local_api_base_url + appSettings.name_slug + '.txt', {responseType: 'text'})
                        .map(res => {
                            this.updateNavigation(res.trim());
                            return res.trim()
                        })
                }
            );
    }

}
