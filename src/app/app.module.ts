import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConnectivityService} from '../providers/connectivity-service';
import {PartyMeisterCompanionApp} from './app.component';
import {ContentPage} from '../pages/content/content';
import {SettingsPage} from '../pages/settings/settings';
import {IntroPage} from '../pages/intro/intro';
import {LoginPage} from '../pages/login/login';
import {RegistrationPage} from '../pages/registration/registration';
import {EntryPage} from '../pages/entry/entry';
import {NetworkConnectionComponent} from '../components/network-connection/network-connection';
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
import {LiveVotePage} from '../pages/livevote/livevote';
import {VotePage} from '../pages/vote/vote';
import {CacheService} from "ionic-cache/ionic-cache";
import {Md5} from 'ts-md5/dist/md5';
import {LazyImgComponent} from '../components/lazyimg/lazyimg';
import {LinkService} from '../services/link';
import {CountryPickerModule} from 'angular2-countrypicker';
import {CountryProvider} from '../providers/country';
import {VoteProvider} from '../providers/vote';
import {AuthProvider} from '../providers/auth';
import {EntryProvider} from '../providers/entry';
import {IonicStorageModule} from '@ionic/storage';
import {EnvironmentsModule} from '../app/environment-variables/environment-variables.module'
import {Ionic2RatingModule} from '../lib/ionic2-rating/ionic2-rating.module';
import {Injector} from "@angular/core";
import {ServiceLocator} from '../services/service-locator';

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
        NetworkConnectionComponent,
        SignupModalPage,
        EntryModalPage,
        LiveVotePage,
        VotePage,
        LazyImgComponent,
    ],
    imports: [
        IonicModule.forRoot(PartyMeisterCompanionApp),
        FormsModule,
        ReactiveFormsModule,
        CountryPickerModule.forRoot({
            baseUrl: 'assets/'
        }),
        EnvironmentsModule,
        IonicStorageModule.forRoot(),
        Ionic2RatingModule // Put ionic2-rating module here
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
        LiveVotePage,
        VotePage,
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        PagesProvider,
        NavigationProvider,
        CacheService,
        Md5,
        VisitorProvider,
        CountryProvider,
        SettingsProvider,
        LinkService,
        AuthProvider,
        VoteProvider,
        EntryProvider,
        ConnectivityService
    ]
})
export class AppModule {
    constructor(private injector: Injector) {
        ServiceLocator.injector = this.injector;
    }
}
