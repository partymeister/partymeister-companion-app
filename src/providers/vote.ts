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

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN})
};

@Injectable()
export class VoteProvider {

    constructor(private cache: CacheService, private http: HttpClient, private authProvider: AuthProvider, private toastCtrl: ToastController) {
    }

    getLiveVotingEntries() {
        return Observable.timer(0, 10000).mergeMap(() => this.http.get(sprintf(SettingsProvider.variables.VOTE_LIVE_API, this.authProvider.uniqid()) + '?' + Math.floor((Math.random() * 1000000) + 1), httpOptions))
            .map(res => {
                if (res['status'] == 204) {
                    return [];
                }
                return <VoteEntry[]>res['data'];
            });
    }

    getVotingEntries(force?) {
        let request = this.http.get(sprintf(SettingsProvider.variables.VOTE_ENTRIES_API, this.authProvider.uniqid()) + '?' + Math.floor((Math.random() * 1000000) + 1), httpOptions);
        if (force) {
            this.cache.clearGroup('vote_entries');
            return request.map(res => {
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
    }

    vote(points, entry) {
        this.http.post(sprintf(SettingsProvider.variables.VOTE_SAVE_API, this.authProvider.uniqid(), entry.id) + '?' + Math.floor((Math.random() * 1000000) + 1), {
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

    }

    private catchError(err: Response | any) {
        return Observable.throw('Voting deadline over');
    }

}