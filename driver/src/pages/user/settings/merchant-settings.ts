/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectionStrategy, Component, ChangeDetectorRef, NgZone } from "@angular/core";

import { IonicPage } from "ionic-angular";
import { Platform } from "ionic-angular";
import { App } from "ionic-angular";
import { NavController } from "ionic-angular";
import { NavParams } from "ionic-angular";

import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsMapMarkerService } from "@services/geolocation/marker.service";
import { MarsNearByService } from "@services/geolocation/nearby.service";
import { MarsNavigationService } from "@services/navigation.service";
import { MarsViewService } from "@services/view.service";
import { AppUserPages } from "@pages/user-pages";
import { Backend } from "@backend/index";

@IonicPage({
    segment: "merchant-settings"
})
@Component({
    selector: "page-merchant-settings",
    templateUrl: "merchant-settings.html"
})
export class MerchantSettingsPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;
    token: string;
    settings: Array<any>;

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public navParams: NavParams,
        public changeDetector: ChangeDetectorRef,
        public locales: AppLocales,
        public interactionService: MarsInteractionService,
        public authService: MarsAuthService,
        public globals: AppGlobals,
        public signupPages: AppUserPages,
        public nearbyService: MarsNearByService,
        public zone: NgZone) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    ionViewCanEnter() {
        return this.navigationService.authCheck(MerchantSettingsPage.name, ['merchant']);
    }

    ionViewWillEnter() {
        if (!MarsAuthService.hasRole('MERCHANT')) return;
        this.token = MarsAuthService.getMarsToken();
        let infoPages = [
            { name: "change_password", icon: "lock", page: "PasswordUpdatePage" }
        ];
        this.settings = this.globals.userPages.concat(infoPages);
        this.changeDetector.detectChanges();
    }

    logout() {
        this.interactionService.confirm(
            this.translations.do_you_really_want_to_logout,
            [{ text: this.translations.cancel, role: "cancel", handler: () => { } },
            {
                text: this.translations.logout, cssClass: "strong", handler: () => {
                    this.authService.logout(() => {
                        setTimeout(()=>{
                            this.navigationService.setRoot("HomePage");
                        }, 500);
                    });
                }
            }]);
    }

    deactivateAccount() {
        let deactivate = async () => {
            let spinner = this.interactionService.spinner({ content: `${this.translations.loading}...` });
            setTimeout(() => {
                spinner.dismiss();
            });
        };
        this.interactionService.confirm(this.translations.do_you_really_want_to_deactivate_your_account,
            [{ text: this.translations.no, role: "cancel", handler: () => { } },
            { text: this.translations.yes, cssClass: "strong", handler: deactivate }])
    }
}
