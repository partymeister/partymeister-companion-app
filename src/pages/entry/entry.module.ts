import {NgModule} from "@angular/core";
import {EntryPage} from "./entry";
import {ComponentsModule} from "../../components/components.module";
import {IonicPageModule} from "ionic-angular";
// import {IonicImageLoader} from "ionic-image-loader";

@NgModule({
    declarations: [
        EntryPage,
    ],
    entryComponents: [
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(EntryPage),
        // IonicImageLoader,

    ],
})
export class EntryPageModule {
}
