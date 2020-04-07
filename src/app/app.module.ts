// Basics
import {NgModule, ErrorHandler, Injector} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {PartyMeisterCompanionApp} from './app.component';
import {BrowserModule} from '@angular/platform-browser';

// Services and providers
import {ConnectivityService} from '../providers/connectivity-service';
import {PagesProvider} from '../providers/pages';
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
import {Md5} from 'ts-md5/dist/md5';
import {ServiceLocator} from '../services/service-locator';
import {QRCodeModule} from 'angular2-qrcode';
import {CacheModule} from "ionic-cache";
// import {IonicImageLoader} from 'ionic-image-loader';

// Plugins
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Network} from '@ionic-native/network';
import {OneSignal} from '@ionic-native/onesignal';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Camera} from '@ionic-native/camera';
import {AppVersion} from '@ionic-native/app-version';
import {PhotoViewer} from '@ionic-native/photo-viewer';

import {AppProvider} from '../providers/app/app';
import {NavigationItemsComponent} from "../components/navigation-items/navigation-items";
import {IntroPageModule} from "../pages/intro/intro.module";
import {ContentPageModule} from "../pages/content/content.module";

import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import brands from '@fortawesome/fontawesome-free-brands';
import regular from '@fortawesome/fontawesome-free-regular';
import {NavigationProvider} from "../providers/navigation";
import {PushProvider} from "../providers/push/push";
import {Diagnostic} from "@ionic-native/diagnostic";
import {OpenNativeSettings} from "@ionic-native/open-native-settings";
import {RegistrationPageModule} from "../pages/registration/registration.module";
import {EntryModalPageModule} from "../pages/entry-modal/entry-modal.module";
import {SignupModalPageModule} from "../pages/signup-modal/signup-modal.module";
import {TicketModalPageModule} from "../pages/ticket-modal/ticket-modal.module";

fontawesome.library.add(solid, brands, regular);

@NgModule({
    declarations: [
        PartyMeisterCompanionApp,
        NavigationItemsComponent,
    ],
    imports: [
        IntroPageModule,
        ContentPageModule,
        EntryModalPageModule,
        SignupModalPageModule,
        RegistrationPageModule,
        TicketModalPageModule,
        BrowserModule,
        IonicModule.forRoot(PartyMeisterCompanionApp),
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        IonicStorageModule.forRoot({
            name: '__pmcompanion',
            driverOrder: ['indexeddb', 'websql']
        }),
        QRCodeModule,
        CacheModule.forRoot(),
        // IonicImageLoader.forRoot(),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        PartyMeisterCompanionApp,
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        PagesProvider,
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
        Diagnostic,
        OpenNativeSettings,
        StatusBar,
        SplashScreen,
        Network,
        OneSignal,
        BarcodeScanner,
        Camera,
        AppVersion,
        PhotoViewer,
        StorageProvider,
        AppProvider,
        NavigationProvider,
        PushProvider,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
    ]
})
export class AppModule {
    constructor(private injector: Injector) {
        ServiceLocator.injector = this.injector;
    }
}
