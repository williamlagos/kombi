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
import { MarsViewService } from "@services/view.service";

import { Backend } from "@backend/index";

@IonicPage({
    segment: "order/:orderId/bids",
    priority: "high"
})
@Component({
    selector: "page-place-bid",
    templateUrl: "place-bid.html"
})
export class PlaceBidPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;

    orderId: string;
    order: any;
    token: string;

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        public zone: NgZone,
        public locales: AppLocales,
        public globals: AppGlobals,
        public changeDetector: ChangeDetectorRef,
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
            this.orderId = this.navParams.get("orderId") || "";
            console.log(this.orderId);
        }
    }
}