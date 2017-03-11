import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import {PartyMeisterCompanionApp} from './app.component';
import {ContentPage} from '../pages/content/content';
import {SettingsPage} from '../pages/settings/settings';
import {RegistrationPage} from '../pages/registration/registration';
import {PagesProvider} from '../providers/pages';
import {NavigationProvider} from '../providers/navigation';
import {VisitorProvider} from '../providers/visitor';
import {SettingsProvider} from '../providers/settings';
import {TextComponent} from '../components/text/text';
import {GalleryComponent} from '../components/gallery/gallery';
import {VisitorComponent} from '../components/visitor/visitor';
import {SignupModalPage} from '../pages/signup-modal/signup-modal';
import {CacheService} from "ionic-cache/ionic-cache";
import {Md5} from 'ts-md5/dist/md5';
import { LazyImgComponent } from '../components/lazyimg/lazyimg';
import { CountryPickerModule } from 'angular2-countrypicker';
import {CountryProvider} from '../providers/country';
import {EnvironmentsModule} from '../app/environment-variables/environment-variables.module'

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': '99fa434f'
    }
};
@NgModule({
    declarations: [
        PartyMeisterCompanionApp,
        ContentPage,
        SettingsPage,
        RegistrationPage,
        TextComponent,
        GalleryComponent,
        VisitorComponent,
        SignupModalPage,
        LazyImgComponent,
    ],
    imports: [
        IonicModule.forRoot(PartyMeisterCompanionApp),
        CloudModule.forRoot(cloudSettings),
        FormsModule,
        ReactiveFormsModule,
        CountryPickerModule.forRoot({
            baseUrl: 'assets/'
        }),
        EnvironmentsModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        PartyMeisterCompanionApp,
        ContentPage,
        SettingsPage,
        RegistrationPage,
        SignupModalPage,
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        PagesProvider, NavigationProvider, CacheService, Md5, VisitorProvider, CountryProvider, SettingsProvider]
})
export class AppModule {
}
