import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {LinkService} from '../../services/link';

declare var cordova:any;

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
    this.linkService.searchPageAndRedirect(url);
  }

  ngOnInit() {
    if (this.block.content == null) {
      return;
    }
    let div = document.createElement('div');
    div.innerHTML = this.block.content.body;
    [].forEach.call(div.getElementsByTagName("a"), (a) => {
      if (a.getAttribute('href') != null) {
        // if (a.getAttribute('href').search(/\.json/gi) != -1) {
        let url = a.getAttribute('href');
        a.removeAttribute('href');
        a.onclick = () => {
          console.log('link clicked: ' + url);
          window.open(url, '_system');
        };
      }
    });

    this.container.nativeElement.appendChild(div);
  }
}
