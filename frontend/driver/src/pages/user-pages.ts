/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Injectable } from "@angular/core";
import { AppGlobals } from "@app/app.globals";
import { MarsAuthService } from "@services/auth.service";

@Injectable()
export class AppUserPages {

    constructor(private globals: AppGlobals) {
        this.init();
    };

    init() {
        this.globals.userPages = [
            { roles: ["MERCHANT"], name: "profile", icon: "contact", page: "MerchantBasicInformationPage" },
            { roles: ["MERCHANT"], name: "contact", icon: "globe", page: "MerchantContactInformationPage" },
            { roles: ["MERCHANT"], name: "location", icon: "pin", page: "MerchantLocationInformationPage" }
        ];
    }

    getPagesFor(roles) {
        return this.globals.userPages.filter((page, pageIndex) => {
            return roles.some((role) => {
                return page.roles.indexOf(role) >= 0;
            });
        });
    }

    getUserRoles() {
        if (!MarsAuthService.isLoggedIn()) return false;
        return MarsAuthService.getLoggedInUser().roles;
    }

    getCurrentStep() {
        if (!MarsAuthService.isLoggedIn()) return false;
        return MarsAuthService.getLoggedInUser().signupStep;
    }

    getCurrentStepIndex(): number {
        if (!MarsAuthService.isLoggedIn()) return 0;
        let pages = this.getPagesFor(this.getUserRoles());
        let step = this.getCurrentStep();
        let stepIndex = 0;
        pages.map((current, index) => { if (current.page == step) stepIndex = index; });
        return stepIndex;
    }

    getNextStepFor(roles, page) {
        let pages = this.getPagesFor(roles);
        let nextStep = 0;
        pages.forEach((current, index) => { if (current.page == page) nextStep = (index + 1); });
        return pages[nextStep] ? pages[nextStep].page : "finished";
    }

    getPreviousStepFor(roles, page) {
        let pages = this.getPagesFor(roles);
        let nextStep = 0;
        pages.forEach((current, index) => { if (current.page == page) nextStep = (index - 1); });
        return pages[nextStep] ? pages[nextStep].page : "LoginPage";
    }
}