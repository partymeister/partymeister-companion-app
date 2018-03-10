import {NgModule} from "@angular/core";
import {SettingsPage} from "./settings";
import {ComponentsModule} from "../../components/components.module";
import {IonicPageModule} from "ionic-angular";
import {IonicImageLoader} from "ionic-image-loader";

@NgModule({
    declarations: [
        SettingsPage,
    ],
    entryComponents: [
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(SettingsPage),
        IonicImageLoader,

    ],
})
export class SettingsPageModule {
}
