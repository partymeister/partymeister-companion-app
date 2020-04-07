import {NgModule} from "@angular/core";
import {LoginPage} from "./login";
import {ComponentsModule} from "../../components/components.module";
import {IonicPageModule} from "ionic-angular";
// import {IonicImageLoader} from "ionic-image-loader";

@NgModule({
    declarations: [
        LoginPage,
    ],
    entryComponents: [
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(LoginPage),
        // IonicImageLoader,
    ],
})
export class LoginPageModule {
}
