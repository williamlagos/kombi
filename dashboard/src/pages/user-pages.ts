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
           /* Customer Pages */
           { roles: ["CUSTOMER"], name: "profile", icon: "la-user", page: "CustomerProfileInformationPage" },
           { roles: ["CUSTOMER"], name: "location", icon: "la-map-marker", page: "CustomerLocationInformationPage" },
           { roles: ["CUSTOMER"], name: "my_pets", icon: "la-paw", page: "CustomerPetsListPage" },
           { roles: ["CUSTOMER"], name: "payment_methods", icon: "la-credit-card", page: "PaymentInformationPage" },
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