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

@IonicPage({
    segment: "job/:orderId/:action",
    priority: "high"
})
@Component({
    selector: "page-job-details",
    templateUrl: "job-details.html"
})
export class JobDetailsPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;

    segment: string = "information";
    orderId: string;
    operation: string;
    order: any;
    map: any;
    isLoadingMap: boolean = true;
    orderLoad: EventEmitter<any> = new EventEmitter();
    currentUser: string;
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

    /* Bids area */
    bids: Array<any>;
    lowestBids: Array<any> = [];
    @ViewChild("bidsScroll") bidsScroll: ElementRef;
    @ViewChild("bidInput") bidInput: ElementRef;
    @ViewChild(Button) sendButton: Button;
    newBidValue: string = "";
    lockBids: boolean = false;
    CURRENCY_OPTIONS = AppConstants.CURRENCY_OPTIONS;
    isLoadingBids;

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
        public pictureService: MarsPictureService,
        public socket: MarsSocket) {
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

    setSegment(segment) {
        this.segment = segment;
        this.changeDetector.detectChanges();
        this.scrollBidsDown();
    }

    enableBids() {
        return this.order && this.order.job && !this.order.merchant;
    }

    async generateMap() {
        this.orderLoad.subscribe(async () => {
            MarsGeolocationService.onLoad(async () => {
                let order = this.order;
                let orderHasReceiptAddress = order.job && order.job.origin && order.job.origin.address && order.job.origin.address.location;
                let renderMap = !this.map;
                if (!renderMap) {
                    let mapDiv = document.querySelector("#job-details-map");
                    if (mapDiv) mapDiv.remove();
                }
                else {
                    try {
                        let map = <google.maps.Map>await this.mapsService.getMap(document.getElementById("job-details-map"), { zoom: 16, ignoreUserLocation: true });
                        let merchant = this.order.merchant;
                        let orderAddress = order.job.origin.address;
                        let address = orderHasReceiptAddress ? orderAddress.location : merchant.address.location;
                        let location = new google.maps.LatLng(address.lat, address.lng);
                        google.maps.event.addListenerOnce(map, "center_changed", () => {
                            this.zone.run(() => {
                                this.markerService.getMarker(map, location, { cssClasses: "place-marker" });
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
            if (this.order.status == 'started') this.navigationService.goTo('JobDirectionsPage', { orderId: this.orderId });
            this.order.showDetails = MarsViewService.screenIsDesktopSized();
            this.refreshBids();
            this.orderLoad.emit();
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        }
    }

    async accept() {
        let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
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
        let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
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

    async chooseMerchant(merchant) {
        let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
        try {
            this.order = (await Backend.setOrderMerchant({ id: this.orderId, merchant: merchant._id, xAccessToken: this.token })).data;
            this.orderLoad.emit();
            this.interactionService.alert(this.translations.merchant_choosen_successfully);
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            spinner.dismiss();
        }
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

    atachBidsSocket() {
        MarsSocket.join(this.orderId);
        MarsSocket.on("new bid", () => {
            this.refreshBids();
        });
    }

    detachBidsSocket() {
        MarsSocket.leave(this.orderId);
    }

    async refreshBids() {
        try {
            this.isLoadingBids = true;
            this.bids = (await Backend.getOrderBids({ xAccessToken: this.token, order: this.orderId })).data; // Gets bids
            this.bids.map((bid) => { if (this.lowestBids.indexOf(bid.user._id) == -1) this.lowestBids.push(bid.user._id); }); // Gets merchant ids
            this.lowestBids.map((merchant, index) => {
                let lowestBid: any = {}, isLowestBid;
                this.bids.map((bid) => {
                    isLowestBid = (bid.user._id == merchant) && (!lowestBid.value || bid.value < lowestBid.value);
                    if (isLowestBid) lowestBid = bid;
                });
                this.lowestBids[index] = lowestBid;
            });
            console.log(this.lowestBids);
        } catch (e) {
            console.log(e);
        } finally {
            this.scrollBidsDown();
            this.isLoadingBids = false;
            this.changeDetector.detectChanges();
        }
    }

    onKeyPress(event: KeyboardEvent) {
        let userPressedEnter = event && event.keyCode && (event.keyCode == 13);
        if (userPressedEnter && this.sendButton) {
            this.sendButton.getNativeElement().click();
            event.preventDefault();
        }
    }

    clearBidInput() {
        this.bidInput.nativeElement.value = this.newBidValue = "";
    }

    createBid(amount) {
        this.placeBid({ order: this.orderId, value: amount });
        this.clearBidInput();
    }

    async placeBid(bid) {
        try {
            this.isLoadingBids = true;
            this.bids = (await Backend.placeBid({ xAccessToken: this.token, bid: bid, order: this.orderId })).data;
        } catch (e) {
            console.log(e);
        } finally {
            this.scrollBidsDown();
            this.isLoadingBids = false;
            this.changeDetector.detectChanges();
        }
    }

    isSent(bid) {
        return bid && bid.user && (bid.user._id == this.authService.getLoggedInUser()._id);
    }

    scrollBidsDown() {
        setTimeout(() => { if (this.bidsScroll) this.bidsScroll.nativeElement.scrollTop = this.bidsScroll.nativeElement.scrollHeight; }, 100);
    }

    getMerchantPicture(merchant) {
        let hasPicture = merchant && merchant.pictures[0];
        return hasPicture ? this.pictureService.getPicture(merchant.pictures[0]) : "";
    }


    async startRide() {
        let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
        try {
            this.order = (await Backend.startOrder({ id: this.orderId, xAccessToken: this.token })).data;
            this.orderLoad.emit();
            this.navigationService.goTo("JobDirectionsPage", { orderId: this.orderId });
            this.interactionService.alert(this.translations.order_accepted_successfully);
        } catch (e) {
            console.log(e);
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            spinner.dismiss();
        }
    }
}