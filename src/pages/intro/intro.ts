import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LinkService} from '../../services/link';
import {Storage} from '@ionic/storage';

/*
  Generated class for the Intro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private linkService: LinkService) {}

  navigateHome() {
    this.linkService.clickLink('https://2017.revision-party.net/app_at_a_glance.json');
    this.storage.set('introShown', true);
  }

}
