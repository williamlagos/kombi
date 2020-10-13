/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { NgModule } from "@angular/core";
import { UsersListPage } from "./users-list";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "@components/components.module";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";
import { UserOptionsMenuModule } from "./user-options/user-options.module";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [UsersListPage],
  imports: [
    IonicPageModule.forChild(UsersListPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    UserOptionsMenuModule,
    NgxPaginationModule
  ]
})
export class UsersListPageModule { }