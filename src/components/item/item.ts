import { Component, Input } from '@angular/core';

@Component({
  selector: 'item-component',
  templateUrl: 'item.html'
})
export class ItemComponent {

  @Input() block: any;
  public itemTypeKeys: any[] = [];

  constructor() {
  }

  ngOnInit() {
    this.itemTypeKeys = Object.keys(this.block.content.item_types);
  }
}
