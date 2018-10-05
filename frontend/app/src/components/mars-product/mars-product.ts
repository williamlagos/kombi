/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Product component.
 */

import { Component } from "@angular/core";
import { Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { NgZone } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { PopoverController } from "ionic-angular";
import { NavController } from "ionic-angular";

import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsNavigationService } from "@services/navigation.service";
import { MarsPictureService } from "@services/picture.service";
import { MarsProductOptionsMenu } from "./options/mars-product-options";


@Component({
    selector: "mars-product",
    templateUrl: "mars-product.html",
    styles: [`
        :host ion-item {
            border-bottom: 0px;
        }
    `]
})

export class MarsProductComponent {

    translations: AppTranslations;

    @Input("product") product: any;
    @Input("options") options: any;

    // ---------------- Add product
    @Output() add: EventEmitter<any> = new EventEmitter();

    // ---------------- Save product
    @Output() save: EventEmitter<any> = new EventEmitter();

    // ---------------- Read product
    @Output() view: EventEmitter<any> = new EventEmitter();

    // ---------------- Edit product
    @Output() edit: EventEmitter<any> = new EventEmitter();

    // ---------------- Remove product
    @Output() remove: EventEmitter<any> = new EventEmitter();

    // ---------------- Toggle product
    @Output() deactivate: EventEmitter<any> = new EventEmitter();
    @Output() activate: EventEmitter<any> = new EventEmitter();

    @Output() increment: EventEmitter<any> = new EventEmitter();
    @Output() decrement: EventEmitter<any> = new EventEmitter();

    @Output() blur: EventEmitter<any> = new EventEmitter();

    CURRENCY_OPTIONS = AppConstants.CURRENCY_OPTIONS;

    constructor(public zone: NgZone,
        public changeDetector: ChangeDetectorRef,
        public popoverCtrl: PopoverController,
        public navCtrl: NavController,
        public globals: AppGlobals,
        public locales: AppLocales,
        public pictureService: MarsPictureService) {
        this.translations = this.locales.load();
    }

    ngOnInit() {
        this.changeDetector.detectChanges();
        this.options = this.options || {};
        if (this.options.transform) {
            this.product = this.options.transform(this.product);
        }
    }

    formatPrice(price) {
        price = parseFloat(price);
        return price && price.toFixed ? (price.toFixed(2).split(".")[0]).concat(",").concat(price.toFixed(2).split(".")[1]) : "";
    }

    showItemLeft() {
        return (this.options.showDiscountTag && this.product.discountPrice) || this.options.showPicture
    }

    getQuantityFor(product: any) {
        if (!product.quantity)
            return this.translations.add;
        else
            return product.quantity + " " + (product.quantity && product.quantity == 1 ? this.translations.unity : this.translations.unities);
    }

    showQuantityButtons() {
        return (this.options.showDecreaseButton ? this.options.showDecreaseButton(this.product) : (this.decrement.observers.length > 0)) || (this.options.showIncreaseButton ? this.options.showIncreaseButton(this.product) : (this.increment.observers.length > 0));
    }

    showInventoryOptions() {
        return this.remove.observers.length > 0 || this.add.observers.length > 0 || this.save.observers.length > 0;
    }

    showCatalogueOptions() {
        return this.edit.observers.length > 0 || this.activate.observers.length > 0 || this.deactivate.observers.length > 0;
    }

    isDeleted() {
        return this.product && this.product.information && this.product.information.deleted;
    }

    showOptionsFor($event, product) {
        let popover = this.popoverCtrl.create(MarsProductOptionsMenu, {
            product: product,
            options: this.options,
            events: {
                add: this.add,
                save: this.save,
                edit: this.edit,
                deactivate: this.deactivate,
                activate: this.activate
            }
        });
        popover.present({ ev: $event });
        popover.onDidDismiss((data) => { });
    }
}
