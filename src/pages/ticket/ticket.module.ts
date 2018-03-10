import {NgModule} from "@angular/core";
import {TicketPage} from "./ticket";
import {ComponentsModule} from "../../components/components.module";
import {IonicPageModule} from "ionic-angular";
import {QRCodeModule} from "angular2-qrcode";
import {IonicImageLoader} from "ionic-image-loader";

@NgModule({
    declarations: [
        TicketPage,
    ],
    entryComponents: [
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(TicketPage),
        QRCodeModule,
        IonicImageLoader,

    ],
})
export class TicketPageModule {
}
