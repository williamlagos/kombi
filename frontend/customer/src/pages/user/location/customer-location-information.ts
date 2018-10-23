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

@IonicPage({ priority: "high" })
@Component({
    selector: "page-customer-location-information",
    templateUrl: "customer-location-information.html",
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

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public zone: NgZone,
        public changeDetector: ChangeDetectorRef,
        public locales: AppLocales,
        public authService: MarsAuthService,
        public signupPages: AppUserPages,
        public globals: AppGlobals,
        public interactionService: MarsInteractionService,
        public geocoderService: MarsGeocoderService,
        public geolocationService: MarsGeolocationService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
        this.initGeolocation();
    }

    ionViewWillEnter() {
        if (this.authService.isLoggedIn())
            this.user = this.authService.getLoggedInUser();
        // In case the user returned after starting the signup process
        this.nextStep = this.signupPages.getNextStepFor("customer", "CustomerLocationInformationPage");
        this.previousStep = this.signupPages.getPreviousStepFor("customer", "CustomerBasicInformationPage");
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


    onAddressSelected($event) {
        this.showAddressSpinner = false;
        let complement = this.user.address.complement; // Keep user complement through the changes
        let place: google.maps.places.PlaceResult = $event.place;
        let address: any = {};
        /* let address: any = MarsAddressAutocompleteDirective.getAddressFromPlace(place);*/
        this.zone.run(() => {
            let rawAddress = place.address_components;
            address.googlePlace = this.currentGooglePlace = rawAddress;
            let streetNumber = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "street_number");
            if (!streetNumber) return alert("Ops! Por favor, informe o endereço com número ;)");

            /* Parses address */
            address.location = MarsAddressAutocompleteDirective.getPlaceLatLng(place);
            address.street = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "route") + ", " + streetNumber;
            address.number = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "street_number");
            address.neighbourhood = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "sublocality");
            address.city = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "administrative_area_level_2");
            address.state = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "administrative_area_level_1");
            address.country = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "country");
            address.postalCode = MarsAddressAutocompleteDirective.getAddressElement(rawAddress, "postal_code");
            address.complement = complement || "";
            this.user.address = address;
            this.changeDetector.detectChanges();
        });
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
            console.log(this.user.address.location);
            let isLoggedIn = this.authService.isLoggedIn();
            let user = isLoggedIn ? (await Backend.updateUser({ customer: this.user, xAccessToken: MarsAuthService.getMarsToken() })).data : (await Backend.createUser({ customer: this.user })).data;
            this.storeDataFor(user);
            return MarsAuthService.finishedSignup() ? this.navigationService.goBack() : this.navigationService.goTo(this.nextStep);
        } catch (e) {
            console.log(e);
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            this.changeDetector.detectChanges();
            this.spinner.dismiss();
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
