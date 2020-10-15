/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy } from "@angular/core";

import { App, IonicPage, NavController, Platform } from "@ionic/angular";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsNavigationService } from "@services/navigation.service";
import { MarsInteractionService } from "@services/interaction.service";

import { Backend } from "@backend/index";
import { MarsAuthService } from "@services/auth.service";

@IonicPage({ priority: "high" })
@Component({
    selector: "page-password-update",
    templateUrl: "password-update.html"
})

export class PasswordUpdatePage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;

    user: any = {};

    constructor(public navCtrl: NavController,
        public app: App,
        public locales: AppLocales,
        public globals: AppGlobals,
        public interactionService: MarsInteractionService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    async update() {
        let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
        try {
            await Backend.updatePassword({ xAccessToken: MarsAuthService.getMarsToken(), user: this.user });
        } catch (e) {
            this.interactionService.alert(this.translations.whoops_check_the_credentials_and_try_again);
        } finally {
            spinner.dismiss();
        }
    }
}
