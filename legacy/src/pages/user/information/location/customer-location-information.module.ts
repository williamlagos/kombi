/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { CustomerLocationInformationPage } from "./customer-location-information";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  declarations: [CustomerLocationInformationPage],
  imports: [
    IonicPageModule.forChild(CustomerLocationInformationPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    NgxMaskModule.forRoot()
  ],
})
export class CustomerLocationInformationPageModule { }