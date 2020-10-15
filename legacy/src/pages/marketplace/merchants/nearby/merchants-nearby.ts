/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectorRef, Component, ChangeDetectionStrategy, NgZone } from "@angular/core";

import { App, IonicPage, Loading, NavController, Platform } from "@ionic/angular";

import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";
import { MarsMapsService } from "@services/geolocation/maps.service";
import { MarsGeolocationService } from "@services/geolocation/geolocation.service";

import { MarsMapMarkerService } from "@services/geolocation/marker.service";
import { MarsInfoWindowService } from "@services/geolocation/infowindow.service";
import { MarsNearByService } from "@services/geolocation/nearby.service";
import { MarsAddressAutocompleteDirective } from "@directives/mars-address-autocomplete";

@IonicPage({
    segment: "nearby",
    priority: "high"
})
@Component({
    selector: "page-merchants-nearby",
    templateUrl: "merchants-nearby.html"
})

export class MerchantsNearbyPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;

    map: any;
    keyword: string;
    offline: boolean;
    spinner: Loading;
    requestOnProgres: boolean = false;
    redirectingToSearch: boolean = false;

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public zone: NgZone,
        public changeDetector: ChangeDetectorRef,
        public locales: AppLocales,
        public authService: MarsAuthService,
        public globals: AppGlobals,
        public mapsService: MarsMapsService,
        public infoWindowService: MarsInfoWindowService,
        public interactionService: MarsInteractionService,
        public nearbyService: MarsNearByService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    ionViewDidLoad() {
        MarsGeolocationService.onLoad(() => {
            if (this.globals.isPlacingOrder) this.goToJobCreationPage();
            this.generateMap();
            this.initListeners();
        });
    }

    ionViewDidEnter() {
        this.redirectingToSearch = false;
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
            this.globals.currentOrder.job.origin.address = address;
            this.changeDetector.detectChanges();
            this.goToJobCreationPage();
        });
    }

    checkCartState() {

    }

    goToJobCreationPage() {
        this.navCtrl.parent._tabs.forEach((tab, index) => {
            console.log(tab.root);
            if (tab.root == "JobCreationPage") {
                this.navCtrl.parent.select(index);
                this.navCtrl.parent._tabbar.nativeElement.children[index].setAttribute("aria-selected", true);
            }
        });
    }

    onMerchantNameInputChanged() {
        if (!this.redirectingToSearch) {
            this.redirectingToSearch = true;
            this.navigationService.goTo("MerchantSearchPage", {
                keyword: this.keyword
            });
        }
    }

    async generateMap() {
        try {
            let map = await this.mapsService.getMap(document.getElementById("home-map"), { zoom: 14 });
            google.maps.event.addListener(map, "center_changed", () => {
                this.map = map;
                this.zone.run(() => {
                    this.refreshMap();
                });
            });
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            this.changeDetector.detectChanges();
        }
    }

    refreshMap() {
        if (this.map && !this.requestOnProgres) {
            this.requestOnProgres = true;
            let currentMapCenter = this.map.getCenter();
            this.getNeabySellers(this.map, currentMapCenter, () => {
                this.requestOnProgres = false;
            });
        }
    }

    async getNeabySellers(map: google.maps.Map, coordinates: google.maps.LatLng, callback?: Function) {
        let merchants = (await this.nearbyService.getNearbyMerchants({ coordinates: coordinates, types: ["pet_store"] }) as any);
        if (!merchants) return;
        merchants.map((merchant) => {
            if (!merchant) return;
            merchant.cssClasses = "driver-marker";
            console.log(merchant.cssClasses);
            if (!merchant._id) merchant.cssClasses += ' disabled';
        });

        let infoWindow: google.maps.InfoWindow;
        let options = {
            /* onMarkerClick: (marker, place) => {
                infoWindow ? infoWindow.close() : "";
                infoWindow = this.getInfowindow(map, marker, place);
                infoWindow.open(map, marker);
            }, */
        };
        this.mapsService.clearMarkers(map);
        this.mapsService.generateMarkers(map, merchants, options, callback);
    }

    getInfowindow(map, marker, place) {
        let options = {
            title: place.name,
            body: place.vicinity,
            cssClasses: "",
            moreInfoLink: {
                content: this.translations.view_more,
                onClick: (infowindow) => {
                    infowindow.close(),
                        this.navigationService.goTo("MerchantDetailsPage", {
                            provider: place.provider,
                            merchant: place.id
                        });
                }
            }
        };
        if (!place._id)
            options.cssClasses += 'disabled';
        return this.infoWindowService.getInfoWindow(map, options);
    }

    initListeners() {
        window.addEventListener("online", (e) => {
            this.zone.run(() => {
                this.offline = true;
            });
            this.offline = false;
        });
        window.addEventListener("offline", (e) => {
            this.zone.run(() => {
                this.offline = true;
            });
        });
        MarsGeolocationService.timeout.subscribe(() => {
            this.offline = true;
        });
    }

    goToLoginPage() {
        this.navigationService.setRoot('LoginPage', { 'token': 'access' });
    }
}
