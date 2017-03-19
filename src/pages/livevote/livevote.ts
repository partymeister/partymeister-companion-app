import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {SettingsProvider} from '../../providers/settings';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {sprintf} from "sprintf-js";
import {AuthProvider} from '../../providers/auth';
import {VoteEntry} from '../../models/voteentry';
import {Observable} from 'rxjs/Rx';

/*
 Generated class for the Livevote page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-livevote',
    templateUrl: 'livevote.html'
})
export class LiveVotePage {
    public title: string;
    public entries: any[] = [];
    public competition_name: string = '';
    public subscriptionActive: boolean = false;
    private liveVotingSubscription: any;

    constructor(private toastCtrl: ToastController, private http: Http, private authProvider: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
        this.title = navParams.data.title;

        this.getLiveVotingEntries();
    }

    getLiveVotingEntries(refresher?) {
        this.liveVotingSubscription = this.loadEntries().subscribe(result => {
            this.subscriptionActive = true;
            if (result.length > 0) {
                this.competition_name = result[0].competition;
            }
            this.entries = result;
            this.entries.filter(element => {
                element.rating = 0;
                if (element.vote.data[0] != null) {
                    element.rating = element.vote.data[0].points;
                }
            });
            if(refresher){
                refresher.complete();
            }
        });
    }

    doRefresh(refresher?) {
        this.liveVotingSubscription.unsubscribe();
        this.getLiveVotingEntries(refresher);
    }

    ionViewWillLeave():void {
        this.liveVotingSubscription.unsubscribe();
    }

    loadEntries() {
        let headers = new Headers({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN}); // ... Set content type to JSON
        let options = new RequestOptions({headers: headers}); // Create a request option

        return Observable.timer(0, 10000).mergeMap(() => this.http.get(sprintf(SettingsProvider.variables.VOTE_LIVE_API, this.authProvider.uniqid()) + '?' + Math.floor((Math.random() * 1000000) + 1), options))
            .map(res => {
                console.log("called");
                if (res.status == 204) {
                    return [];
                }
                return <VoteEntry[]>res.json().data;
            });
    }

    onModelChange(points, entry) {
        let headers = new Headers({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN}); // ... Set content type to JSON
        let options = new RequestOptions({headers: headers}); // Create a request option

        this.http.post(sprintf(SettingsProvider.variables.VOTE_SAVE_API, this.authProvider.uniqid(), entry.id) + '?' + Math.floor((Math.random() * 1000000) + 1), {
            points: points,
            vote_category_id: 1
        }, options).subscribe(result => {
            let toast = this.toastCtrl.create({
                message: 'Voted ' + points + ' stars for ' + entry.title,
                duration: 3000,
                position: 'top',
                showCloseButton: true
            });
            toast.present();
        });
    }
}
