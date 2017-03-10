import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BarcodeScanner } from 'ionic-native';

/*
  Generated class for the Registration page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {
  private form : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder ) {
    this.form = this.formBuilder.group({
      handle: ['', Validators.required],
      group: [''],
      country: ['', Validators.required],
      access_key: ['', Validators.required]
    });
  }

  openCamera() {
    BarcodeScanner.scan().then((barcodeData) => {
      this.form.patchValue({access_key: barcodeData.text});
      // Success! Barcode data is here
    }, (err) => {
      // An error occurred
    });
  }
  logForm(){
    console.log(this.form.value)
  }
}
