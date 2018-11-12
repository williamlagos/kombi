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
import { AppUserPages } from "@pages/user-pages";
import { MarsGeolocationService } from "@services/geolocation/geolocation.service";
import { MarsGeocoderService } from "@services/geolocation/geocoder.service";

@IonicPage({ priority: "high" })
@Component({
    selector: "page-merchant-location-information",
    templateUrl: "merchant-location-information.html"
})

export class MerchantLocationInformationPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;
    previousStep: string;
    nextStep: string;

    isReady: boolean;

    userDataForm;
    windowIsDesktopSized = window.innerWidth > 768;
    spinner: any;

    user: any = {
        role: AppConstants.CUSTOMER_ROLE,
        address: {},
        paymentData: {},
        documents: [{}]
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
        public interactionService: MarsInteractionService,
        public geocoderService: MarsGeocoderService,
        public geolocationService: MarsGeolocationService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    ionViewWillEnter() {
        // Inits geolocation
        this.init();
        // In case the user is logged in
        if (this.authService.isLoggedIn()) this.user = this.authService.getLoggedInUser();
        // In case the user returned after starting the signup process
        this.nextStep = this.signupPages.getNextStepFor(this.user.roles, "MerchantLocationInformationPage");
        this.previousStep = this.signupPages.getPreviousStepFor(this.user.roles, "MerchantLocationInformationPage");
        if (!this.authService.finishedSignup()) this.user.signupStep = this.nextStep;
    }

    ionViewDidEnter() {
        setTimeout(() => { this.changeDetector.detectChanges(); }, 200);
    }

    init() {
        MarsGeolocationService.onLoad(() => {
            this.isReady = true;
            this.changeDetector.detectChanges();
        });
    }

    onAddressSelected($event) {
        this.showAddressSpinner = false;
        let complement = this.user.address.complement; // Keep user complement through the changes
        let place: google.maps.places.PlaceResult = $event.place;
        let address: any = {};
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

    disableNextFor(form): boolean {
        return !form.valid;
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
            let token = MarsAuthService.getMarsToken();
            if (!this.user.address.location) this.user.address.location = await this.getCoordinates();
            let isLoggedIn = this.authService.isLoggedIn();
            let user = isLoggedIn ? (await Backend.updateUser({ user: this.user, xAccessToken: token })).data : (await Backend.createUser({ user: this.user })).data;
            this.storeDataFor(user);
            return MarsAuthService.finishedSignup() ? this.navigationService.goBack() : this.navigationService.setRoot("HomePage");
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
        this.navigationService.setRoot(this.previousStep);
    }
}