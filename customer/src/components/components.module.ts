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

// Marketplace
import { MarketItemCategoryComponent } from "./marketplace/market-item-category/market-item-category";
import { MarsProductComponent } from "./mars-product/mars-product";
import { MarsProductOptionsMenu } from "./mars-product/options/mars-product-options";
import { MarsBankAccountCardComponent } from './mars-bank-account-card/mars-bank-account-card';
import { MarsRecipeComponent } from './mars-recipe/mars-recipe';
import { MarsRecipeOptionsMenu } from './mars-recipe/options/mars-recipe-options';
import { MarsFreightStopComponent } from './mars-freight-stop/mars-freight-stop';

@NgModule({
    entryComponents: [MarsProductOptionsMenu, MarsRecipeOptionsMenu],
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
        MarsRecipeComponent,
        MarsRecipeOptionsMenu,
        MarsCreditCardComponent,
        MarsBankAccountCardComponent,
        MarsFreightStopComponent,
    ],
    exports: [
        MarsAssistantComponent,
        MarsNavbarComponent,
        MarsSignupProgressComponent,
        MarsTranslatableComponent,
        MarsViewSpinnerComponent,
        MarketItemCategoryComponent,
        MarsProductComponent,
        MarsRecipeComponent,
        MarsRecipeOptionsMenu,
        MarsCreditCardComponent,
        MarsBankAccountCardComponent,
        MarsFreightStopComponent
    ]
})
export class ComponentsModule { }