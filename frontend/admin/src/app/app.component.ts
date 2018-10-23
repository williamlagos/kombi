/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Application component.
 */

declare var window;

import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { App } from "ionic-angular";
import { AppConstants } from "@app/app.constants";

@Component({
    templateUrl: "app.html",
    providers: [],
})

export class MyApp {
    /* private rootPage = MarsAuthService.isLoggedIn() ? "HomePage" : "IntroductionPage"; */
    private rootPage = "HomePage";

    constructor(private platform: Platform,
        private app: App) {
        platform.ready().then(async () => {
            this.app.viewWillEnter.subscribe((view) => { this.updatePageTitleFor(view); });
            setTimeout(() => {
                document.querySelector('[splashscreen]').remove(); 
            }, 2000);
            if (window.cordova) { 
                window.StatusBar.styleDefault();
                window.StatusBar.show();
                window.StatusBar.backgroundColorByHexString(AppConstants.DARKER_SECONDARY_COLOR);
            };
        });
    }

    updatePageTitleFor(view: any) {
        let title = document.querySelector("title");
        if (view && view._nav && view._nav.tabTitle) {
            title.innerHTML = view._nav.tabTitle;
        } else {
            title.innerHTML = AppConstants.NAME;
        }
    }
}
