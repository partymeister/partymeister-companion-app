// Basics
import {NgModule, ErrorHandler, Injector} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {PartyMeisterCompanionApp} from './app.component';
import { BrowserModule } from '@angular/platform-browser';

// Services and providers
import {ConnectivityService} from '../providers/connectivity-service';
import {PagesProvider} from '../providers/pages';
import {NavigationProvider} from '../providers/navigation';
import {VisitorProvider} from '../providers/visitor';
import {SettingsProvider} from '../providers/settings';
import {CountryProvider} from '../providers/country';
import {StorageProvider} from '../providers/storage';
import {LinkService} from '../services/link';
import {VoteProvider} from '../providers/vote';
import {AuthProvider} from '../providers/auth';
import {EntryProvider} from '../providers/entry';
import {TicketProvider} from '../providers/ticket';

// Modules
import {IonicStorageModule} from '@ionic/storage';
import {Ionic2RatingModule} from '../lib/ionic2-rating/ionic2-rating.module';
import {Md5} from 'ts-md5/dist/md5';
import {ServiceLocator} from '../services/service-locator';
import {QRCodeModule} from 'angular2-qrcode';
import { CacheModule } from "ionic-cache";
import {IonicImageLoader} from 'ionic-image-loader';

// Components
import {NetworkConnectionComponent} from '../components/network-connection/network-connection';
import {TextComponent} from '../components/text/text';
import {GalleryComponent} from '../components/gallery/gallery';
import {VisitorComponent} from '../components/visitor/visitor';
import {TimetableComponent} from '../components/timetable/timetable';
import {SponsorComponent} from '../components/sponsor/sponsor';
import {ItemComponent} from '../components/item/item';

// Plugins
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Network} from '@ionic-native/network';
import {OneSignal} from '@ionic-native/onesignal';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Camera} from '@ionic-native/camera';
import {AppVersion} from '@ionic-native/app-version';
import {PhotoViewer} from '@ionic-native/photo-viewer';

// Pages
import {ContentPage} from '../pages/content/content';
import {SettingsPage} from '../pages/settings/settings';
import {IntroPage} from '../pages/intro/intro';
import {LoginPage} from '../pages/login/login';
import {RegistrationPage} from '../pages/registration/registration';
import {EntryPage} from '../pages/entry/entry';
import {TicketPage} from '../pages/ticket/ticket';
import {TicketModalPage} from '../pages/ticket-modal/ticket-modal';
import {SignupModalPage} from '../pages/signup-modal/signup-modal';
import {EntryModalPage} from '../pages/entry-modal/entry-modal';
import {LiveVotePage} from '../pages/livevote/livevote';
import {VotePage} from '../pages/vote/vote';

// Prod mode enabler
import {enableProdMode} from '@angular/core';
enableProdMode();

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
        SponsorComponent,
        ItemComponent,
        NetworkConnectionComponent,
        SignupModalPage,
        EntryModalPage,
        LiveVotePage,
        VotePage,
        TicketPage,
        TicketModalPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(PartyMeisterCompanionApp),
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        IonicStorageModule.forRoot({
            name: '__pmcompanion',
            driverOrder: ['indexeddb', 'websql']
        }),
        Ionic2RatingModule,
        QRCodeModule,
        CacheModule.forRoot(),
        IonicImageLoader.forRoot(),
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
        TicketPage,
        TicketModalPage,
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        PagesProvider,
        NavigationProvider,
        Md5,
        VisitorProvider,
        SettingsProvider,
        LinkService,
        CountryProvider,
        AuthProvider,
        VoteProvider,
        EntryProvider,
        TicketProvider,
        ConnectivityService,
        StatusBar,
        SplashScreen,
        Network,
        OneSignal,
        BarcodeScanner,
        Camera,
        AppVersion,
        PhotoViewer,
        StorageProvider,
    ]
})
export class AppModule {
    constructor(private injector: Injector) {
        ServiceLocator.injector = this.injector;
    }
}
