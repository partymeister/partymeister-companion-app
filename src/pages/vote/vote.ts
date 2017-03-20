import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {VoteProvider} from '../../providers/vote';
import {FormControl} from '@angular/forms';
import {MasterPage} from '../master/master';

@Component({
    selector: 'page-vote',
    templateUrl: 'vote.html'
})
export class VotePage extends MasterPage {
    public entries: any[] = [];
    public competitions: {} = {};
    public competition_keys: any[] = [];
    public competition_id: number;
    public subscriptionActive: boolean = false;
    public deadlineReached: boolean = false;

    formControl: FormControl;

    constructor(private voteProvider: VoteProvider, public navCtrl: NavController, public navParams: NavParams) {
        super(navCtrl, navParams);

        this.formControl = new FormControl();
    }

    ngOnInit() {
        this.formControl.valueChanges.subscribe(value => {
            this.competition_id = value;
        });

        this.getVotingEntries();
    }


    getVotingEntries(force?, refresher?) {
        this.voteProvider.getVotingEntries(force).subscribe(result => {
            this.subscriptionActive = true;
            this.competitions = {};
            this.competition_keys = [];
            this.deadlineReached = false;
            if (result[0].deadline_reached) {
                this.deadlineReached = true;
            }

            result.filter(element => {
                if (this.competitions[element.competition_id] == null) {
                    this.competitions[element.competition_id] = {id: element.competition_id, name: element.competition, entries: []};
                    this.competition_keys.push(element.competition_id);
                }
                element.rating = 0;
                if (element.vote.data[0] != null) {
                    element.rating = element.vote.data[0].points;
                }
                this.competitions[element.competition_id].entries.push(element);

                if (this.competition_id == null) {
                    this.competition_id = element.competition_id;
                }
            });

            if (refresher) {
                refresher.complete();
            }
        });
    }

    doRefresh(refresher?) {
        this.getVotingEntries(true, refresher);
    }

    onModelChange(points, entry) {
        this.voteProvider.vote(points, entry);
    }
}
