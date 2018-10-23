/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectorRef, ChangeDetectionStrategy, NgZone, ViewChild, ElementRef } from "@angular/core";

import { App, NavController, Platform, IonicPage, ModalController } from "ionic-angular";

import flatpickr from "flatpickr";

import { MyApp } from "@app/app.component";
import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";

import { Backend } from "@backend/index";

import { MarsSocket } from "@app/app.socket";
import { MarsAddressAutocompleteDirective } from '@directives/mars-address-autocomplete';
import { MarsGeolocationService } from '@services/geolocation/geolocation.service';

@IonicPage({ priority: "high" })
@Component({
    selector: "page-order-creation",
    templateUrl: "order-creation.html",
})

export class OrderCreationPage {

    jobDate: string;
    jobTime: string;
    navigationService: MarsNavigationService;
    translations: AppTranslations;
    token: string;
    merchant: any;
    waiting: boolean;
    order: any = {
        items: [],
        amount: 0,
        payload: {
            receiptAddress: {}
        }
    };
    receivingModes: Array<any>;
    paymentModes: Array<any>;
    CURRENCY_OPTIONS = AppConstants.CURRENCY_OPTIONS;

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public zone: NgZone,
        public changeDetector: ChangeDetectorRef,
        public globals: AppGlobals,
        public locales: AppLocales,
        public socket: MarsSocket,
        public authService: MarsAuthService,
        public interactionService: MarsInteractionService) {
        this.navigationService = new MarsNavigationService(this.app as any);
        this.navigationService.setNavCtrl(this.navCtrl as any);
        this.translations = this.locales.load();
    }

    ionViewWillEnter() {
        /* if(!this.globals.currentOrder.job.origin.address.street) return this.navigationService.goTo("JobCreationPage"); */
        if (MarsAuthService.isLoggedIn()) this.initialize();
    }

    ionViewDidEnter() {
        this.initDateInputs();
    }

    async initialize() {
        let user = MarsAuthService.getLoggedInUser();
        this.token = MarsAuthService.getMarsToken();
        this.globals.currentOrder.customer = MarsAuthService.getLoggedInUser()._id;
        this.getPaymentModes();
        this.initSocket();
    }

    initDateInputs() {
        let pickr = flatpickr(".flatpickr", {
            minDate: "today", enableTime: true, altInput: true,
            altFormat: "d/m H:i",
            time_24hr: true,
            onChange: (values) => { this.globals.currentOrder.job.scheduledTo = values[0] }
        });
    }

    initSocket() {
        MarsSocket.emit('join', MarsAuthService.getLoggedInUser()._id);
        MarsSocket.on('order review', (notification) => {
            navigator.vibrate(500);
            MarsSocket.emit('notification read', notification);
        });
    }

    geolocationIsReady() {
        return MarsGeolocationService.isReady();
    }

    async getPaymentModes() {
        try {
            this.paymentModes = (await Backend.getPaymentModes()).data;
            console.log(this.paymentModes);
        } catch (e) {
            console.log(e);
            this.interactionService.alert(this.translations.server_failure);
            this.navigationService.goBack();
        } finally {
            this.changeDetector.detectChanges();
        }
    };


    async placeOrder() {
        try {
            this.waiting = true;
            let order = (await Backend.createOrder({ order: this.globals.currentOrder, xAccessToken: this.token })).data;
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
            this.interactionService.alert(this.translations.your_order_has_been_confirmed);
            this.waiting = false;
            this.globals.isPlacingOrder = false;
            this.globals.disableNavigation = false;
            this.navigationService.setRoot("HomePage");
        });
    }
}
