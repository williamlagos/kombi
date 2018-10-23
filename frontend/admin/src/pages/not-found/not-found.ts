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

@IonicPage({
    segment: "404"
})
@Component({
    selector: "page-not-found",
    templateUrl: "not-found.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotFoundPage {
    constructor(private platform: Platform,
        private locales: AppLocales,
        private globals: AppGlobals) {
    }
}
