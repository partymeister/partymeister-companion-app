import {NgModule} from "@angular/core";
import {TicketModalPage} from "./ticket-modal";
import {ComponentsModule} from "../../components/components.module";
import {IonicPageModule} from "ionic-angular";
import {QRCodeModule} from "angular2-qrcode";
import {IonicImageLoader} from "ionic-image-loader";

@NgModule({
    declarations: [
        TicketModalPage,
    ],
    entryComponents: [
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(TicketModalPage),
        QRCodeModule,
        IonicImageLoader,
    ],
})
export class TicketModalPageModule {
}
