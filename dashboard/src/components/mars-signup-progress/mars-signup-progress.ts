/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Signup pages progress component.
 */

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";

import { AppUserPages } from '@pages/user-pages';

import { MarsAuthService } from "@services/auth.service";
import { AppGlobals } from "@app/app.globals";

@Component({
    selector: "mars-signup-progress",
    templateUrl: "mars-signup-progress.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MarsSignupProgressComponent {

    pages = [];
    currentPage = {};
    currentPageIndex;

    constructor(private changeDetector: ChangeDetectorRef,
        private userInformationPages: AppUserPages,
        private globals: AppGlobals,
        private authService: MarsAuthService) {
        this.init();
    }

    init() {
        if (!MarsAuthService.isLoggedIn()) return;
        let role = MarsAuthService.getLoggedInUser().roles;
        this.pages = this.userInformationPages.getPagesFor(role);
        this.currentPageIndex = this.userInformationPages.getCurrentStepIndex();
    }
}
