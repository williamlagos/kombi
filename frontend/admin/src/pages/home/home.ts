/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

declare var window;

import { Component, NgZone, ChangeDetectorRef } from "@angular/core";

import { App, NavController, Platform, NavParams } from "ionic-angular";
import { IonicPage } from "ionic-angular";

import { AppConstants } from "@app/app.constants";

import { MarsCartService } from "@services/cart.service";
import { MarsAuthService } from "@services/auth.service";
import { AppGlobals } from '@app/app.globals';

import { Backend } from "@backend/index";
import { IntroductionPage } from "@pages/introduction/introduction";
import { MarsNavigationService } from "@services/navigation.service";
import { MarsGeolocationService } from "@services/geolocation/geolocation.service";
import { MarsInteractionService } from "@services/interaction.service";
import { AppLocales } from "@app/app.locales";

@IonicPage({
    segment: "home"
})
@Component({
    selector: "page-home",
    templateUrl: "home.html"
})

export class HomePage {

    translations: AppTranslations;
    package: string;
    navigationService: MarsNavigationService;
    screenIsDesktopSized = window.innerWidth > 768;
    token: string;

    constructor(private platform: Platform,
        private app: App,
        private zone: NgZone,
        private changeDetector: ChangeDetectorRef,
        private globals: AppGlobals,
        private locales: AppLocales,
        private navCtrl: NavController,
        private navParams: NavParams,
        private cartService: MarsCartService,
        private interactionService: MarsInteractionService,
        private geolocationService: MarsGeolocationService) {
        this.init();
        this.translations = this.locales.load();
        this.navigationService = new MarsNavigationService(app);
        this.navigationService.setNavCtrl(this.navCtrl);
        platform.ready().then(() => {
            if (window.cordova) {
                window.StatusBar.show();
                window.StatusBar.backgroundColorByHexString(AppConstants.DARKER_SECONDARY_COLOR);
            }
        });
    }

    ionViewDidLoad() {
        let isFirstAccess = MarsAuthService.isLoggedIn() && !localStorage[IntroductionPage.INTRODUCTION_STATUS];
        if (isFirstAccess) this.navigationService.setRoot("IntroductionPage");
    }

    ionViewWillEnter() { }

    async init() {
        if (MarsAuthService.isLoggedIn()) {
            this.token = MarsAuthService.getMarsToken();
            /* MarsSocket.connect(AppConstants.SOCKET_SERVER_ADDRESS); */
            await this.refreshUser();
            if (MarsAuthService.hasRole("MERCHANT")) this.initMerchant();
            if (MarsAuthService.hasRole("CUSTOMER")) this.initCustomer();
            this.changeDetector.detectChanges();
        }
    }

    initMerchant() {
        let user = MarsAuthService.getLoggedInUser();
        if (user.payment && user.payment.hasDelayedPayments) this.interactionService.alert(this.translations.whoops_you_have_delayed_payments);
        /* MarsSocket.on('connect', () => {
            this.refreshNotifications();
            MarsSocket.join(user._id);
            MarsSocket.on('new order', async (notification) => {
                await this.getPendingOrders();
                await this.refreshNotifications();
                this.changeDetector.detectChanges();
            });
            MarsSocket.on('notifications update', async (notification) => await this.refreshNotifications());
        }); */
    }

    async initCustomer() {
        this.cartService.load();
        /* MarsSocket.on('connect', () => {
            this.refreshNotifications();
            MarsSocket.join(MarsAuthService.getLoggedInUser()._id);
            MarsSocket.on('order review', async (notification) => await this.refreshNotifications());
            MarsSocket.on('notifications update', async (notification) => await this.refreshNotifications());
        }); */
        this.getPendingOrders();
    }

    async getPendingOrders() {
        this.zone.run(async () => {
            try {
                let pendingOrders = (await Backend.getOrders({ xAccessToken: this.token, status: "created" })).data;
                if (pendingOrders.length > 0) {
                    this.globals.hasPendingOrders = true;
                }
            } catch (e) {

            } finally {
                this.changeDetector.detectChanges();
            }
        });
    }

    async refreshUser() {
        return new Promise(async (resolve, reject) => {
            try {
                let user = (await Backend.getUserProfile({ xAccessToken: this.token })).data;
                MarsAuthService.setLoggedInUser(user);
                MarsAuthService.setMarsToken(user.token);
                if (!MarsAuthService.finishedSignup()) this.navigationService.setRoot(user.signupStep);
                resolve();
            } catch (e) {
                resolve();
            }
        });
    }

    async refreshNotifications() {
        this.zone.run(async () => {
            try {
                this.globals.notifications = (await Backend.getNotifications({ xAccessToken: this.token })).data;
                this.vibrate();
            } catch (e) {

            } finally {
                this.changeDetector.detectChanges();
            }
        });

    }

    vibrate() {
        /* if (this.platform.is('cordova')) this.vibration.vibrate(500); */
    }
}
