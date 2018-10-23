/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy, EventEmitter, NgZone, ChangeDetectorRef } from "@angular/core";

import { App, NavController, NavParams, Platform } from "ionic-angular";
import { IonicPage } from "ionic-angular";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";
import { MarsAuthService } from "@services/auth.service";

import { MarsPictureService } from "@services/picture.service";
import { MarsMapsService } from "@services/geolocation/maps.service";
import { MarsMapMarkerService } from "@services/geolocation/marker.service";
import { MarsGeolocationService } from "@services/geolocation/geolocation.service";
import { MarsViewService } from "@services/view.service";

import { Backend } from "@backend/index";

@IonicPage({
    segment: "order/:orderId/:action",
    priority: "high"
})
@Component({
    selector: "page-order-details",
    templateUrl: "order-details.html"
})
export class OrderDetailsPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;

    orderId: string;
    operation: string;
    order: any;
    map: any;
    isLoadingMap: boolean = true;
    currentUser: string;
    orderLoad: EventEmitter<any> = new EventEmitter();
    token: string;
    cartTotal = 0.0;
    MERCHANT_DETAILS_TAB_INDEX = 0;
    productOptions = {
        showPicture: true,
        showDescription: true,
        showPrice: true,
        showDiscountPrice: true,
        showProductQuantity: true
    };
    redirectToOrderPage: boolean;

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        public zone: NgZone,
        public locales: AppLocales,
        public globals: AppGlobals,
        public mapsService: MarsMapsService,
        public changeDetector: ChangeDetectorRef,
        public markerService: MarsMapMarkerService,
        public authService: MarsAuthService,
        public interactionService: MarsInteractionService,
        public pictureService: MarsPictureService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    ionViewDidLoad() {
        if (MarsAuthService.isLoggedIn()) {
            this.token = MarsAuthService.getMarsToken();
            this.currentUser = MarsAuthService.getLoggedInUser()._id;
            this.generateMap()
            this.orderId = this.navParams.get("orderId") || "";
            this.operation = this.navParams.get("action") || "";
            if (this.operation == "view")
                this.load();
            if (this.operation == "cancel")
                this.cancel();
            if (this.operation == "accept")
                this.accept();
        }
    }

    async generateMap() {
        this.orderLoad.subscribe(async () => {
            MarsGeolocationService.onLoad(async () => {
                let order = this.order;
                let orderHasReceiptAddress = order.payload && order.payload.receiptAddress && order.payload.receiptAddress.location;
                let renderMap = !this.map && ((MarsAuthService.hasRole('MERCHANT') && orderHasReceiptAddress) || MarsAuthService.hasRole('CUSTOMER'));
                if (!renderMap) {
                    let mapDiv = document.querySelector("#order-details-map");
                    if (mapDiv) mapDiv.remove();
                }
                else {
                    try {
                        let map = <google.maps.Map>await this.mapsService.getMap(document.getElementById("order-details-map"), { zoom: 16, ignoreUserLocation: true });
                        let merchant = this.order.merchant;
                        let orderAddress = order.payload.receiptAddress;
                        let address = orderHasReceiptAddress ? orderAddress.location : merchant.address.location;
                        let location = new google.maps.LatLng(address.lat, address.lng);
                        google.maps.event.addListenerOnce(map, "center_changed", () => {
                            this.zone.run(() => {
                                this.markerService.getMarker(map, location, {});
                                this.map.setCenter(location);
                                this.map.setZoom(16);
                                this.isLoadingMap = false;
                            });
                        });
                        this.map = map;
                    } catch (e) {

                    } finally {
                        this.changeDetector.detectChanges();
                    }
                }
            });
        });
    }

    async load() {
        try {
            this.order = (await Backend.getOrder({ id: this.orderId, xAccessToken: this.token })).data;
            console.log(this.order);
            this.order.showDetails = MarsViewService.screenIsDesktopSized();
            this.orderLoad.emit();
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        }
    }

    async accept() {
        let spinner = this.interactionService.spinner({ content: this.translations.loading + '...' });
        try {
            this.order = (await Backend.acceptOrder({ id: this.orderId, xAccessToken: this.token })).data;
            this.orderLoad.emit();
            this.navigationService.goToRootPage();
            this.interactionService.alert(this.translations.order_accepted_successfully);
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            spinner.dismiss();
        }
    }

    async cancel() {
        let spinner = this.interactionService.spinner({ content: this.translations.loading + '...' });
        try {
            this.order = (await Backend.cancelOrder({ id: this.orderId, xAccessToken: this.token })).data;
            this.orderLoad.emit();
            this.navigationService.goToRootPage();
            this.interactionService.alert(this.translations.order_canceled_successfully);
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            spinner.dismiss();
        }
    }

    async rateWith(starsNumber) {
        let spinner = this.interactionService.spinner({ content: this.translations.loading + '...' });
        try {
            (await Backend.rateOrder({ id: this.orderId, rate: starsNumber, xAccessToken: this.token })).data;
            this.load();
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            spinner.dismiss();
        }
    }

    view(item) {
        this.navigationService.goTo('JobDetailsPage', {
            slug: item.information.slug
        });
    }
}