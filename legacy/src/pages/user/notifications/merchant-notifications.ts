/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectionStrategy, Component } from "@angular/core";

import { IonicPage } from "@ionic/angular";
import { Platform } from "@ionic/angular";
import { App } from "@ionic/angular";
import { ViewController } from "@ionic/angular";
import { NavParams } from "@ionic/angular";
import { NavController } from "@ionic/angular";

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
    selector: "drawer-merchant-notifications",
    templateUrl: "merchant-notifications.html",
})

export class MerchantNotificationsDrawer {

    user: any;
    saving: boolean;
    spinner: any;
    token: string;

    ORDER_NOTIFICATION = AppConstants.ORDER_NOTIFICATION;

    constructor(public platform: Platform,
        public app: App,
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public navCtrl: NavController,
        public locales: AppLocales,
        public globals: AppGlobals,
        public socket: MarsSocket,
        public interactionService: MarsInteractionService,
        public navigationService: MarsNavigationService) {
        this.navigationService.setNavCtrl(this.app.getActiveNavs()[0]);
        this.token = MarsAuthService.getMarsToken();
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