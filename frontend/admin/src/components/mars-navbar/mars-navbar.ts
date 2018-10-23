/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Responsive navbar component.
 */

import { Tabs } from "ionic-angular";

import { Component } from "@angular/core";
import { Injectable } from "@angular/core";
import { ViewChild } from "@angular/core";

import { AppGlobals } from "@app/app.globals";
import { AppConstants } from "@app/app.constants";
import { AppMainPages } from "@pages/main-pages";

import { MarsAuthService } from "@services/auth.service";
import { MarsViewService } from "@services/view.service";
import { MarsMobileKeyboardService } from "@services/mobile-keyboard.service";

declare var Mars;

@Component({
    selector: "mars-navbar",
    templateUrl: "mars-navbar.html"
})

@Injectable()
export class MarsNavbarComponent {

    @ViewChild("tabs") tabs: Tabs;

    VRANA_HUB_URL = "http://vrana.com.br";
    VRANA_HUB_TEXT = `Feito com <span text-color="danger">❤</span> por <a href="${this.VRANA_HUB_URL}" target="_blank">Vrana Hub</a>`;
    VRANA_HUB_ICON = `<a href="${this.VRANA_HUB_URL}" target="_blank" rel="nolooper"><img src="assets/images/vrana.png"/></a>`;

    scrollLeft: boolean;
    footerText: string;

    constructor(public globals: AppGlobals,
        public authService: MarsAuthService,
        public pages: AppMainPages) {
        pages.refresh();
    }

    public screenIsDesktopSized() {
        return MarsViewService.screenIsDesktopSized();
    }

    public toggleDrawer() {
        this.scrollLeft = !this.scrollLeft;
    }

    getFooterText() {
        if (this.scrollLeft)
            return this.VRANA_HUB_ICON;
        else
            return Mars.UI.sidemenuFooterText || this.VRANA_HUB_TEXT;
    }
}
