/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { JobDetailsPage } from "./job-details";
import { IonicPageModule } from "@ionic/angular";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";
import { Ionic2RatingModule } from "ionic2-rating";
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  declarations: [JobDetailsPage],
  imports: [
    IonicPageModule.forChild(JobDetailsPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    CurrencyMaskModule,
    Ionic2RatingModule
  ],
})
export class JobDetailsPageModule { }