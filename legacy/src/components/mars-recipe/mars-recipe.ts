/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description recipe component.
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
import { MarsRecipeOptionsMenu } from "./options/mars-recipe-options";

@Component({
    selector: "mars-recipe",
    templateUrl: "mars-recipe.html",
    styles: [`
        :host ion-item {
            border-bottom: 0px;
        }
    `]
})

export class MarsRecipeComponent {

    translations: AppTranslations;

    @Input("recipe") recipe: any;
    @Input("options") options: any;

    // ---------------- Add recipe
    @Output() add: EventEmitter<any> = new EventEmitter();

    // ---------------- Save recipe
    @Output() save: EventEmitter<any> = new EventEmitter();

    // ---------------- Read recipe
    @Output() view: EventEmitter<any> = new EventEmitter();

    // ---------------- Edit recipe
    @Output() edit: EventEmitter<any> = new EventEmitter();

    // ---------------- Remove recipe
    @Output() remove: EventEmitter<any> = new EventEmitter();

    // ---------------- Toggle recipe
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
            this.recipe = this.options.transform(this.recipe);
        }
    }

    formatPrice(price) {
        price = parseFloat(price);
        return price && price.toFixed ? (price.toFixed(2).split(".")[0]).concat(",").concat(price.toFixed(2).split(".")[1]) : "";
    }

    showItemLeft() {
        return (this.options.showDiscountTag && this.recipe.discountPrice) || this.options.showPicture
    }

    getQuantityFor(recipe: any) {
        if (!recipe.quantity)
            return this.translations.add;
        else
            return recipe.quantity + " " + (recipe.quantity && recipe.quantity == 1 ? this.translations.unity : this.translations.unities);
    }

    showQuantityButtons() {
        return (this.options.showDecreaseButton ? this.options.showDecreaseButton(this.recipe) : (this.decrement.observers.length > 0)) || (this.options.showIncreaseButton ? this.options.showIncreaseButton(this.recipe) : (this.increment.observers.length > 0));
    }

    showInventoryOptions() {
        return this.remove.observers.length > 0 || this.add.observers.length > 0 || this.save.observers.length > 0;
    }

    showCatalogueOptions() {
        return this.edit.observers.length > 0 || this.activate.observers.length > 0 || this.deactivate.observers.length > 0;
    }

    isDeleted() {
        return this.recipe && this.recipe.information && this.recipe.information.deleted;
    }

    showOptionsFor($event, recipe) {
        let popover = this.popoverCtrl.create(MarsRecipeOptionsMenu, {
            recipe: recipe,
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
