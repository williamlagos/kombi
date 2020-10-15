/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { MerchantDetailsPage } from "./merchant-details";
import { IonicPageModule } from "@ionic/angular";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";
import { Ionic2RatingModule } from "ionic2-rating";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  declarations: [MerchantDetailsPage],
  imports: [
    IonicPageModule.forChild(MerchantDetailsPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    Ionic2RatingModule,
    NgxMaskModule
  ],
})
export class MerchantDetailsPageModule { }