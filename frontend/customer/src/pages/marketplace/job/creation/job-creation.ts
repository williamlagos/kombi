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
import flatpickr from "flatpickr";
import { Backend } from "@backend/index";
import { MarsAddressAutocompleteDirective } from "@directives/mars-address-autocomplete";
import { AppConstants } from "@app/app.constants";
import { MarsSocket } from "@app/app.socket";

@IonicPage({
    segment: "job-creation",
    priority: "high"
})
@Component({
    selector: "page-job-creation",
    templateUrl: "job-creation.html",
})
export class JobCreationPage {

    segment: string = "ORIGIN";
    navigationService: MarsNavigationService;
    translations: AppTranslations;
    pickr: any;
    jobDate: string;
    jobTime: string;
    token: string;
    merchant: any;
    waiting: boolean;
    receivingModes: Array<any>;
    paymentModes: Array<any>;
    CURRENCY_OPTIONS = AppConstants.CURRENCY_OPTIONS;

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

    ionViewWillEnter() {
        this.initialize();
    };

    initialize() {
        if (this.globals.isPlacingOrder) this.segment == "FINISH";
        else this.initOrder();
    };

    onSegmentChange() {
        if (this.segment == "FINISH" && !this.pickr) {
            setTimeout(() => { this.initDateInputs(); }, 100);
        }
    }

    initDateInputs() {
        this.pickr = flatpickr(".flatpickr", {
            minDate: "today", enableTime: true, altInput: true,
            altFormat: "d/m H:i",
            time_24hr: true,
            onChange: (values) => { this.globals.currentOrder.job.scheduledTo = values[0] }
        });
    }


    initOrder() {
        this.globals.currentOrder.job.scheduledTo = {};
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

    showDestination() {
        if (this.globals.currentOrder && this.globals.currentOrder.job && this.globals.currentOrder.job.origin && this.globals.currentOrder.job.origin.items)
            this.globals.currentOrder.job.origin.items = this.globals.currentOrder.job.origin.items.filter((item) => { return item && item.description; });
        this.segment = "DESTINATION";
        this.changeDetector.detectChanges();
    }

    showFinalSegment() {
        if (MarsAuthService.isLoggedIn()) {
            this.segment = "FINISH";
            this.changeDetector.detectChanges();
        } else {
            this.redirectToAuthPage();
        }
    };

    parseRideDate() {
        let rideDate = this.globals.currentOrder.job.date;
        let rideTime = this.globals.currentOrder.job.time;
        let parsedDate = new Date();
        parsedDate.setDate(parseInt(rideDate.split("/")[0]) + -1);
        parsedDate.setDate(parseInt(rideDate.split("/")[1]) + -1);
        parsedDate.setHours(parseInt(rideTime.split(":")[0]));
        parsedDate.setMinutes(parseInt(rideTime.split(":")[1]));
        return parsedDate;
    }

    async placeOrder() {
        if (!MarsAuthService.isLoggedIn()) return this.redirectToAuthPage();
        try {
            let token = MarsAuthService.getMarsToken();
            this.globals.currentOrder.job.scheduledTo = this.parseRideDate();
            this.waiting = true;
            let order = (await Backend.createOrder({ order: this.globals.currentOrder, xAccessToken: token })).data;
            MarsSocket.emit('join', MarsAuthService.getLoggedInUser()._id);
            this.finishOrder();
        } catch (e) {
            console.log(e);
            this.waiting = false;
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            this.changeDetector.detectChanges();
        }
    }

    async finishOrder() {
        this.zone.run(() => {
            this.interactionService.alert(this.translations.your_order_has_been_confirmed, () => {
                setTimeout(() => {
                    this.waiting = false;
                    this.globals.isPlacingOrder = false;
                    this.globals.disableNavigation = false;
                    window.location.hash = "#";
                    window.location.reload();
                }, 500);
            });
        });
    };

    redirectToAuthPage() {
        this.interactionService.alert(this.translations.you_must_be_authenticated_to_finish_the_order, () => {
            setTimeout(() => {
                this.globals.isPlacingOrder = true;
                this.navigationService.setRoot("LoginPage", { token: "access" });
            }, 500);
        })
    }

    goToOrderPage() {
        this.navigationService.goTo("OrderCreationPage");
    };
}
