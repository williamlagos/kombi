/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { MerchantNotificationsDrawer } from "./merchant-notifications";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";
import { IonicPageModule } from "@ionic/angular";

@NgModule({
  declarations: [MerchantNotificationsDrawer],
  imports: [
    IonicPageModule.forChild(MerchantNotificationsDrawer),
    ComponentsModule,
    DirectivesModule,
    PipesModule
  ]
})
export class MerchantNotificationsDrawerModule { }