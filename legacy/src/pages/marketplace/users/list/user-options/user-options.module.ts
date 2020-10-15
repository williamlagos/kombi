/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { UserOptionsMenu } from "./user-options";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";
import { IonicPageModule } from "@ionic/angular";

@NgModule({
  declarations: [UserOptionsMenu],
  imports: [
    IonicPageModule.forChild(UserOptionsMenu),
    ComponentsModule,
    DirectivesModule,
    PipesModule
  ]
})
export class UserOptionsMenuModule { }