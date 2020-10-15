/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy } from "@angular/core";

import { App, IonicPage, NavController, Platform } from "ionic-angular";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsNavigationService } from "@services/navigation.service";
import { MarsInteractionService } from "@services/interaction.service";

import { Backend } from "@backend/index";

@IonicPage({ priority: "high" })
@Component({
    selector: "page-password-recovery",
    templateUrl: "password-recovery.html",
})

export class PasswordRecoveryPage {

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

    async recover() {
        let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
        try {
            await Backend.recoverPassword({ "user": this.user });
            // this.interactionService.alert(this.translations.an_password_recovery_email_has_been_sent_to_you);
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            spinner.dismiss();
        }
    }
}
