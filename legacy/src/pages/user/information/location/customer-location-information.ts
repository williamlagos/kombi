/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from "@angular/core";

import { App, IonicPage, NavController, Platform } from "ionic-angular";

import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";

import { MarsAddressAutocompleteDirective } from "@directives/mars-address-autocomplete";

import { Backend } from "@backend/index";
import { MarsGeolocationService } from "@services/geolocation/geolocation.service";
import { AppUserPages } from "@pages/user-pages";
import { MarsGeocoderService } from "@services/geolocation/geocoder.service";

@IonicPage({
    segment: "usr-location-information"
})
@Component({
    selector: "page-customer-location-information",
    templateUrl: "customer-location-information.html",
    changeDetection: ChangeDetectionStrategy.Default
})

export class CustomerLocationInformationPage {

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
    user: any = {
        role: AppConstants.CUSTOMER_ROLE,
        address: {},
        payment: {},
        documents: []
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
        private interactionService: MarsInteractionService,
        private geocoderService: MarsGeocoderService,
        private geolocationService: MarsGeolocationService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
        this.initGeolocation();
    }

    ionViewWillEnter() {
        if (this.authService.isLoggedIn())
            this.user = this.authService.getLoggedInUser();

        this.nextStep = this.userInformationPages.getNextStepFor(this.user.roles, "CustomerLocationInformationPage");
        this.previousStep = this.userInformationPages.getPreviousStepFor(this.user.roles, "CustomerBasicInformationPage");
        if (!this.authService.finishedSignup()) this.user.signupStep = this.nextStep;
    }

    ionViewDidEnter() {
        setTimeout(() => { this.changeDetector.detectChanges(); }, 200);
    }

    initGeolocation() {
        MarsGeolocationService.onLoad(() => {
            this.isReady = true;
        });
    }


    onAddressSelected(address) {
        address.complement = this.user.address.complement || "";
        if (!address.streetNumber) return this.interactionService.alert(this.translations.whoops_the_address_must_contain_the_street_number);;
        this.user.address = address;
        this.changeDetector.detectChanges();
    }

    disableNextFor(element): boolean {
        return element.form.status !== "VALID";
    }

    async getCoordinates() {
        return new Promise(async (resolve, reject) => {
            let address = this.user.address;
            let stringified = "";
            for (var property in address) {
                stringified += ` ${address[property]}`;
            };
            try {
                let coordinates = await this.geocoderService.addressToCoordinates(stringified);
                resolve(coordinates);
            } catch (e) {
                this.interactionService.alert(this.translations.we_were_unable_to_locate_your_address);
            }
        });
    };

    async save() {
        try {
            this.spinner = this.interactionService.spinner({ content: `${this.translations.loading}...` });
            if (!this.user.address.location) this.user.address.location = await this.getCoordinates();
            let isLoggedIn = this.authService.isLoggedIn();
            let user = isLoggedIn ? (await Backend.updateUser({ user: this.user, xAccessToken: MarsAuthService.getMarsToken() })).data : (await Backend.createUser({ user: this.user })).data;
            this.storeDataFor(user);
            setTimeout(() => {
                return MarsAuthService.finishedSignup() ? this.navigationService.goBack() : this.navigationService.setRoot("HomePage");
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
