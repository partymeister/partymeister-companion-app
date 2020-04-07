import {NgModule} from "@angular/core";
import {VotePage} from "./vote";
import {ComponentsModule} from "../../components/components.module";
import {IonicPageModule} from "ionic-angular";
// import {IonicImageLoader} from "ionic-image-loader";
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
    declarations: [
        VotePage,
    ],
    entryComponents: [
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(VotePage),
        // IonicImageLoader,
        Ionic2RatingModule,

    ],
})
export class VotePageModule {
}
