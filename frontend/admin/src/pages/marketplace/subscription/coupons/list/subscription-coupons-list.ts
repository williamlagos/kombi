/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from "@angular/core";

import { App, IonicPage, NavController, Platform, ModalController } from "ionic-angular";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";
import { MarsAuthService } from "@services/auth.service";
import { Backend } from "@backend/index";
import { PaginationInstance } from "ngx-pagination";
import { MarsGeolocationService } from "@services/geolocation/geolocation.service";
import { MarsPictureService } from "@services/picture.service";
import { MarsAddressAutocompleteDirective } from "@directives/mars-address-autocomplete";

@IonicPage({
    segment: "subscription-coupons"
})
@Component({
    selector: "page-subscription-coupons-list",
    templateUrl: "subscription-coupons-list.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionCouponsListPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;
    coupons: Array<any>;
    token: string;

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public changeDetector: ChangeDetectorRef,
        public locales: AppLocales,
        public zone: NgZone,
        public globals: AppGlobals,
        public authService: MarsAuthService,
        public geolocationService: MarsGeolocationService,
        public interactionService: MarsInteractionService,
        public pictureService: MarsPictureService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    async ionViewDidLoad() {
        this.getSubscriptionCoupons();
        if (MarsAuthService.isLoggedIn()) this.token = MarsAuthService.getMarsToken();
        this.changeDetector.detectChanges();
    };

    ionViewWillEnter() { };


    async getSubscriptionCoupons() {
        try {
            let coupons = (await Backend.getSubscriptionCoupons()).data;
            this.coupons = coupons;
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
            this.coupons = [];
        } finally {
            this.coupons.sort((a, b) => a.price - b.price);
            console.log(this.coupons);
            this.changeDetector.detectChanges();
        }
    }

    async openSubscriptionCouponModal(editableSubscriptionCoupon?) {
        let creationModal = this.modalCtrl.create("SubscriptionCouponInformationPage", editableSubscriptionCoupon);
        creationModal.present();
        creationModal.onWillDismiss((coupon) => { if (coupon) this.saveSubscriptionCoupon(coupon); });
    }

    async toggleCoupon(coupon) {
        let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
        try {
            let toggled = (await Backend.toggleSubscriptionCoupon({ xAccessToken: this.token, couponId: coupon._id })).data;
            this.getSubscriptionCoupons();
        } catch (e) {
            console.log(e);
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            spinner.dismiss();
            this.changeDetector.detectChanges();
        }
    }

    async saveSubscriptionCoupon(coupon) {
        let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
        try {
            let saved = (await Backend.saveSubscriptionCoupon({ xAccessToken: this.token, coupon: coupon })).data;
            this.getSubscriptionCoupons();
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            spinner.dismiss();
            this.changeDetector.detectChanges();
        }
    }
}