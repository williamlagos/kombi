/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy } from "@angular/core";
import { App, IonicPage, NavController, NavParams, Platform, ViewController } from "ionic-angular";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";

import { MarsAuthService } from "@services/auth.service";
import { AppConstants } from "@app/app.constants";

import { Backend } from "@backend/index";
import { MarsSocket } from "@app/app.socket";

@IonicPage({})
@Component({
    selector: "drawer-customer-notifications",
    templateUrl: "customer-notifications.html"
})

export class CustomerNotificationsDrawer {

    navigationService: MarsNavigationService;

    user: any;
    saving: boolean;
    spinner: any;
    token: string;

    ORDER_NOTIFICATION = AppConstants.ORDER_NOTIFICATION;

    constructor(public platform: Platform,
        public app: App,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public locales: AppLocales,
        public globals: AppGlobals,
        public socket: MarsSocket,
        public interactionService: MarsInteractionService) {
        this.token = MarsAuthService.getMarsToken();
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.app.getActiveNavs()[0]);
        this.readAllNotifications();
    }

    readAllNotifications() {
        this.globals.notifications.forEach((notification) => {
            if (notification) MarsSocket.emit('notification read', { notification: notification._id, user: MarsAuthService.getLoggedInUser()._id });
        });
    }

    getCssClassesFor(notification) {
        let classes = {};
        classes[notification.data.type] = true;
        classes['read'] = notification.read;
        return classes;
    }

    view(notification) {
        let isFromOrder = notification && notification.data && (notification.data.type == this.ORDER_NOTIFICATION)
        if (isFromOrder)
            this.navigationService.goTo('OrderDetailsPage', {
                orderId: notification.data.order,
                action: "view"
            });
        MarsSocket.emit('notification read', { notification: notification._id, user: MarsAuthService.getLoggedInUser()._id });
        this.close();
    }

    close(data?: any) {
        this.viewCtrl.dismiss(data);
    }

}