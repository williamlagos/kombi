/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Applications pipe modules.
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { FromNowPipe } from "./from-now";
import { LimitToPipe } from "./limit-to";
import { OrderByPipe } from "./order-by";
import { SafePipe } from "./safe";

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [FromNowPipe, LimitToPipe, OrderByPipe, SafePipe],
    exports: [FromNowPipe, LimitToPipe, OrderByPipe, SafePipe]
})
export class PipesModule { }