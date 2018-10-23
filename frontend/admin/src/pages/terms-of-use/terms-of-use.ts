/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { App, IonicPage, NavController, Platform } from "ionic-angular";
import { AppLocales } from "@app/app.locales";
import { MarsNavigationService } from "@services/navigation.service";

@IonicPage({
    segment: "terms"
})
@Component({
    selector: "page-terms-of-use",
    templateUrl: "terms-of-use.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TermsOfUsePage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;

    constructor(private changeDetector: ChangeDetectorRef,
        private platform: Platform,
        private app: App,
        private navCtrl: NavController,
        private locales: AppLocales) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }
}
