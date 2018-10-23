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

@IonicPage({ priority: "high" })
@Component({
    selector: "page-loading",
    templateUrl: "loading.html",
})

export class LoadingPage {
    constructor(platform: Platform,
        locales: AppLocales,
        globals: AppGlobals) {
    }
}
