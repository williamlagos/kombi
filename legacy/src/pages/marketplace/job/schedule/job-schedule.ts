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
    selector: "page-job-schedule",
    templateUrl: "job-schedule.html",
})

export class JobSchedulePage {
    constructor(public platform: Platform,
        public locales: AppLocales,
        public globals: AppGlobals) {
    }
}
