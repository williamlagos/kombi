/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from "@angular/core";

import { App, NavController, Platform, ViewController, Tabs } from "ionic-angular";
import { IonicPage } from "ionic-angular";

import { AppConstants } from "@app/app.constants";

import { MarsAuthService } from "@services/auth.service";
import { AppGlobals } from '@app/app.globals';

import { MarsSocket } from "@app/app.socket";
import { Backend } from "@backend/index";
import { IntroductionPage } from "@pages/introduction/introduction";
import { MarsNavigationService } from "@services/navigation.service";
import { MarsGeolocationService } from "@services/geolocation/geolocation.service";
import { MarsInteractionService } from "@services/interaction.service";
import { AppLocales } from "@app/app.locales";

@IonicPage({
    segment: "a",
    priority: "high"
})
@Component({
    selector: "page-home",
    templateUrl: "home.html"
})

export class HomePage {

    translations: AppTranslations;
    navigationService: MarsNavigationService;
    screenIsDesktopSized = window.innerWidth > 768;
    token: string;

    constructor(public platform: Platform,
        public app: App,
        public zone: NgZone,
        public changeDetector: ChangeDetectorRef,
        public globals: AppGlobals,
        public locales: AppLocales,
        public socket: MarsSocket,
        public navCtrl: NavController,
        public interactionService: MarsInteractionService,
        public geolocationService: MarsGeolocationService) {
        this.init();
        this.translations = this.locales.load();
        this.navigationService = new MarsNavigationService(app);
        this.navigationService.setNavCtrl(this.navCtrl);
        platform.ready().then(() => { });
    }

    ionViewDidLoad() {
        let isFirstAccess = MarsAuthService.isLoggedIn() && !localStorage[IntroductionPage.INTRODUCTION_STATUS];
        if (isFirstAccess) this.navigationService.setRoot("IntroductionPage");
    }

    async init() {
        if (MarsAuthService.isLoggedIn()) {
            this.token = MarsAuthService.getMarsToken();
            MarsSocket.connect(AppConstants.SERVER_ADDRESS);
            let user = MarsAuthService.getLoggedInUser();
            MarsSocket.on('connect', () => {
                this.refreshNotifications();
                MarsSocket.join(user._id);
                MarsSocket.on('new order', async (notification) => {
                    await this.refreshNotifications()
                });
                MarsSocket.on('notifications update', async (notification) => await this.refreshNotifications());
            });
        }
    }
    async refreshUser() {
        return new Promise(async (resolve, reject) => {
            try {
                let user = (await Backend.getUserProfile({ xAccessToken: this.token })).data;
                MarsAuthService.setLoggedInUser(user);
                MarsAuthService.setMarsToken(user.token);
                resolve();
            } catch (e) {
                resolve();
            }
        });
    }

    async refreshNotifications() {
        this.zone.run(async () => {
            try {
                this.globals.notifications = (await Backend.getNotifications({ xAccessToken: this.token })).data;
            } catch (e) {

            } finally {
                this.changeDetector.detectChanges();
            }
        });
    }
}
