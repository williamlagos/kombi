/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { SubscriptionCouponsListPage } from "./subscription-coupons-list";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [SubscriptionCouponsListPage],
  imports: [
    IonicPageModule.forChild(SubscriptionCouponsListPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    NgxPaginationModule
  ],
})
export class SubscriptionCouponsListPageModule { }