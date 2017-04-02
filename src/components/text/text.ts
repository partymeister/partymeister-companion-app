import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import {LinkService} from '../../services/link';

@Component({
  selector: 'text-component',
  templateUrl: 'text.html'
})
export class TextComponent {
  @ViewChild('el') container: ElementRef;

  @Input() block: any;
  public html: any;

  constructor(private linkService: LinkService) {
  }

  openPage(url) {
    this.linkService.clickLink(url);
  }

  ngOnInit() {
    if (this.block.content == null) {
      return;
    }
    let div = document.createElement('div');
    div.innerHTML = this.block.content.body;
    [].forEach.call(div.getElementsByTagName("a"), (a) => {
      if (a.getAttribute('href') != null) {
        if (a.getAttribute('href').search(/\.json/gi) != -1) {
          let url = a.getAttribute('href');
          a.removeAttribute('href');
          a.onclick = () => this.openPage(url);
        }
      }
    });

    this.container.nativeElement.appendChild(div);
  }
}
