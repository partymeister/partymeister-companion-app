import {Component} from '@angular/core';
import {NavController, NavParams, MenuController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AlertController} from 'ionic-angular';
import {MasterPage} from '../master/master';
import {LinkService} from '../../services/link';
import {SettingsProvider} from '../../providers/settings';

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

    constructor(
        private menuCtrl: MenuController,
        private alertCtrl: AlertController,
        public navCtrl: NavController,
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        private linkService: LinkService,
    ) {
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
                    this.authProvider.doLogin(result['data']).then(res => {
                        this.linkService.clickLink(SettingsProvider.variables.DEFAULT_PAGE_LOCAL, true);
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
