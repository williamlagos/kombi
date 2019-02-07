/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Platform } from "ionic-angular";
import { IonicPage } from "ionic-angular";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";
import { AppConstants } from "@app/app.constants";

@IonicPage({
    segment: "content",
    priority: "high"
})

@Component({
    selector: "page-about",
    templateUrl: "about.html"
})

export class AboutPage {

    translations: AppTranslations;

    constructor(public platform: Platform,
        public locales: AppLocales,
        public globals: AppGlobals) {
        this.translations = this.locales.load();
    }
}
