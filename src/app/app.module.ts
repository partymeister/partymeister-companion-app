import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CloudSettings, CloudModule} from '@ionic/cloud-angular';

import {PartyMeisterCompanionApp} from './app.component';
import {ContentPage} from '../pages/content/content';
import {SettingsPage} from '../pages/settings/settings';
import {IntroPage} from '../pages/intro/intro';
import {LoginPage} from '../pages/login/login';
import {RegistrationPage} from '../pages/registration/registration';
import {EntryPage} from '../pages/entry/entry';
import {PagesProvider} from '../providers/pages';
import {NavigationProvider} from '../providers/navigation';
import {VisitorProvider} from '../providers/visitor';
import {SettingsProvider} from '../providers/settings';
import {TextComponent} from '../components/text/text';
import {GalleryComponent} from '../components/gallery/gallery';
import {VisitorComponent} from '../components/visitor/visitor';
import {TimetableComponent} from '../components/timetable/timetable';
import {SignupModalPage} from '../pages/signup-modal/signup-modal';
import {EntryModalPage} from '../pages/entry-modal/entry-modal';
import {CacheService} from "ionic-cache/ionic-cache";
import {Md5} from 'ts-md5/dist/md5';
import {LazyImgComponent} from '../components/lazyimg/lazyimg';
import {LinkService} from '../services/link';
import {CountryPickerModule} from 'angular2-countrypicker';
import {CountryProvider} from '../providers/country';
import {AuthProvider} from '../providers/auth';
import {Storage} from '@ionic/storage';
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
        IntroPage,
        LoginPage,
        EntryPage,
        RegistrationPage,
        TextComponent,
        GalleryComponent,
        VisitorComponent,
        TimetableComponent,
        SignupModalPage,
        EntryModalPage,
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
        IntroPage,
        LoginPage,
        RegistrationPage,
        SignupModalPage,
        EntryModalPage,
        EntryPage,
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        PagesProvider, NavigationProvider, CacheService, Md5, VisitorProvider, CountryProvider, SettingsProvider, LinkService, AuthProvider, Storage]
})
export class AppModule {
}
