import {NgModule} from "@angular/core";
import {ContentPage} from "./content";
import {ComponentsModule} from "../../components/components.module";
import {IonicPageModule} from "ionic-angular";
// import {IonicImageLoader} from "ionic-image-loader";

@NgModule({
    declarations: [
        ContentPage,
    ],
    entryComponents: [
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(ContentPage),
        // IonicImageLoader,
    ],
})
export class ContentPageModule {
}
