/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { SubscriptionPlansListPage } from "./subscription-plans-list";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [SubscriptionPlansListPage],
  imports: [
    IonicPageModule.forChild(SubscriptionPlansListPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    NgxPaginationModule
  ],
})
export class SubscriptionPlansListPageModule { }