import { Component, Input } from '@angular/core';

@Component({
  selector: 'gallery-component',
  templateUrl: 'gallery.html'
})
export class GalleryComponent {

  @Input() block: {};

  constructor() {
  }

}
