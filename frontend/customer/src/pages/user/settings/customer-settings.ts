/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectionStrategy, Component, ChangeDetectorRef, NgZone } from "@angular/core";

import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { App, IonicPage, NavController, NavParams, Platform } from "ionic-angular";

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

@IonicPage({
    segment: "customer-settings"
})
@Component({
    selector: "page-customer-settings",
    templateUrl: "customer-settings.html"
})
export class CustomerSettingsPage {

    translations: AppTranslations;

    settings;

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
        public navigationService: MarsNavigationService,
        public zone: NgZone) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    ionViewWillEnter() {
        let infoPages = [
            { name: "change_password", icon: "lock", page: "PasswordUpdatePage" },
            /*  { name: "about", icon: "information-circle", page: "AboutPage" } */
        ];
        this.settings = this.globals.customerInfoPages.concat(infoPages);
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
}
