/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Platform } from "ionic-angular";
import { Injectable, isDevMode } from "@angular/core";

import { AppGlobals } from "@app/app.globals";
import { AppConstants } from "@app/app.constants";

import { MarsPushNotificationService } from "@services/push-notification.service";
import { MarsAuthService } from "@services/auth.service";

declare var Mars;

@Injectable()
export class AppMainPages {
    constructor(platform: Platform,
        public globals: AppGlobals,
        notificationService: MarsPushNotificationService) { };

    public refresh() {
        let pages = [
            {
                getRoot: () => { return "JobCreationPage"; },
                getRootParams: () => { return {} },
                getTitle: () => { return "Criar Frete"; },
                getUrlPath: () => { return "new" },
                getIcon: () => { return "add-circle"; },
                getBadge: () => { return 0; },
                canShow: () => { return (!MarsAuthService.isLoggedIn()) || (MarsAuthService.hasRole('CUSTOMER')); },
                disable: () => { return this.globals.disableNavigation }
            },
            {
                getRoot: () => { return "OrderHistoryPage"; },
                getRootParams: () => { return {} },
                getTitle: () => { return "Meus Fretes"; },
                getUrlPath: () => { return "orders" },
                getIcon: () => { return "car"; },
                getBadge: () => { return 0; },
                canShow: () => { return MarsAuthService.hasRole('CUSTOMER') },
                disable: () => { return this.globals.disableNavigation }
            },
            {
                getRoot: () => { return "CustomerSettingsPage"; },
                getRootParams: () => { return {} },
                getTitle: () => { return "Configurações"; },
                getUrlPath: () => { return "settings" },
                getIcon: () => { return "settings"; },
                getBadge: () => { return 0; },
                canShow: () => { return MarsAuthService.hasRole('CUSTOMER') },
                disable: () => { return this.globals.disableNavigation }
            },
            {
                getRoot: () => { return "AboutPage"; },
                getRootParams: () => { return {} },
                getTitle: () => { return "Sobre"; },
                getUrlPath: () => { return "about" },
                getIcon: () => { return "information-circle"; },
                getBadge: () => { return 0; },
                canShow: () => { return true; },
                disable: () => { return this.globals.disableNavigation }
            }
        ];

        this.globals.mainPages = pages;
        return pages;
    }
}