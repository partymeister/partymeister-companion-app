import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule} from '@angular/core';
// import {NotAuthenticatedComponent} from './not-authenticated/not-authenticated';
import {NetworkConnectionComponent} from "./network-connection/network-connection";
import {CommonModule} from "@angular/common";
import {IonicModule} from "ionic-angular";
import {GalleryComponent} from "./gallery/gallery";
import {ItemComponent} from "./item/item";
import {SponsorComponent} from "./sponsor/sponsor";
import {TextComponent} from "./text/text";
import {TimetableComponent} from "./timetable/timetable";
import {VisitorComponent} from "./visitor/visitor";
// import {TranslateModule} from "@ngx-translate/core";
// import {FormErrorComponent} from './form-error/form-error';

@NgModule({
    declarations: [
        NetworkConnectionComponent,
        GalleryComponent,
        ItemComponent,
        SponsorComponent,
        TextComponent,
        TimetableComponent,
        VisitorComponent,
        // FormErrorComponent,
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    entryComponents: [
        // NotAuthenticatedComponent
    ],
    exports: [
        // NotAuthenticatedComponent,
        NetworkConnectionComponent,
        GalleryComponent,
        ItemComponent,
        SponsorComponent,
        TextComponent,
        TimetableComponent,
        VisitorComponent
        // FormErrorComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {
}
