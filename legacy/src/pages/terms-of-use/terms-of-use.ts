/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy } from "@angular/core";
import { App, IonicPage, NavController, Platform } from "@ionic/angular";
import { AppLocales } from "@app/app.locales";
import { MarsNavigationService } from "@services/navigation.service";

@IonicPage({ priority: "high" })
@Component({
    selector: "page-terms-of-use",
    templateUrl: "terms-of-use.html",
})

export class TermsOfUsePage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public locales: AppLocales) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }
}
