/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { MerchantCalendarPage } from "./merchant-calendar";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";

@NgModule({
	declarations: [MerchantCalendarPage],
	imports: [
		IonicPageModule.forChild(MerchantCalendarPage),
		ComponentsModule,
		DirectivesModule,
		PipesModule,
	],
})
export class MerchantCalendarPageModule { }