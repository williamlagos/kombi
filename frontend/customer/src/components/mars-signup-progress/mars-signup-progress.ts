/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Signup pages progress component.
 */

import { Component } from "@angular/core";

import { AppUserPages } from '@pages/user-pages';

import { MarsAuthService } from "@services/auth.service";
import { AppGlobals } from "@app/app.globals";

@Component({
    selector: "mars-signup-progress",
    templateUrl: "mars-signup-progress.html"
})

export class MarsSignupProgressComponent {

    pages = [];
    currentPage = {};
    currentPageIndex;

    constructor(public signupPages: AppUserPages,
        public globals: AppGlobals,
        public authService: MarsAuthService) {
        this.init();
    }

    init() {
        if (!MarsAuthService.isLoggedIn()) return;
        let role = MarsAuthService.getLoggedInUser().role;
        this.pages = this.signupPages.getPagesFor(role);
        this.currentPageIndex = this.signupPages.getCurrentStepIndex();
    }
}
