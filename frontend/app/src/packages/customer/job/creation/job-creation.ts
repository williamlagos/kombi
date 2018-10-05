/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from "@angular/core";

import { App, IonicPage, NavController, Platform } from "ionic-angular";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";
import { MarsAuthService } from "@services/auth.service";
import { Backend } from "@backend/index";
import { MarsAddressAutocompleteDirective } from "@directives/mars-address-autocomplete";

@IonicPage({
    segment: "job-creation",
    priority: "high"
})
@Component({
    selector: "page-job-creation",
    templateUrl: "job-creation.html",
})
export class JobCreationPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;
    showDestination: boolean = false;

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public zone: NgZone,
        public changeDetector: ChangeDetectorRef,
        public locales: AppLocales,
        public globals: AppGlobals,
        public interactionService: MarsInteractionService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    ionViewDidLoad() {
        if (this.globals.isPlacingOrder) this.navigationService.goTo("OrderCreationPage");
        else this.initOrder();
    }

    ionViewWillEnter() {
        this.initialize();
    };

    initialize() { };


    initOrder() {
        this.createStop(this.globals.currentOrder.job.origin.address, true);
    };

    createStop(address?: any, isOrigin?: boolean) {
        let stop = {
            address: address || {},
            items: [{
                description: '', quantity: 1
            }]
        };
        if (isOrigin) this.globals.currentOrder.job.origin = stop;
        else this.globals.currentOrder.job.stops.push(stop);
        console.log(this.globals.currentOrder);
    };

    disableSubmit() {
        return !this.globals.currentOrder.job.destination || !this.globals.currentOrder.job.destination.address || !this.globals.currentOrder.job.destination.address.number;
    };

    order() {
        if (this.globals.currentOrder && this.globals.currentOrder.job && this.globals.currentOrder.job.origin && this.globals.currentOrder.job.origin.items)
            this.globals.currentOrder.job.origin.items = this.globals.currentOrder.job.origin.items.filter((item) => { return item && item.description; });
        if (MarsAuthService.isLoggedIn()) {
            this.goToOrderPage();
        } else {
            this.interactionService.alert(this.translations.you_must_be_authenticated_to_finish_the_order, () => {
                this.globals.isPlacingOrder = true;
                this.navigationService.setRoot("LoginPage", { token: "access" });
            })
        }
    };

    goToOrderPage() {
        this.navigationService.goTo("OrderCreationPage");
    };
}
