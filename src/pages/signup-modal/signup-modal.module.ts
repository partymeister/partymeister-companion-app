import {NgModule} from "@angular/core";
import {SignupModalPage} from "./signup-modal";
import {ComponentsModule} from "../../components/components.module";
import {IonicPageModule} from "ionic-angular";
import {IonicImageLoader} from "ionic-image-loader";


@NgModule({
    declarations: [
        SignupModalPage,
    ],
    entryComponents: [
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(SignupModalPage),
        IonicImageLoader,
    ],
})
export class SignupModalPageModule {
}
