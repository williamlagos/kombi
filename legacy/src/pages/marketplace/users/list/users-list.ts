/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from "@angular/core";

import { App, IonicPage, NavController, PopoverController, Platform } from "@ionic/angular";

import { PaginationInstance } from "ngx-pagination";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";

import { Backend } from "@backend/index";
import { MarsAuthService } from "@services/auth.service";
import { AppConstants } from "@app/app.constants";

@IonicPage({
    segment: "users-list",
    priority: "high"
})
@Component({
    selector: "page-users-list",
    templateUrl: "users-list.html",
})

export class UsersListPage {

    translations: AppTranslations;
    users: Array<any>;
    role: string = AppConstants.MERCHANT_ROLE;
    keyword: string = "";
    roles = [AppConstants.MERCHANT_ROLE, AppConstants.CUSTOMER_ROLE, AppConstants.ADMIN_ROLE]
    config: PaginationInstance = {
        itemsPerPage: 4,
        currentPage: 1
    };

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public popoverCtrl: PopoverController,
        public zone: NgZone,
        public changeDetector: ChangeDetectorRef,
        public locales: AppLocales,
        public globals: AppGlobals,
        public interactionService: MarsInteractionService,
        public navigationService: MarsNavigationService,
    ) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = locales.load();
        this.getUsers();
    }

    ionViewCanEnter() {
        return this.navigationService.authCheck(UsersListPage.name, ['admin']);
    }

    onSearchInputChange() {
        this.getUsers();
    }

    async refreshUsers(currentPage) {
        this.config.currentPage = currentPage;
        delete this.users;
        this.getUsers();
    }

    async getUsers() {
        this.zone.run(async () => {
            if (!MarsAuthService.hasRole("ADMIN")) return;
            try {
                let data = (await Backend.getUsersAsAdmin({
                    role: this.role,
                    keyword: this.keyword,
                    pageSize: this.config.itemsPerPage,
                    page: this.config.currentPage - 1,
                    xAccessToken: MarsAuthService.getMarsToken()
                })).data;
                this.users = data.users;
                this.config.totalItems = data.count;
            } catch (e) {
                this.interactionService.alert(this.translations.server_failure);
                this.users = [];
            } finally {
                this.changeDetector.detectChanges();
            }
        });

    }

    showOptionsFor($event: any, user: any) {
        let popover = this.popoverCtrl.create("UserOptionsMenu", { user: user });
        popover.present({ ev: $event });
        popover.onDidDismiss((data) => {
            this.getUsers();
        });
    }

    redirectToMerchantDetailsPageFor(merchant: any) {
        this.navigationService.goTo("MerchantDetailsPage")
    }
}
