/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Application components module.
 */

import { MarsCreditCardComponent } from './mars-credit-card/mars-credit-card';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";

import { PipesModule } from "@pipes/pipes.module";
import { DirectivesModule } from "@directives/directives.module";

import { MarsAssistantComponent } from "./mars-assistant/mars-assistant";
import { MarsNavbarComponent } from "./mars-navbar/mars-navbar";
import { MarsSignupProgressComponent } from "./mars-signup-progress/mars-signup-progress";
import { MarsTranslatableComponent } from "./mars-translatable/mars-translatable";
import { MarsViewSpinnerComponent } from "./mars-view-spinner/mars-view-spinner";

import { Ionic2RatingModule } from "ionic2-rating/dist/ionic2-rating.module";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxMaskModule } from 'ngx-mask';


import { MarketItemCategoryComponent } from "./marketplace/market-item-category/market-item-category";
import { MarsProductComponent } from "./mars-product/mars-product";
import { MarsProductOptionsMenu } from "./mars-product/options/mars-product-options";
import { MarsBankAccountCardComponent } from './mars-bank-account-card/mars-bank-account-card';

@NgModule({
    entryComponents: [MarsProductOptionsMenu],
    imports: [
        CommonModule,
        IonicModule,
        PipesModule,
        DirectivesModule,
        Ionic2RatingModule,
        CurrencyMaskModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [
        MarsAssistantComponent,
        MarsNavbarComponent,
        MarsSignupProgressComponent,
        MarsTranslatableComponent,
        MarsViewSpinnerComponent,
        
        MarketItemCategoryComponent,
        MarsProductComponent,
        MarsProductOptionsMenu,
        MarsCreditCardComponent,
        MarsBankAccountCardComponent
    ],
    exports: [
        MarsAssistantComponent,
        MarsNavbarComponent,
        MarsSignupProgressComponent,
        MarsTranslatableComponent,
        MarsViewSpinnerComponent,
        
        MarketItemCategoryComponent,
        MarsProductComponent,
        MarsCreditCardComponent,
        MarsBankAccountCardComponent
    ]
})
export class ComponentsModule { }