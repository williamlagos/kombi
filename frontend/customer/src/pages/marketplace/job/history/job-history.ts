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

@IonicPage({
    segment: "job-history",
    priority: "high"
})
@Component({
    selector: "page-job-history",
    templateUrl: "job-history.html",
})
export class JobHistoryPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;

    keyword = "";
    orders: Array<any>;
    token: string;

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public popoverCtrl: PopoverController,
        public changeDetector: ChangeDetectorRef,
        public globals: AppGlobals,
        public locales: AppLocales,
        public socket: MarsSocket,
        public authService: MarsAuthService,
        public interactionService: MarsInteractionService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    ionViewDidLoad() {
        if (MarsAuthService.isLoggedIn()) {
            this.token = MarsAuthService.getMarsToken();
            this.load();
        }
    }

    ionViewCanEnter() {
        return this.navigationService.authCheck(JobHistoryPage.name, ['customer']);
    }

    ionViewDidEnter() {
        this.globals.hasPendingOrders = false;
        this.globals.notifications.map((notification) => {
            console.log(notification);
            if (notification) MarsSocket.emit('notification read', { notification: notification._id, user: MarsAuthService.getLoggedInUser()._id });
        });
    }

    getPendingOrdersNumber() {
        return this.globals.orderNotificationsBadge;
    }

    showNotificationsDrawer($event) {
        let popover = this.popoverCtrl.create("CustomerNotificationsDrawer");
        popover.present({ ev: $event });
    }

    async load() {
        try {
            this.orders = (await Backend.getOrders({ xAccessToken: this.token })).data;
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            this.changeDetector.detectChanges();
        }
    }

    showOrderDetailsFor(order) {
        if (order.status == "started") {
            this.navigationService.goTo("JobDirectionsPage", {
                orderId: order._id
            });
        } else {
            this.navigationService.goTo("JobDetailsPage", {
                orderId: order._id,
                action: "view"
            });
        }
    }

    view(item: any) {
        this.navigationService.goTo("MarketItemDetailsPage", {
            slug: item.information.slug
        });
    }
}
