import { Component, Input } from '@angular/core';

@Component({
  selector: 'sponsor-component',
  templateUrl: 'sponsor.html'
})
export class SponsorComponent {

  @Input() block: {};

  constructor() {
  }

}
