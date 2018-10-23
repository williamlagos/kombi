/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { OrdersListPage } from "./orders-list";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";
import { MerchantNotificationsDrawerModule } from "@notifications/merchant-notifications.module";

@NgModule({
  declarations: [OrdersListPage],
  imports: [
    IonicPageModule.forChild(OrdersListPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    MerchantNotificationsDrawerModule
  ]
})

export class OrdersListPageModule { }