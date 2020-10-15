/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { TermsOfUsePage } from "./terms-of-use";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";

@NgModule({
  declarations: [TermsOfUsePage],
  imports: [
    IonicPageModule.forChild(TermsOfUsePage),
    ComponentsModule,
    DirectivesModule,
    PipesModule
  ],
})
export class TermsOfUsePageModule { }