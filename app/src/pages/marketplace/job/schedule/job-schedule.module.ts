/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { JobSchedulePage } from "./job-schedule";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";

@NgModule({
  declarations: [JobSchedulePage],
  imports: [
    IonicPageModule.forChild(JobSchedulePage),
    ComponentsModule,
    DirectivesModule,
    PipesModule
  ],
})
export class JobSchedulePageModule { }