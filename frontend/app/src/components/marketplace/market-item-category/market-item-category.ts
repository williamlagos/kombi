/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Market item category.
 */

import { Component, Input } from "@angular/core";

import { AppUserPages } from '@pages/signup-pages';

import { MarsAuthService } from "@services/auth.service";
import { AppGlobals } from "@app/app.globals";

@Component({
    selector: "market-item-category",
    templateUrl: "market-item-category.html"
})

export class MarketItemCategoryComponent {

    @Input("description") description: string;
    @Input("href") href: string;
    @Input("show-folder-icon") folderIcon: boolean;
    @Input("isOnPromotion") isOnPromotion: boolean;

    constructor() { }

    ngOnInit() { }
}
