/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { SubscriptionCouponInformationPage } from "./subscription-coupon-information";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";
import { NgxMaskModule } from "ngx-mask";
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  declarations: [SubscriptionCouponInformationPage],
  imports: [
    IonicPageModule.forChild(SubscriptionCouponInformationPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    NgxMaskModule.forRoot(),
    CurrencyMaskModule
  ],
})
export class SubscriptionCouponInformationPageModule { }