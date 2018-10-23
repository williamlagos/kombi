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
    segment: "subscription-plans"
})
@Component({
    selector: "page-subscription-plans-list",
    templateUrl: "subscription-plans-list.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionPlansListPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;
    plans: Array<any>;
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
        this.getSubscriptionPlans();
        if (MarsAuthService.isLoggedIn()) this.token = MarsAuthService.getMarsToken();
        this.changeDetector.detectChanges();
    };

    ionViewWillEnter() { };


    async getSubscriptionPlans() {
        try {
            let plans = (await Backend.getSubscriptionPlans()).data;
            this.plans = plans;
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
            this.plans = [];
        } finally {
            this.plans.sort((a, b) => a.price - b.price);
            console.log(this.plans);
            this.changeDetector.detectChanges();
        }
    }

    async openSubscriptionPlanModal(editableSubscriptionPlan?) {
        let creationModal = this.modalCtrl.create("SubscriptionPlanInformationPage", editableSubscriptionPlan);
        creationModal.present();
        creationModal.onWillDismiss((plan) => { if (plan) this.saveSubscriptionPlan(plan); });
    }

    async togglePlan(plan) {
        let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
        try {
            let toggled = (await Backend.toggleSubscriptionPlan({ xAccessToken: this.token, planId: plan._id })).data;
            this.getSubscriptionPlans();
        } catch (e) {
            console.log(e);
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            spinner.dismiss();
            this.changeDetector.detectChanges();
        }
    }

    async saveSubscriptionPlan(plan) {
        let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
        try {
            let saved = (await Backend.saveSubscriptionPlan({ xAccessToken: this.token, plan: plan })).data;
            this.getSubscriptionPlans();
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            spinner.dismiss();
            this.changeDetector.detectChanges();
        }
    }
}