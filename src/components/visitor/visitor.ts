import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {VisitorProvider} from '../../providers/visitor';

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

    @Input() block: any;

    visitors: any[];
    originalVisitors: any[];

    searchTerm: string = '';
    searchControl: FormControl;
    searching: any = false;

    constructor(public visitorService: VisitorProvider) {
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

    onSearchInput(){
        this.searching = true;
    }

    setFilteredItems() {

        this.visitors = this.visitorService.filterItems(this.originalVisitors, this.searchTerm);

    }
}
