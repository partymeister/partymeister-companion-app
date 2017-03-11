import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/*
 Generated class for the Timetable component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
    selector: 'timetable-component',
    templateUrl: 'timetable.html'
})
export class TimetableComponent {

    @Input() block: any;
    public items: any[];
    public originalItems: any[];

    searchTerm: string = '';
    searchControl: FormControl;
    searching: any = false;

    constructor() {
        this.searchControl = new FormControl();
    }

    onSearchInput() {
        this.searching = true;
    }

    setFilteredItems() {

        this.items = this.parseItems(this.originalItems, this.searchTerm);

    }

    parseItems(days, searchTerm) {

        let items = [];
        for (let day in days) {
            if (days.hasOwnProperty(day)) {

                let hours = [];

                for (let hour in days[day]) {
                    if (days[day].hasOwnProperty(hour)) {

                        let events = [];
                        for (let event in days[day][hour]) {
                            if (days[day][hour].hasOwnProperty(event)) {
                                let a = false;
                                if (searchTerm != '') {
                                    a = days[day][hour][event].name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                                } else {
                                    a = true;
                                }
                                if (a) {
                                    events.push({key: event, index: events.length, val: days[day][hour]});
                                }
                            }
                        }
                        if (events.length > 0) {
                            hours.push({key: hour, val: events})
                        }
                    }
                }
                if (hours.length > 0) {
                    items.push({key: day, val: hours});
                }
            }
        }

        return items;
    }

    ngOnInit() {
        this.items = this.block.content.items;
        this.originalItems = this.block.content.items;

        this.setFilteredItems();

        this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
            this.searching = false;
            this.setFilteredItems();
        });


    }

}
