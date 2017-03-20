import {Component, Input} from '@angular/core';

@Component({
    selector: 'network-connection',
    templateUrl: 'network-connection.html'
})
export class NetworkConnectionComponent {

    @Input() isOnline: boolean = false;

    constructor() {
    }

    ngOnInit() {
        console.log("NETWORK CONNECTION COMPONENT LOADED");
    }
}
