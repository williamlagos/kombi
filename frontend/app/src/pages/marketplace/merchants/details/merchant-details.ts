/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectionStrategy, Component, ChangeDetectorRef, EventEmitter, NgZone, ViewChild } from "@angular/core";

import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { App, IonicPage, NavController, NavParams, Platform, Tabs, Content } from "ionic-angular";

import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsMapMarkerService } from "@services/geolocation/marker.service";
import { MarsNearByService } from "@services/geolocation/nearby.service";
import { MarsNavigationService } from "@services/navigation.service";
import { MarsViewService } from "@services/view.service";
import { MarsCartService } from "@services/cart.service";
import { MarsMapsService } from "@services/geolocation/maps.service";
import { AppUtils } from "@app/app.utils";
import { CurrencyPipe } from "@angular/common";
import { MarsPictureService } from "@services/picture.service";

@IonicPage({
    segment: "partner-details/:merchant"
})
@Component({
    selector: "page-merchant-details",
    templateUrl: "merchant-details.html"
})

export class MerchantDetailsPage {

    @ViewChild("content") content: Content;
    navigationService: MarsNavigationService;
    translations: AppTranslations;
    merchantUser: string;
    provider: string;
    merchant: any;
    map: any;
    isLoadingMap: boolean = true;
    orderLoad: EventEmitter<any> = new EventEmitter();
    showBasicInformation: boolean;
    showOperationInformation: boolean;
    showBuyInformation: boolean;
    currencyPipe: CurrencyPipe = new CurrencyPipe('pt-BR');
    weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    mapId;
    segment: string = "products";
    informationSegment: string = "general";

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        public changeDetector: ChangeDetectorRef,
        public locales: AppLocales,
        public authService: MarsAuthService,
        public globals: AppGlobals,
        public interactionService: MarsInteractionService,
        public mapsService: MarsMapsService,
        public nearbyService: MarsNearByService,
        public pictureService: MarsPictureService,
        public zone: NgZone) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
        this.mapId = AppUtils.generateUniqueIdOf(10);
    }

    async ionViewWillEnter() {
        this.merchantUser = this.navParams.get("merchant");
        /* this.provider = this.navParams.get("provider") || MarsNearByService.MARS_PROVIDER; */
        this.provider = MarsNearByService.MARS_PROVIDER;
        if (this.globals.isPlacingOrder && this.authService.isLoggedIn()) this.redirectToCartPage();
        await this.getMerchantData(() => {
            /* this.generateMap(); */
        });
    }

    ionViewDidEnter() {
        setTimeout(() => {
            this.changeDetector.detectChanges();
        }, 1500);
    }

    async getMerchantData(callback?: Function) {
        this.zone.run(async () => {
            try {
                let merchant = await this.nearbyService.getMerchantData(this.provider, this.merchantUser);
                this.merchant = this.formatMerchant(merchant);
                if (callback) callback();
            } catch (e) {
                this.interactionService.alert(this.translations.server_failure);
            } finally {
                this.changeDetector.detectChanges();
            }
        });
    }

    formatMerchant(merchant: any) {
        let formatedMerchant = {};
        let information = [];
        if (this.merchantIsFromMars()) {
            let latestPicture = merchant.pictures.length > 0 ? merchant.pictures[merchant.pictures.length - 1] : undefined;
            merchant.picture = latestPicture ? this.pictureService.getPictureUrlFor({ _id: latestPicture }) : "assets/images/extras/merchants/default-avatar.jpg";
            information = [
                { name: this.translations.address, value: merchant.address.vicinity },
                { name: this.translations.phone, value: merchant.phone },
            ];
            information.map((info) => {
                /* Do proper transformations if necessary */
            });
            let formattedPaymentMethods = "";
            merchant.paymentModes.map((mode, index) => { formattedPaymentMethods += "" + this.translations[mode] + "<br>" });
            merchant.formattedPaymentMethods = formattedPaymentMethods;
        } else {
            information = [
                { name: this.translations.address, value: merchant.vicinity },
                { name: this.translations.phone, value: merchant.formatted_phone_number }
            ];
        };
        information = information.filter((info) => { return info.value; });
        formatedMerchant = Object.assign(merchant, { information: information });
        return formatedMerchant;
    }

    getMerchantBanner() {
        let isMerchantLOaded = this.merchant && this.merchant.picture;
        return isMerchantLOaded ? `background-image: url(${this.merchant.picture})` : "background-color: #efefef";
    }

    merchantIsFromMars() {
        return this.provider == MarsMapMarkerService.MARS_PROVIDER;
    }

    async generateMap() {
        if (!this.map) {
            try {
                let map = <google.maps.Map>await this.mapsService.getMap(document.getElementById("merchant-details-map-" + this.mapId), { zoom: 18, ignoreUserLocation: true });
                google.maps.event.addListenerOnce(map, "center_changed", () => {
                    this.zone.run(() => {
                        this.mapsService.generateMarkers(map, [this.merchant], {});
                        let location = {
                            lat: this.merchant.address.location.lat,
                            lng: this.merchant.address.location.lng
                        };
                        let coordinates = new google.maps.LatLng(location.lat, location.lng);
                        map.setCenter(coordinates);
                        map.setZoom(15);
                        this.isLoadingMap = false;
                        this.changeDetector.detectChanges();
                    });
                });
                this.map = map;
            } catch (e) {

            } finally {
                this.changeDetector.detectChanges();
            }
        }
    }

    toggle(category: any) {
        category.show = !category.show;
        setTimeout(() => {
            this.content.scrollToBottom(250);
        }, 300);
    }

    view(category: any) {
        if (category.children && category.children.length > 0) this.goToSubcategoriesPageFor(category);
        else this.goToCategoryItemsPageFor(category);
    }

    goToSubcategoriesPageFor(category: any) {
        this.navigationService.goTo("ShopwindowCategoriesPage", {
            merchant: this.merchant.username,
            category: category.slug
        });
    }

    goToCategoryItemsPageFor(category: any) {
        this.navigationService.goTo("ShopwindowItemsPage", {
            merchant: this.merchant.username,
            category: category.slug
        });
    }

    redirectToCartPage() {
        let tabs = (this.navCtrl.parent as Tabs);
        let cartPageIndex = 0;
        tabs._tabs.map((tab, index) => { if (tab.root && tab.root == "CartPage") cartPageIndex = index; });
        tabs.select(cartPageIndex);
    }
}
