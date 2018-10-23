/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";

import { App, IonicPage, NavController, Platform } from "ionic-angular";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsNavigationService } from "@services/navigation.service";
import { MarsInteractionService } from "@services/interaction.service";

import { Backend } from "@backend/index";

@IonicPage({
    segment: "password-recovery"
})
@Component({
    selector: "page-password-recovery",
    templateUrl: "password-recovery.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PasswordRecoveryPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;
    user: any = {};

    constructor(private changeDetector: ChangeDetectorRef,
        private navCtrl: NavController,
        private app: App,
        private locales: AppLocales,
        private globals: AppGlobals,
        private interactionService: MarsInteractionService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    async recover(email: string) {
        let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
        try {
            await Backend.recoverPassword({ email: email });
            this.interactionService.alert(this.translations.an_password_recovery_email_has_been_sent_to_you);
            this.navigationService.setRoot("LoginPage");
        } catch (e) {
            console.log(e);
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            spinner.dismiss();
            this.changeDetector.detectChanges();
        }
    }
}
