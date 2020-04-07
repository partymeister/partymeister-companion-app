import {NgModule} from "@angular/core";
import {IntroPage} from "./intro";
import {ComponentsModule} from "../../components/components.module";
// import {IonicImageLoader} from "ionic-image-loader";
import {IonicPageModule} from "ionic-angular";

@NgModule({
    declarations: [
        IntroPage,
    ],
    entryComponents: [
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(IntroPage),
        // IonicImageLoader,

    ],
})
export class IntroPageModule {
}
