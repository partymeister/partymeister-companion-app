import {NgModule} from "@angular/core";
import {EntryModalPage} from "./entry-modal";
import {ComponentsModule} from "../../components/components.module";
import {IonicPageModule} from "ionic-angular";
import {IonicImageLoader} from "ionic-image-loader";

@NgModule({
    declarations: [
        EntryModalPage,
    ],
    entryComponents: [
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(EntryModalPage),
        IonicImageLoader,

    ],
})
export class EntryModalPageModule {
}
