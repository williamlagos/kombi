/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { OrderCreationPage } from "./order-creation";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  declarations: [OrderCreationPage],
  imports: [
    IonicPageModule.forChild(OrderCreationPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    CurrencyMaskModule,
  ],
})
export class OrderCreationPageModule { }