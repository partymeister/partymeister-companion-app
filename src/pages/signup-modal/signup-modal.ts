import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ViewController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {CountryPickerService} from 'angular2-countrypicker';
import {CountryProvider} from '../../providers/country';
import {VisitorProvider} from '../../providers/visitor';

@Component({
    selector: 'page-signup-modal',
    templateUrl: 'signup-modal.html'
})
export class SignupModalPage {
    private form: FormGroup;
    public countries: any[];

    constructor(private visitorProvider: VisitorProvider, private viewCtrl: ViewController, private countryProvider: CountryProvider, private countryPickerService: CountryPickerService, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            login: ['', Validators.required],
            groups: [''],
            country: ['DE', Validators.required]
        });
        this.countryPickerService.getCountries().subscribe(countries =>
            this.countries = countryProvider.sortCountries(countries)
        )
    }

    submit() {
        this.visitorProvider.signupRequest(this.form.value)
            .subscribe(result => {
                this.closeMe(true);
            });
    }

    closeMe(refresh) {
        this.viewCtrl.dismiss({refresh: refresh});
    }

}
