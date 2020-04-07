import {NgModule} from "@angular/core";
import {RegistrationPage} from "./registration";
import {ComponentsModule} from "../../components/components.module";
import {IonicPageModule} from "ionic-angular";
// import {IonicImageLoader} from "ionic-image-loader";

@NgModule({
    declarations: [
        RegistrationPage,
    ],
    entryComponents: [
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(RegistrationPage),
        // IonicImageLoader,

    ],
})
export class RegistrationPageModule {
}
