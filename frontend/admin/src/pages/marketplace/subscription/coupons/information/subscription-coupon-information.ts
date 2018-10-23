/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from "@angular/core";

import { App, IonicPage, NavController, Platform, ViewController } from "ionic-angular";

import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";
import { MarsPictureService } from "@services/picture.service";

import { Backend } from "@backend/index";
import { AppUserPages } from "@pages/user-pages";
import { Form, NgModel } from "@angular/forms";

@IonicPage({
    segment: "subscription-coupon-information"
})
@Component({
    selector: "page-subscription-coupon-information",
    templateUrl: "subscription-coupon-information.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SubscriptionCouponInformationPage {

    CURRENCY_OPTIONS = AppConstants.CURRENCY_OPTIONS;

    viewTitle: string = "";
    navigationService: MarsNavigationService;
    translations: AppTranslations;
    coupon: any = { pictures: [], monthsAge: 1, mgWeight: 1 };

    constructor(private platform: Platform,
        private app: App,
        private navCtrl: NavController,
        private viewCtrl: ViewController,
        private zone: NgZone,
        private changeDetector: ChangeDetectorRef,
        private locales: AppLocales,
        private authService: MarsAuthService,
        private globals: AppGlobals,
        private userInformationPages: AppUserPages,
        private interactionService: MarsInteractionService,
        private pictureService: MarsPictureService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    ionViewWillEnter() {
        this.initialize();

    }

    ionViewDidEnter() {
        setTimeout(() => { this.changeDetector.detectChanges(); }, 200);
    }

    initialize() {
        this.coupon = this.viewCtrl.data || this.coupon;
        this.changeDetector.detectChanges();
    }

    async save() {
        console.log(this.coupon);
        this.dismiss(this.coupon);
    }

    close() {
        this.dismiss();
    }

    dismiss(coupon?: any) {
        this.viewCtrl.dismiss(coupon);
    }
}