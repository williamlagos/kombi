/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Application component.
 */

import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { App } from "@ionic/angular";

import { AppConstants } from "@app/app.constants";
import { MarsAuthService } from "@services/auth.service";
import { MarsGeolocationService } from "@services/geolocation/geolocation.service";

@Component({
    templateUrl: "app.html",
    providers: [],
})

export class MyApp {
    /* rootPage = MarsAuthService.isLoggedIn() ? "HomePage" : "IntroductionPage"; */
    rootPage = "HomePage";

    constructor(public platform: Platform,
        public app: App,
        public geolocationService: MarsGeolocationService) {
        platform.ready().then(async () => {
            this.app.viewWillEnter.subscribe((view) => { this.updatePageTitleFor(view); });
            setTimeout(() => {
                document.querySelector('[splashscreen]').remove(); // Removes the HTML splashscreen
            }, 2000);
            if (platform.is("cordova")) { // Okay, so the platform is ready and our plugins are available.
                /* statusbar.styleDefault(); // Here you can do any higher level native things you might need.
               splahscreen.hide();
               statusbar.show();
              statusbar.backgroundColorByHexString(AppConstants.DARKER_primary_color); */
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
