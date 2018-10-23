/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from "@angular/core";

import { IonicPage } from "ionic-angular";
import { Platform } from "ionic-angular";
import { App } from "ionic-angular";
import { NavController } from "ionic-angular";
import { PopoverController } from "ionic-angular";

import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";

import { MarsSocket } from "@app/app.socket";
import { Backend } from "@backend/index";


@IonicPage({
    segment: "orderslist",
    priority: "high"
})
@Component({
    selector: "page-orders-list",
    templateUrl: "orders-list.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListPage {
    navigationService: MarsNavigationService;
    translations: AppTranslations;

    orders: Array<any>;
    token: string;

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public popoverCtrl: PopoverController,
        public zone: NgZone,
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

    ionViewCanEnter() {
        return this.navigationService.authCheck(OrdersListPage.name, ['merchant']);
    }

    ionViewDidLoad() {
        if (!MarsAuthService.hasRole('MERCHANT')) return;
        if (MarsAuthService.isLoggedIn()) {
            this.token = MarsAuthService.getMarsToken();
            this.getOrders();
        }
    }

    ionViewDidEnter() { }

    initialize() {
        MarsSocket.join(MarsAuthService.getLoggedInUser()._id);
        MarsSocket.on('new order', async (notification) => {
            this.interactionService.confirm(this.translations.you_have_received_a_new_order,
                [{
                    text: this.translations.view_more, role: "strong", handler: () => {
                        this.navigationService.goTo('OrderDetailsPage', {
                            orderId: notification.data.order,
                            action: "view"
                        });
                    }
                }]
            );
        });
    }

    async getOrders() {
        this.zone.run(async () => {
            try {
                let orders = (await Backend.getOrders({ xAccessToken: this.token })).data;
                this.orders = orders;
            } catch (e) {
                this.interactionService.alert(this.translations.server_failure);
            } finally {
                this.changeDetector.markForCheck();
            }
        });
    }

    showOrderDetailsFor(order) {
        this.navigationService.goTo('OrderDetailsPage', {
            orderId: order._id,
            action: 'view'
        });
    }

    getPendingOrdersNumber() {
        return this.globals.orderNotificationsBadge;
    }

    showNotificationsDrawer($event) {
        let popover = this.popoverCtrl.create("MerchantNotificationsDrawer");
        popover.present({ ev: $event });
    }

    view(item: any) {
        this.navigationService.goTo("MarketItemDetailsPage", {
            slug: item.information.slug
        });
    }

}
