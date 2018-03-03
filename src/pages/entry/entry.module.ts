import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SliderPage} from './slider';
import {TranslateModule} from "@ngx-translate/core";
import {CustomerLoginModalPage} from "../customer-login-modal/customer-login-modal";
import {CustomerActivationModalPage} from "../customer-activation-modal/customer-activation-modal";
import {CustomerActivationLoginModalPage} from "../customer-activation-login-modal/customer-activation-login-modal";
import {IonicImageLoader} from "ionic-image-loader";
import {ComponentsModule} from "../../components/components.module";
import {IntroPage} from "./intro";
import {ContentPage} from "./content";
import {EntryPage} from "./entry";

@NgModule({
    declarations: [
        EntryPage,
    ],
    entryComponents: [
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(EntryPage),
        IonicImageLoader,

    ],
})
export class EntryPageModule {
}
