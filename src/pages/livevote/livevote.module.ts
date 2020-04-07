import {NgModule} from "@angular/core";
import {LiveVotePage} from "./livevote";
import {ComponentsModule} from "../../components/components.module";
import {IonicPageModule} from "ionic-angular";
// import {IonicImageLoader} from "ionic-image-loader";
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
    declarations: [
        LiveVotePage,
    ],
    entryComponents: [
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(LiveVotePage),
        // IonicImageLoader,
        Ionic2RatingModule,

    ],
})
export class LivevotePageModule {
}
