/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, ViewChild, ElementRef } from "@angular/core";

import { App, NavController, NavParams, Platform, IonicPage } from "ionic-angular";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsAuthService } from "@services/auth.service";
import { MarsGeolocationService } from "@services/geolocation/geolocation.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";
import { MarsNearByService } from "@services/geolocation/nearby.service";
import { MarsPictureService } from "@services/picture.service";
import { MarsAddressAutocompleteDirective } from "@directives/mars-address-autocomplete";

@IonicPage({
    segment: "partners",
    priority: "high"
})
@Component({
    selector: "page-merchants-search",
    templateUrl: "merchants-search.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MerchantsSearchPage {

    @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;

    navigationService: MarsNavigationService;

    merchants: Array<any>;
    keyword: string;
    translations: AppTranslations;

    addressElement: HTMLInputElement = null;
    address = '';

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        public zone: NgZone,
        public changeDetector: ChangeDetectorRef,
        public locales: AppLocales,
        public geolocationService: MarsGeolocationService,
        public nearbyService: MarsNearByService,
        public globals: AppGlobals,
        public interactionService: MarsInteractionService,
        public authService: MarsAuthService,
        public pictureService: MarsPictureService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
        this.keyword = this.navParams.get("keyword") || "";
        if (MarsAuthService.isLoggedIn()) this.globals.orderAddress = MarsAuthService.getLoggedInUser().address;
        this.getMerchants();
    }

    ionViewWillEnter() { }

    ionViewDidEnter() {
        this.changeDetector.detectChanges();
    }

    onAddressSelected($event) {
        let complement = this.globals.orderAddress.complement; // Keep user complement through the changes
        let place: google.maps.places.PlaceResult = $event.place;
        let address: any = {};
        /* let address: any = MarsAddressAutocompleteDirective.getAddressFromPlace(place);*/
        this.zone.run(() => {
            let rawAddress = place.address_components;
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
            this.globals.orderAddress = address;
            this.changeDetector.detectChanges();
            this.getMerchants();
        });
    }


    onSearchInputChange() {
        this.zone.run(() => {
            this.getMerchants();
        });
    }

    async getMerchants() {
        if (!this.globals.orderAddress.location) return;
        this.zone.run(async () => {
            try {
                let coordinates = { lat: this.globals.orderAddress.location.lat, lng: this.globals.orderAddress.location.lng };
                this.merchants = (await this.nearbyService.getNearbyMerchantsFromServer({ coordinates: coordinates, keyword: this.keyword, types: ["pet_store"] }) as any);
                this.merchants.map((merchant) => {
                    let latestPicture = merchant.pictures.length > 0 ? merchant.pictures[merchant.pictures.length - 1] : undefined;
                    merchant.picture = latestPicture ? this.pictureService.getPictureUrlFor({ _id: latestPicture }) : "assets/images/extras/merchants/default-avatar.jpg";
                });
                console.log(this.merchants);
                this.changeDetector.detectChanges();
            } catch (e) {
                console.log(e);
                this.interactionService.alert(this.translations.server_failure);
            } finally {
                this.changeDetector.detectChanges();
            }
        });

    }

    redirectToMerchantDetailsPageFor(merchant: any) {
        const google = MarsNearByService.GOOGLE_PROVIDER;
        this.navigationService.goTo("MerchantDetailsPage", {
            provider: merchant.provider,
            merchant: merchant.provider == google ? merchant.place_id : merchant.username
        });
    }
}
