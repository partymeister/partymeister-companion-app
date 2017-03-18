import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {BarcodeScanner} from 'ionic-native';
import {CountryPickerService} from 'angular2-countrypicker';
import {CountryProvider} from '../../providers/country';
import {SettingsProvider} from '../../providers/settings';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {AlertController, App} from 'ionic-angular';
import {AuthProvider} from '../../providers/auth';
import {ContentPage} from '../content/content';

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

    constructor(private appCtrl: App, private authProvider: AuthProvider, private alertCtrl: AlertController, private settingsProvider: SettingsProvider, private http: Http, private countryProvider: CountryProvider, private countryPickerService: CountryPickerService, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
        this.title = navParams.data.title;
        console.log(navParams);
        this.form = this.formBuilder.group({
            login: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            group: [''],
            country: ['DE', Validators.required],
            access_key: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            password_repeat: ['',Validators.compose([Validators.required, Validators.minLength(3)])]
        }, {validator: RegistrationPage.matchPasswords});
        this.countryPickerService.getCountries().subscribe(countries =>
            this.countries = countryProvider.sortCountries(countries)
        )
    }

    static matchPasswords(cg: FormGroup): {[err: string]: any} {
        let pwd1 = cg.get('password');
        let pwd2 = cg.get('password_repeat');
        let rv: {[error: string]: any} = {};
        if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
            rv['passwordMismatch'] = true;
        }
        return rv;
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

    submit() {
        let bodyString = JSON.stringify(this.form.value); // Stringify payload
        let headers = new Headers({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN}); // ... Set content type to JSON
        let options = new RequestOptions({headers: headers}); // Create a request option

        this.http.post(SettingsProvider.variables.REGISTRATION_API, bodyString, options) // ...using post request
            .subscribe(result => {
                    this.authProvider.doLogin(result.json().data).then(res => {
                        this.navCtrl.setRoot(ContentPage, { title: "Visitors", url:"https://local.revision-party.net/visitors.json", force: true});
                    });
                },
                err => {
                    let alert = this.alertCtrl.create({
                        title: 'Registration unsuccessful :(',
                        subTitle: 'Looks like this access key or this handle was already used before',
                        buttons: ['OK']
                    });
                    alert.present();
                }
            );
    }
}
