/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Product options component.
 */

import { ChangeDetectorRef, Component, Input, Output, EventEmitter, NgZone, ChangeDetectionStrategy } from "@angular/core";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";

import { Backend } from "@backend/index";
import { MarsAuthService } from "@services/auth.service";
import { AppConstants } from "@app/app.constants";
import { ViewController } from "ionic-angular";
import { NavParams } from "ionic-angular";

@Component({ 
    templateUrl: "mars-product-options.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
 })

export class MarsProductOptionsMenu {
    private product: any;
    private options: any;
    private events: Array<EventEmitter<any>>;
    private spinner: any;
    private token: string;
    private translations: AppTranslations;

    constructor(private viewCtrl: ViewController,
        private navParams: NavParams,
        private changeDetector: ChangeDetectorRef,
        private locales: AppLocales,
        private globals: AppGlobals,
        private interactionService: MarsInteractionService) {
        this.translations = locales.load();
        this.product = navParams.data.product;
        this.options = navParams.data.options;
        this.events = navParams.data.events;
        this.token = MarsAuthService.getMarsToken();
    }

    private isDeleted() {
        return this.product && this.product.information && this.product.information.deleted;
    }

    private emit(event: string) {
        return this.events[event].emit(this.product);
    }

    private hasListeners(event: EventEmitter<any>) {
        return this.events && event && event.observers.length > 0;
    }

    private close(data?: any) {
        this.viewCtrl.dismiss(data);
    }
}