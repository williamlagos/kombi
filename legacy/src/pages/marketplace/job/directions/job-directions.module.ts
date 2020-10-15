/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { JobDirectionsPage } from "./job-directions";
import { IonicPageModule } from "@ionic/angular";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";
import { Ionic2RatingModule } from "ionic2-rating";
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  declarations: [JobDirectionsPage],
  imports: [
    IonicPageModule.forChild(JobDirectionsPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    CurrencyMaskModule,
    Ionic2RatingModule
  ],
})
export class JobDirectionsPageModule { }