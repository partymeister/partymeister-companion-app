import { Component, Input } from '@angular/core';

/*
  Generated class for the Text component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'text-component',
  templateUrl: 'text.html'
})
export class TextComponent {

  @Input() block: {};

  constructor() {
  }

}
