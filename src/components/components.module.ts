import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {NetworkConnectionComponent} from "./network-connection/network-connection";
import {CommonModule} from "@angular/common";
import {IonicModule} from "ionic-angular";
import {GalleryComponent} from "./gallery/gallery";
import {ItemComponent} from "./item/item";
import {SponsorComponent} from "./sponsor/sponsor";
import {TextComponent} from "./text/text";
import {TimetableComponent} from "./timetable/timetable";
import {VisitorComponent} from "./visitor/visitor";
import {IonicImageLoader} from "ionic-image-loader";

@NgModule({
    declarations: [
        NetworkConnectionComponent,
        GalleryComponent,
        ItemComponent,
        SponsorComponent,
        TextComponent,
        TimetableComponent,
        VisitorComponent,
    ],
    imports: [
        CommonModule,
        IonicImageLoader,
        IonicModule
    ],
    entryComponents: [
    ],
    exports: [
        NetworkConnectionComponent,
        GalleryComponent,
        ItemComponent,
        SponsorComponent,
        TextComponent,
        TimetableComponent,
        VisitorComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {
}
