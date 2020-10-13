/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { MerchantContactInformationPage } from "./merchant-contact-information";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";
import { CpfCnpjModule } from "ng2-cpf-cnpj";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  declarations: [MerchantContactInformationPage],
  imports: [
    IonicPageModule.forChild(MerchantContactInformationPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    NgxMaskModule.forRoot(),
    CpfCnpjModule
  ],
})
export class MerchantContactInformationPageModule { }