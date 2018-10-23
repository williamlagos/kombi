/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Push notification service.
 */

import { EventEmitter, Injectable } from "@angular/core";

import { Platform } from "ionic-angular";

import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";
import { MarsAuthService } from "@services/auth.service";

declare var window: any;

@Injectable()
export class MarsPushNotificationService {

    onPush: EventEmitter<any> = new EventEmitter();
    appId: string;
    GCM_SENDER_ID: string;
    ONESIGNAL_SUBDOMAIN: string;
    platformIsMobile: boolean = false;
    onesignalWebSDK: any = window.OneSignal;
    promptOptions: any;

    constructor(public platform: Platform,
        public globals: AppGlobals) { }

    initialize(options: any) {
        this.platformIsMobile = this.platform.is("cordova");
        if (this.platformIsMobile)
            this.getMobileSubscription();
        else
            this.getDesktopSubscription();
    }

    getDesktopSubscription() {
        this.webSdkConfig(["init", {
            appId: this.appId,
            subdomainName: this.ONESIGNAL_SUBDOMAIN,
            notifyButton: { enable: false },
            promptOptions: this.getPromptOptions()
        }]);
        this.webSdkConfig(["registerForPushNotifications", { modalPrompt: false }]);
        this.webSdkConfig(["setDefaultNotificationUrl", window.location.href]);
        this.webSdkConfig(["addListenerForNotificationOpened", (notification) => { this.onPush.emit() }]);
        this.webSdkConfig(["registerForPushNotifications"]);
    };

    webSdkConfig(data: Array<any>) {
        return this.onesignalWebSDK ? this.onesignalWebSDK.push(data) : console.warn("Whoops! Please remember to call the initialize() function before subscribing for pushes ;)");
    }

    getMobileSubscription() {
        window.plugins.OneSignal.init(this.appId,
            { googleProjectNumber: this.GCM_SENDER_ID },
            (notification) => {
                this.onPush.emit(notification);
            });
        window.plugins.OneSignal.enableInAppAlertNotification(true);  // Show an alert box if a notification comes in when the user is in your app.
    };

    setUserId(userId: string) {
        this.webSdkConfig(["sendTag", "mars_user_id", userId]);
    }

    getPromptOptions() {
        return this.promptOptions || {
            actionMessage: "Você deseja habilitar notificações no " + AppConstants.NAME + "?",
            exampleNotificationTitleDesktop: "Nova mensagem",
            exampleNotificationMessageDesktop: "Olá! Tudo bem com você? :)",
            exampleNotificationTitleMobile: "Nova mensagem",
            exampleNotificationMessageMobile: "Olá! Tudo bem com você? :)",
            exampleNotificationCaption: "Você pode cancelar a qualquer momento",
            acceptButtonText: "Estou dentro!",
            cancelButtonText: "Não, obrigado.",
            showCredit: true
        };
    }

    getUnreadNotificationsByType(type) {
        if (!MarsAuthService.isLoggedIn())
            return [];

        let unread = [];
        let isFromType = false;
        let isUnread = false;
        let user = MarsAuthService.getLoggedInUser()._id;
        this.globals.notifications.map((notification) => {
            isFromType = notification && notification.data && (notification.data.type == type);
            isUnread = notification.readBy && (notification.readBy.indexOf(user) == -1);
            if (isFromType && isUnread)
                unread.push(notification);
        });
        return unread;
    };
}
