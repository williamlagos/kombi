/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from "@angular/core";

import { App, IonicPage, NavController, Platform } from "ionic-angular";

import * as moment from "moment-mini";

import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";

import { Backend } from "@backend/index";
import { AppUserPages } from "@pages/user-pages";

@IonicPage({
    segment: "user-profile-information"
})
@Component({
    selector: "page-customer-profile-information",
    templateUrl: "customer-profile-information.html",
    changeDetection: ChangeDetectionStrategy.Default
})

export class CustomerProfileInformationPage {

    navigationService: MarsNavigationService;
    previousStep: string;
    nextStep: string;
    translations: AppTranslations;
    userDataForm;
    isReady: boolean;
    showAddressSpinner = false;
    windowIsDesktopSized = window.innerWidth > 768;
    spinner: any;
    currentGooglePlace: any;
    birthDate: string;
    user: any = {
        role: AppConstants.CUSTOMER_ROLE,
        address: {},
        payment: {},
        documents: [{}],
        birthDate: new Date()
    };

    constructor(private platform: Platform,
        private app: App,
        private navCtrl: NavController,
        private zone: NgZone,
        private changeDetector: ChangeDetectorRef,
        private locales: AppLocales,
        private authService: MarsAuthService,
        private userInformationPages: AppUserPages,
        private globals: AppGlobals,
        private interactionService: MarsInteractionService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    ionViewWillEnter() {
        if (this.authService.isLoggedIn()) {
            this.user = this.authService.getLoggedInUser();
            this.birthDate = new Date(this.user.birthDate).toLocaleDateString("pt-BR");
        }
        if (!this.user.documents[0]) this.user.documents[0] = {};
        if (!this.user.birthDate) this.user.birthDate = new Date();
        
        this.nextStep = this.userInformationPages.getNextStepFor(this.user.roles, "CustomerProfileInformationPage");
        this.previousStep = this.userInformationPages.getPreviousStepFor(this.user.roles, "CustomerProfileInformationPage");
        if (!this.authService.finishedSignup()) this.user.signupStep = this.nextStep;
    }

    ionViewDidEnter() {
        setTimeout(() => { this.changeDetector.detectChanges(); }, 200);
    }

    disableNextFor(element): boolean {
        return element.form.status !== "VALID";
    }

    async save() {
        try {
            this.spinner = this.interactionService.spinner({ content: `${this.translations.loading}...` });
            this.user.birthDate = moment(this.birthDate, "DD-MM-YYYY", "pt-BR").toDate();
            let isLoggedIn = this.authService.isLoggedIn();
            let user = isLoggedIn ? (await Backend.updateUser({ user: this.user, xAccessToken: MarsAuthService.getMarsToken() })).data : (await Backend.createUser({ user: this.user })).data;
            this.storeDataFor(user);
            setTimeout(() => {
                return MarsAuthService.finishedSignup() ? this.navigationService.goBack() : this.navigationService.goTo(this.nextStep);
            }, 500);
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            this.spinner.dismiss();
            this.changeDetector.detectChanges();
        }
    }

    stepToast() {
        let message = MarsAuthService.isLoggedIn() ? this.translations.signup_completed_successfully : this.translations.welcome;
        this.interactionService.toast(message, MarsInteractionService.LONG_TOAST_DURATION);
    }

    storeDataFor(user) {
        MarsAuthService.setLoggedInUser(user);
        MarsAuthService.setMarsToken(user.token);
    }

    goBack() {
        this.navigationService.setRoot(this.previousStep);
    }
}
