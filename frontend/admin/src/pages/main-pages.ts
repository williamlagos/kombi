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
import { MarsCartService } from "@services/cart.service";
import { MarsAuthService } from "@services/auth.service";

declare var Mars;

@Injectable()
export class AppMainPages {

    constructor(private platform: Platform,
        private globals: AppGlobals,
        private notificationService: MarsPushNotificationService,
        private cartService: MarsCartService) { };

    refresh() {
        let pages = [
            {
                getRoot: () => { return "LoginPage"; },
                getRootParams: () => { return {} },
                getTitle: () => { return "Entrar"; },
                getUrlPath: () => { return "app" },
                getIcon: () => { return "la-user"; },
                getBadge: () => { return 0; },
                canShow: () => { return !MarsAuthService.isLoggedIn(); },
                disable: () => { return this.globals.disableNavigation }
            },
            {
                getRoot: () => { return "AboutPage"; },
                getRootParams: () => { return {} },
                getTitle: () => { return "Sobre"; },
                getUrlPath: () => { return "app" },
                getIcon: () => { return "la-info-circle"; },
                getBadge: () => { return 0; },
                canShow: () => { return !MarsAuthService.isLoggedIn(); },
                disable: () => { return this.globals.disableNavigation }
            },
            {
                getRoot: () => { return "CatalogueCategoriesPage"; },
                getRootParams: () => { return { category: "root" } },
                getTitle: () => { return "Produtos"; },
                getUrlPath: () => { return "catalogue" },
                getIcon: () => { return "la-cube"; },
                getBadge: () => { return 0; },
                canShow: () => { return MarsAuthService.hasRole("ADMIN") },
                disable: () => { return this.globals.disableNavigation }
            },
            {
                getRoot: () => { return "CataloguePendingItemsPage"; },
                getRootParams: () => { return {} },
                getTitle: () => { return "Submissões"; },
                getUrlPath: () => { return "pending" },
                getIcon: () => { return "la-exchange"; },
                getBadge: () => { return 0; },
                canShow: () => { return MarsAuthService.hasRole("ADMIN") },
                disable: () => { return this.globals.disableNavigation }
            },
            {
                getRoot: () => { return "UsersListPage"; },
                getRootParams: () => { return {} },
                getTitle: () => { return "Usuários"; },
                getUrlPath: () => { return "users" },
                getIcon: () => { return "la-users"; },
                getBadge: () => { return 0; },
                canShow: () => { return MarsAuthService.hasRole("ADMIN") },
                disable: () => { return this.globals.disableNavigation }
            },
            {
                getRoot: () => { return "SubscriptionPlansListPage"; },
                getRootParams: () => { return {} },
                getTitle: () => { return "Planos (Assinatura)"; },
                getUrlPath: () => { return "subscription" },
                getIcon: () => { return "la-th-list"; },
                getBadge: () => { return 0; },
                canShow: () => { return MarsAuthService.hasRole("ADMIN") },
                disable: () => { return this.globals.disableNavigation }
            },
            {
                getRoot: () => { return "AdminSettingsPage"; },
                getRootParams: () => { return {} },
                getTitle: () => { return "Configurações"; },
                getUrlPath: () => { return "settings                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    " },
                getIcon: () => { return "la-cog"; },
                getBadge: () => { return 0; },
                canShow: () => { return MarsAuthService.hasRole("ADMIN") },
                disable: () => { return this.globals.disableNavigation }
            }
        ];

        this.globals.rootTabs = pages;

        return pages;
    }
}