import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ViewController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {CountryPickerService} from 'angular2-countrypicker';
import {CountryProvider} from '../../providers/country';
import {SettingsProvider} from '../../providers/settings';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

/*
 Generated class for the SignupModal page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-signup-modal',
    templateUrl: 'signup-modal.html'
})
export class SignupModalPage {
    private form: FormGroup;
    public countries: any[];

    constructor(private http: Http, private viewCtrl: ViewController, private countryProvider: CountryProvider, private countryPickerService: CountryPickerService, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
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
        let bodyString = JSON.stringify(this.form.value); // Stringify payload
        let headers = new Headers({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN}); // ... Set content type to JSON
        let options = new RequestOptions({headers: headers}); // Create a request option

        this.http.post(SettingsProvider.variables.VISITOR_SIGNUP_API, bodyString, options) // ...using post request
            .subscribe(result => {
                this.closeMe(true);
            });
    }

    closeMe(refresh) {
        this.viewCtrl.dismiss({refresh: refresh});
    }

}
