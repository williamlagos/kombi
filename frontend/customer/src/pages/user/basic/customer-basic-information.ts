/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from "@angular/core";

import { App, IonicPage, NavController, NavParams, Platform } from "ionic-angular";

import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";

import { Backend } from "@backend/index";
import { AppUserPages } from "@pages/user-pages";

@IonicPage({
    segment: "signup/:role",
    priority: "high"
})
@Component({
    selector: "page-customer-basic-information",
    templateUrl: "customer-basic-information.html",
})

export class CustomerBasicInformationPage {
    navigationService: MarsNavigationService;
    previousStep: string;
    nextStep: string;
    translations: AppTranslations;
    userDataForm;
    showViewContent = true;
    showAddressSpinner = false;
    windowIsDesktopSized = window.innerWidth > 768;
    isAdminRequest: boolean;
    user: any = {
        payment: {},
        documents: [{}]
    };
    spinner: any;
    token: string;

    constructor(public platform: Platform,
        public app: App,
        public zone: NgZone,
        public navCtrl: NavController,
        public navParams: NavParams,
        public changeDetector: ChangeDetectorRef,
        public locales: AppLocales,
        public authService: MarsAuthService,
        public signupPages: AppUserPages,
        public globals: AppGlobals,
        public interactionService: MarsInteractionService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    ionViewWillEnter() {
        this.initialize();
    }

    ionViewDidEnter() {
        if (!this.navParams.data.role || (":role".indexOf(this.navParams.data.role) > -1))
            this.navParams.data.role = AppConstants.CUSTOMER_ROLE.toLowerCase();
        this.user.role = this.user.role || this.navParams.data.role.toUpperCase();
        setTimeout(() => { this.changeDetector.detectChanges(); }, 200);
    }

    initialize() {
        if (this.authService.isLoggedIn()) this.user = this.authService.getLoggedInUser();
        if (this.globals.currentOauthUser) this.user = this.globals.currentOauthUser;
        this.user.documents[0] = { type: "CPF", number: "" };
        // In case the user returned after starting the signup process
        this.nextStep = this.signupPages.getNextStepFor("customer", "CustomerBasicInformationPage");
        this.previousStep = this.signupPages.getPreviousStepFor("customer", "CustomerBasicInformationPage");
        if (!this.authService.finishedSignup()) this.user.signupStep = this.nextStep;
    }

    disableNextFor(form): boolean {
        return !form.valid;
    }

    async save() {
        try {
            this.spinner = this.interactionService.spinner({ content: `${this.translations.loading}...` });
            let isLoggedIn = this.authService.isLoggedIn();
            let user = isLoggedIn ? (await Backend.updateUser({ customer: this.user, xAccessToken: MarsAuthService.getMarsToken() })).data : (await Backend.createUser({ customer: this.user })).data;
            this.storeDataFor(user);
            return MarsAuthService.finishedSignup() ? this.navigationService.goBack() : this.navigationService.goTo(this.nextStep);
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            this.spinner.dismiss();
            this.changeDetector.detectChanges();
        }
    }

    storeDataFor(user) {
        MarsAuthService.setLoggedInUser(user);
        MarsAuthService.setMarsToken(user.token);
    }

    goBack() {
        this.authService.logout(() => {
            this.navigationService.setRoot(this.previousStep);
        });
    }
}
