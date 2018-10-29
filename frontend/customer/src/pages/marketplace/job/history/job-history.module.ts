/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { JobHistoryPage } from "./job-history";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";
import { Ionic2RatingModule } from "ionic2-rating";

@NgModule({
  declarations: [JobHistoryPage],
  imports: [
    IonicPageModule.forChild(JobHistoryPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    Ionic2RatingModule
  ],
})
export class JobHistoryPageModule { }