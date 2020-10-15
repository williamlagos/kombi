/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy, EventEmitter, NgZone, ChangeDetectorRef, ViewChild, ElementRef } from "@angular/core";

import { App, NavController, NavParams, Platform, Button, TextInput, Content } from "@ionic/angular";
import { IonicPage } from "@ionic/angular";

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
import { AppConstants } from "@app/app.constants";
import { MarsSocket } from "@app/app.socket";
import { MarsDirectionsService } from "@services/geolocation/directions.service";

@IonicPage({
    segment: "job/directions/:orderId",
    priority: "high"
})
@Component({
    selector: "page-job-directions",
    templateUrl: "job-directions.html"
})
export class JobDirectionsPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;
    orderId: string;
    orderOrigin: any;
    orderDestination: any;
    userLocation: any;
    showDestination: boolean;
    operation: string;
    order: any;
    map: any;
    isLoadingMap: boolean = true;
    orderLoad: EventEmitter<any> = new EventEmitter();
    currentUser: string;
    token: string;

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
        public geolocationService: MarsGeolocationService,
        public directionService: MarsDirectionsService,
        public interactionService: MarsInteractionService,
        public pictureService: MarsPictureService,
        public socket: MarsSocket) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    async ionViewDidLoad() {
        if (MarsAuthService.isLoggedIn()) {
            this.token = MarsAuthService.getMarsToken();
            this.currentUser = MarsAuthService.getLoggedInUser()._id;
            this.orderId = this.navParams.get("orderId") || "";
            this.load();
            this.generateMap()
        }
    }

    async load() {
        try {
            this.order = (await Backend.getOrder({ id: this.orderId, xAccessToken: this.token })).data;
            this.order.showDirections = MarsViewService.screenIsDesktopSized();
            this.orderLoad.emit();
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        }
    }

    async generateMap() {
        this.orderLoad.subscribe(async () => {
            MarsGeolocationService.onLoad(async () => {
                let renderMap = !this.map;
                if (!renderMap) {
                    let mapDiv = document.querySelector("#job-directions-map");
                    if (mapDiv) mapDiv.remove();
                }
                else {
                    try {
                        let map = <google.maps.Map>await this.mapsService.getMap(document.getElementById("job-directions-map"), { zoom: 16, ignoreUserLocation: true });
                        google.maps.event.addListenerOnce(map, "center_changed", () => {
                            this.zone.run(async () => {
                                this.userLocation = await this.geolocationService.getUserLocation() as any;
                                this.map.setCenter(this.userLocation);
                                this.markerService.getMarker(this.map, this.userLocation, {});
                                this.isLoadingMap = false;
                                this.parseOrderLocations();
                                this.setOriginRoute();
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

    async parseOrderLocations() {
        let order = this.order;
        let jobOrigin = order.job.origin.address.location;
        let jobDestination = order.job.destination.address.location;
        this.orderOrigin = new google.maps.LatLng(jobOrigin.lat, jobOrigin.lng);
        this.orderDestination = new google.maps.LatLng(jobDestination.lat, jobDestination.lng);
    }

    async setOriginRoute() {
        this.mapsService.clearMarkers(this.map);
        this.markerService.getMarker(this.map, this.userLocation, { cssClasses: 'driver-marker' });
        this.markerService.getMarker(this.map, this.orderOrigin, { cssClasses: 'place-marker' });
        this.directionService.drawNavigationRouteOn(this.map, this.userLocation, this.orderOrigin);
    }

    async setDestinyRoute() {
        this.mapsService.clearMarkers(this.map);
        this.markerService.getMarker(this.map, this.orderOrigin, { cssClasses: 'place-marker' });
        this.markerService.getMarker(this.map, this.orderDestination, { cssClasses: 'place-marker' });
        this.directionService.drawNavigationRouteOn(this.map, this.orderOrigin, this.orderDestination);
        this.showDestination = true;
        this.changeDetector.detectChanges();
    }

    async finish() {
        /*     let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
            try {
                this.order = (await Backend.finishOrder({ id: this.orderId, xAccessToken: this.token })).data;
                this.orderLoad.emit();
                this.navigationService.goToRootPage();
                this.interactionService.alert(this.translations.order_finished_successfully);
            } catch (e) {
                this.interactionService.alert(this.translations.server_failure);
            } finally {
                spinner.dismiss();
            } */
    }

    getOrderStatus(order) {
        switch (order.status) {
            case "created":
                return this.translations.order_status_awaiting_for_bids;
            case "awaiting_for_confirmation":
                return this.translations.order_status_awaiting_for_confirmation;
            case "accepted":
                return this.translations.order_status_confirmed;
            case "rejected":
                return this.translations.order_status_rejected;
            default:
                return this.translations.order_status_awaiting_for_bids;
        }
    }

    getMerchantPicture(merchant) {
        let hasPicture = merchant && merchant.pictures[0];
        return hasPicture ? this.pictureService.getPicture(merchant.pictures[0]) : "";
    }

}