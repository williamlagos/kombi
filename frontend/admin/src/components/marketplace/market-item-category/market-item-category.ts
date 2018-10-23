/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Market item category.
 */

import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";

@Component({
    selector: "market-item-category",
    templateUrl: "market-item-category.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MarketItemCategoryComponent {

    @Input("description") description: string;
    @Input("href") href: string;
    @Input("show-folder-icon") folderIcon: boolean;
    @Input("isOnPromotion") isOnPromotion: boolean;

    constructor(private changeDetector: ChangeDetectorRef) { }

    ngOnInit() { }
}
