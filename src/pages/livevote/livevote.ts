import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VoteProvider} from '../../providers/vote';
import {MasterPage} from '../master/master';

@IonicPage()
@Component({
    selector: 'page-livevote',
    templateUrl: 'livevote.html'
})
export class LiveVotePage extends MasterPage {
    public entries: any[] = [];
    public competition_name: string = '';
    public subscriptionActive: boolean = false;
    private liveVotingSubscription: any;

    constructor(private voteProvider: VoteProvider, public navCtrl: NavController, public navParams: NavParams) {
        super(navCtrl, navParams);

        this.getLiveVotingEntries();
    }

    getLiveVotingEntries(refresher?) {
        this.liveVotingSubscription = this.voteProvider.getLiveVotingEntries().subscribe(result => {
            this.subscriptionActive = true;
            this.competition_name = '';
            if (result.length > 0) {
                this.competition_name = result[0].competition;
            }
            this.entries = result;
            this.entries.filter(element => {
                element.rating = 0;
                if (element.vote.data[0] != null) {
                    element.rating = element.vote.data[0].points;
                    element.comment = element.vote.data[0].comment;
                    element.favourite = element.vote.data[0].special_vote;
                }
            });
            if (refresher) {
                refresher.complete();
            }
        });
    }

    doRefresh(refresher?) {
        if (this.connectivityService.isOffline()) {
            if (refresher) {
                refresher.complete();
            }
            return;
        }
        this.liveVotingSubscription.unsubscribe();
        this.getLiveVotingEntries(refresher);
    }

    ionViewWillLeave(): void {
        this.liveVotingSubscription.unsubscribe();
    }

    onCommentSend(entry) {
        this.voteProvider.vote(entry.rating, entry.comment, entry);
    }

    onFavouriteSend(entry, favourite) {
        for (let e of this.entries) {
            e.favourite = false;
        }
        entry.favourite = favourite;
        this.voteProvider.vote(entry.rating, entry.comment, entry);
    }

    onModelChange(points, entry) {
        this.voteProvider.vote(points, entry.comment, entry);
    }
}
