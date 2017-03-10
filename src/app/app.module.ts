import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PartyMeisterCompanionApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {SettingsPage} from '../pages/settings/settings';
import {RegistrationPage} from '../pages/registration/registration';
import {PagesProvider} from '../providers/pages';
import {NavigationProvider} from '../providers/navigation';
import {VisitorProvider} from '../providers/visitor';
import {TextComponent} from '../components/text/text';
import {GalleryComponent} from '../components/gallery/gallery';
import {VisitorComponent} from '../components/visitor/visitor';
import {CacheService} from "ionic-cache/ionic-cache";
import {Md5} from 'ts-md5/dist/md5';
import { LazyImgComponent } from '../components/lazyimg/lazyimg';

@NgModule({
    declarations: [
        PartyMeisterCompanionApp,
        HomePage,
        SettingsPage,
        RegistrationPage,
        TextComponent,
        GalleryComponent,
        VisitorComponent,
        LazyImgComponent,
    ],
    imports: [
        IonicModule.forRoot(PartyMeisterCompanionApp),
        FormsModule,
        ReactiveFormsModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        PartyMeisterCompanionApp,
        HomePage,
        SettingsPage,
        RegistrationPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        PagesProvider, NavigationProvider, CacheService, Md5, VisitorProvider]
})
export class AppModule {
}
