import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {BarcodeScanner} from 'ionic-native';
import {CountryPickerService} from 'angular2-countrypicker';
import {CountryProvider} from '../../providers/country';

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
    private form: FormGroup;
    title: string;
    public countries: any[];

    constructor(private countryProvider: CountryProvider, private countryPickerService: CountryPickerService, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
        this.title = navParams.data.title;
        this.form = this.formBuilder.group({
            handle: ['', Validators.required],
            group: [''],
            country: ['DE', Validators.required],
            access_key: ['', Validators.required]
        });
        this.countryPickerService.getCountries().subscribe(countries =>
            this.countries = countryProvider.sortCountries(countries)
        )
    }

    openCamera(event) {
        BarcodeScanner.scan().then((barcodeData) => {
            this.form.patchValue({access_key: barcodeData.text});
            // Success! Barcode data is here
        }, (err) => {
            // An error occurred
        });
        event.stopPropagation();
    }

    logForm() {
        console.log(this.form.value)
    }
}
