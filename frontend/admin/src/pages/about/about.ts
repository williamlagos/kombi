/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { Platform } from "ionic-angular";
import { IonicPage } from "ionic-angular";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

@IonicPage({
    segment: "about"
})
@Component({
    selector: "page-about",
    templateUrl: "about.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AboutPage {

    translations: AppTranslations;

    constructor(private changeDetector: ChangeDetectorRef,
        private platform: Platform,
        private locales: AppLocales,
        private globals: AppGlobals) {
        this.translations = this.locales.load();
    }
}
