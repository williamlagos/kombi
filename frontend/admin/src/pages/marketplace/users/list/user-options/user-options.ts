/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { NavParams, ViewController } from "ionic-angular";
import { IonicPage } from "ionic-angular";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";

import { Backend } from "@backend/index";
import { MarsAuthService } from "@services/auth.service";
import { AppConstants } from "@app/app.constants";

@IonicPage({
    segment: "user-options"
})
@Component({
    selector: "user-options",
    templateUrl: "user-options.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserOptionsMenu {
    user: any;
    saving: boolean;
    spinner: any;
    token: string;
    translations: AppTranslations;
    roles = ["ADMIN", "MERCHANT", "CUSTOMER"];

    constructor(private viewCtrl: ViewController,
        private navParams: NavParams,
        private zone: NgZone,
        private changeDetector: ChangeDetectorRef,
        private locales: AppLocales,
        private globals: AppGlobals,
        private interactionService: MarsInteractionService) {
        this.translations = locales.load();
        this.user = navParams.data.user;
        this.token = MarsAuthService.getMarsToken();
    }

    async saveRole(user) {
        this.zone.run(async () => {
            this.spinner = this.interactionService.spinner({ content: this.translations.loading });
            try {
                let data = await (Backend.changeUserRole({ id: user._id, role: user.roles, xAccessToken: this.token }));
            } catch (e) {
                this.interactionService.alert(this.translations.server_failure);
            }
            finally {
                this.spinner.dismiss();
                this.changeDetector.detectChanges();
                this.close();
            }
        });
    }

    async deactivate(user) {
        this.zone.run(async () => {
            this.spinner = this.interactionService.spinner({ content: this.translations.loading });
            try {
                let data = await (Backend.deactivateUserAsAdmin({ id: user._id, xAccessToken: this.token }));
            } catch (e) {
                this.interactionService.alert(this.translations.server_failure);
            }
            finally {
                this.spinner.dismiss();
                this.changeDetector.detectChanges();
                this.close();
            }
        });

    }

    async activate(user) {
        this.zone.run(async () => {
            this.spinner = this.interactionService.spinner({ content: this.translations.loading });
            try {
                let data = await (Backend.activateUserAsAdmin({ id: user._id, xAccessToken: this.token }));
            } catch (e) {
                this.interactionService.alert(this.translations.server_failure);
            }
            finally {
                this.spinner.dismiss();
                this.changeDetector.detectChanges();
                this.close();
            }
        });
    }

    close(data?: any) {
        this.viewCtrl.dismiss(data);
    }
}