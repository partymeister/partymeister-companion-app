import {Component} from '@angular/core';
import {NavController, NavParams, MenuController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AlertController} from 'ionic-angular';
import {MasterPage} from '../master/master';

// FIXME: make this into a provider or service
import {RegistrationPage} from '../registration/registration';
import {ContentPage} from '../content/content';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class LoginPage extends MasterPage {
    private form: FormGroup;
    public countries: any[];

    constructor(private menuCtrl: MenuController, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
        super(navCtrl, navParams);

        this.form = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    goToRegistrationPage() {
        this.navCtrl.push(RegistrationPage, {title: 'Registration'});
    }

    submit() {
        this.authProvider.loginRequest(this.form.value)
            .subscribe(result => {
                    this.authProvider.doLogin(result.json().data).then(res => {
                        this.navCtrl.setRoot(ContentPage, {
                            title: "Visitors",
                            url: "https://local.revision-party.net/visitors.json",
                            force: true
                        });
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
