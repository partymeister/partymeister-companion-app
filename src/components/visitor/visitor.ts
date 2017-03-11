import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {VisitorProvider} from '../../providers/visitor';
import {ModalController, NavParams} from 'ionic-angular';
import {SignupModalPage} from '../../pages/signup-modal/signup-modal';


/*
 Generated class for the Visitor component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
    selector: 'visitor-component',
    templateUrl: 'visitor.html'
})
export class VisitorComponent {
    @Output() notifyRefresher: EventEmitter<any> = new EventEmitter();
    @Input() block: any;

    visitors: any[];
    originalVisitors: any[];

    searchTerm: string = '';
    searchControl: FormControl;
    searching: any = false;

    constructor(public visitorService: VisitorProvider, public modalCtrl: ModalController) {
        this.searchControl = new FormControl();
    }

    ngOnInit() {
        this.visitors = this.block.content.visitors;
        this.originalVisitors = this.block.content.visitors;

        this.setFilteredItems();

        this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
            this.searching = false;
            this.setFilteredItems();
        });
    }

    onSearchInput() {
        this.searching = true;
    }

    setFilteredItems() {

        this.visitors = this.visitorService.filterItems(this.originalVisitors, this.searchTerm);

    }

    presentSignupModal() {
        let signupModal = this.modalCtrl.create(SignupModalPage);
        signupModal.onDidDismiss(data => {
            console.log("Modal closed");
            if (data.refresh == true) {
                this.sendRefreshToParent();
            }
            console.log(data);
        });
        signupModal.present();
    }

    sendRefreshToParent() {
        this.notifyRefresher.emit(true);
    }
}
