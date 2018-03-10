import {Injectable,} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VoteEntry} from '../models/voteentry';
import {ToastController} from 'ionic-angular';
import {sprintf} from "sprintf-js";
import {SettingsProvider} from './settings';
import {AuthProvider} from './auth';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {CacheService} from "ionic-cache";
import {StorageProvider} from "./storage";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN})
};

@Injectable()
export class VoteProvider {

    constructor(private cache: CacheService, private http: HttpClient, private authProvider: AuthProvider, private toastCtrl: ToastController, private storageProvider: StorageProvider) {
    }

    getLiveVotingEntries() {
        return Observable.fromPromise(this.storageProvider.get('local-api-base-url').then(apiUrl => {
            return apiUrl;
        })).flatMap(apiUrl => {
            return Observable.fromPromise(this.storageProvider.get('user').then(user => {
                return user;
            })).flatMap(user => {
                return Observable.timer(0, 10000).mergeMap(() => this.http.get(apiUrl + sprintf(SettingsProvider.variables.VOTE_LIVE_API, user.uniqid) + '?' + Math.floor((Math.random() * 1000000) + 1), httpOptions))
                    .map(res => {
                        if (res == null) {
                            return [];
                        }
                        if (res['status'] == 204) {
                            return [];
                        }
                        return <VoteEntry[]>res['data'];
                    });
            });
        });
    }

    getVotingEntries(force?) {

        return Observable.fromPromise(this.storageProvider.get('local-api-base-url').then(apiUrl => {
            return apiUrl;
        })).flatMap(apiUrl => {
            return Observable.fromPromise(this.storageProvider.get('user').then(user => {
                return user;
            })).flatMap(user => {
                let request = this.http.get(apiUrl + sprintf(SettingsProvider.variables.VOTE_ENTRIES_API, user.uniqid) + '?' + Math.floor((Math.random() * 1000000) + 1), httpOptions);
                if (force) {
                    this.cache.clearGroup('vote_entries');
                    return request.map(res => {
                        console.log(res);
                        if (res == null) {
                            return [];
                        }
                        if (res['status'] == 204) {
                            return [];
                        }
                        return <VoteEntry[]>res['data'];
                    });
                }
                return this.cache.loadFromDelayedObservable('vote_entries', request, 'vote_entries', SettingsProvider.variables.CACHE_TIMEOUT_VOTES).map(res => {
                    if (res.status == 204) {
                        return [];
                    }
                    return <VoteEntry[]>res.data;
                });
            });
        });

    }

    vote(points, entry) {

        this.storageProvider.get('local-api-base-url').then(apiUrl => {
            this.storageProvider.get('user').then(user => {
                return this.http.post(apiUrl + sprintf(SettingsProvider.variables.VOTE_SAVE_API, user.uniqid, entry.id) + '?' + Math.floor((Math.random() * 1000000) + 1), {
                    points: points,
                    vote_category_id: 1
                }, httpOptions)
                    .catch(this.catchError)
                    .subscribe(result => {
                        let toast = this.toastCtrl.create({
                            message: 'Voted ' + points + ' stars for ' + entry.title,
                            duration: 3000,
                            position: 'top',
                            showCloseButton: true,
                            cssClass: 'toast-success'
                        });
                        toast.present();
                    }, error => {
                        let toast = this.toastCtrl.create({
                            message: 'Voting deadline is over!',
                            duration: 3000,
                            position: 'top',
                            showCloseButton: true,
                            cssClass: 'toast-danger'
                        });
                        toast.present();
                    });
            });
        });

    }

    private catchError(err: Response | any) {
        return Observable.throw('Voting deadline over');
    }

}