/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from "@angular/core";

import { App, IonicPage, NavController, Platform } from "@ionic/angular";

import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";
import { MarsPictureService } from "@services/picture.service";

import { Backend } from "@backend/index";
import { AppUserPages } from "@pages/user-pages";

@IonicPage({
    priority: "high"
})
@Component({
    selector: "page-merchant-basic-information",
    templateUrl: "merchant-basic-information.html",
})
export class MerchantBasicInformationPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;
    previousStep: string;
    nextStep: string;
    userDataForm;
    spinner: any;
    user: any = {
        role: AppConstants.MERCHANT_ROLE,
        address: {},
        paymentData: {},
        documents: [{}],
        pictures: []
    };

    showAddressSpinner = false;
    currentGooglePlace: any;

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public zone: NgZone,
        public changeDetector: ChangeDetectorRef,
        public locales: AppLocales,
        public authService: MarsAuthService,
        public globals: AppGlobals,
        public signupPages: AppUserPages,
        public interactionService: MarsInteractionService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    ionViewWillEnter() {
        // In case the user is logged in
        if (this.authService.isLoggedIn()) this.user = this.authService.getLoggedInUser();
        else this.user.roles = [AppConstants.MERCHANT_ROLE];
        // In case the user returned after starting the signup process
        this.nextStep = this.signupPages.getNextStepFor(this.user.roles, "MerchantBasicInformationPage");
        this.previousStep = this.signupPages.getPreviousStepFor(this.user.roles, "MerchantBasicInformationPage");
        if (!this.authService.finishedSignup()) this.user.signupStep = this.nextStep;
    }

    ionViewDidEnter() {
        setTimeout(() => { this.changeDetector.detectChanges(); }, 200);
    }

    disableNextFor(form): boolean {
        return !form.valid || !this.user || !this.user.acceptedTerms;
    }

    async save() {
        try {
            this.spinner = this.interactionService.spinner({ content: `${this.translations.loading}...` });
            let isLoggedIn = this.authService.isLoggedIn();
            let user = isLoggedIn ? (await Backend.updateUser({ user: this.user, xAccessToken: MarsAuthService.getMarsToken() })).data : (await Backend.createUser({ user: this.user })).data;
            if (!MarsAuthService.finishedSignup()) this.interactionService.alert(this.translations.congrats_your_profile_has_been_created);
            this.storeDataFor(user);
            return MarsAuthService.finishedSignup() ? this.navigationService.goBack() : this.navigationService.goTo(this.nextStep);
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            this.changeDetector.detectChanges();
            this.spinner.dismiss();
        }
    }

    storeDataFor(user) {
        MarsAuthService.setLoggedInUser(user);
        MarsAuthService.setMarsToken(user.token);
    }

    goBack() {
        this.authService.logout(() => {
            this.navigationService.setRoot(this.previousStep, { token: 'access' });
        });
    }
}