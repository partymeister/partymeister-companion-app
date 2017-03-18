import {Component} from '@angular/core';
import {NavController, NavParams, MenuController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {SettingsProvider} from '../../providers/settings';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {RegistrationPage} from '../registration/registration';
import {ContentPage} from '../content/content';
import {AlertController} from 'ionic-angular';
import {AuthProvider} from '../../providers/auth';

/*
 Generated class for the Registration page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage {
    private form: FormGroup;
    public title: string;
    public countries: any[];
    public error: any;

    constructor(private authProvider: AuthProvider, private menuCtrl: MenuController, private alertCtrl: AlertController, private http: Http, private settingsProvider: SettingsProvider, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
        this.title = navParams.data.title;
        this.form = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    goToRegistrationPage() {
        this.navCtrl.push(RegistrationPage, {title: 'Registration'});
    }

    submit() {
        let bodyString = JSON.stringify(this.form.value); // Stringify payload
        let headers = new Headers({'Content-Type': 'application/json', 'token': SettingsProvider.variables.API_TOKEN}); // ... Set content type to JSON
        let options = new RequestOptions({headers: headers}); // Create a request option

        this.http.post(SettingsProvider.variables.LOGIN_API, bodyString, options) // ...using post request
            .subscribe(result => {
                    this.authProvider.doLogin(result.json().data).then(res => {
                        this.navCtrl.setRoot(ContentPage, { title: "Visitors", url:"https://local.revision-party.net/visitors.json", force: true});
                        this.menuCtrl.open();
                    });
                },
                err => {
                    let alert = this.alertCtrl.create({
                        title: 'Login unsuccessful :(',
                        subTitle: 'There was a problem with your login credentials. Are you registered yet?',
                        buttons: ['OK']
                    });
                    alert.present();
                }
            );
    }
}
