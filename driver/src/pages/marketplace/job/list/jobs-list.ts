/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { App, IonicPage, NavController, Platform, PopoverController } from "ionic-angular";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";

import { MarsSocket } from "@app/app.socket";
import { Backend } from "@backend/index";
import { PaginationInstance } from "ngx-pagination";
import { MarsGeolocationService } from "@services/geolocation/geolocation.service";

@IonicPage({
    segment: "jobs-list",
    priority: "high"
})
@Component({
    selector: "page-jobs-list",
    templateUrl: "jobs-list.html",
})
export class JobsListPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;

    keyword = "";
    orders: Array<any>;
    token: string;

    location: any;
    pagination: PaginationInstance = {
        itemsPerPage: 4,
        currentPage: 1
    };

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public popoverCtrl: PopoverController,
        public changeDetector: ChangeDetectorRef,
        public globals: AppGlobals,
        public locales: AppLocales,
        public socket: MarsSocket,
        public authService: MarsAuthService,
        public geolocationService: MarsGeolocationService,
        public interactionService: MarsInteractionService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    async ionViewWillEnter() {
        if (MarsAuthService.isLoggedIn()) this.token = MarsAuthService.getMarsToken();
        await this.getLocation();
        this.getJobsList();
    }

    ionViewCanEnter() {
        console.log("Been here!");
        return this.navigationService.authCheck(JobsListPage.name, ['merchant']);
    }

    ionViewDidEnter() { }

    async getLocation() {
        return new Promise((resolve, reject) => {
            try {
                MarsGeolocationService.onLoad(async () => {
                    let location = await this.geolocationService.getUserLocation({}) as any;
                    this.location = { latitude: location.lat(), longitude: location.lng() };
                    resolve();
                });
            } catch (e) {
                this.interactionService.alert(this.translations.server_failure);
                this.orders = [];
            }
        });
    }

    async refreshJobs(currentPage) {
        this.pagination.currentPage = currentPage;
        delete this.orders;
        this.getJobsList();
    }

    async getJobsList() {
        try {
            let data = (await Backend.getOrdersNearby({
                pageSize: this.pagination.itemsPerPage,
                page: this.pagination.currentPage - 1,
                latitude: this.location.latitude,
                longitude: this.location.longitude
            })).data;
            this.orders = data.jobs;
            console.log(data);
        } catch (e) {
            console.log(e);
            this.interactionService.alert(this.translations.server_failure);
            this.orders = [];
        } finally {
            this.changeDetector.detectChanges();
        }
    }

    showJobDetailsFor(order) {
        this.navigationService.goTo('JobDetailsPage', {
            orderId: order._id,
            action: 'view'
        });
    }

    view(item: any) {
        this.navigationService.goTo("JobDetailsPage", {
            slug: item.information.slug
        });
    }
}
