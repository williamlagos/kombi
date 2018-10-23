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
    constructor(public globals: AppGlobals) {
        this.init();
    };

    public init() {
        this.globals.adminInfoPages = [];
        this.globals.customerInfoPages = [
            { name: "contact", icon: "globe", page: "CustomerProfileInformationPage" },
            { name: "location", icon: "pin", page: "CustomerLocationInformationPage" }
        ];
        let customerBasics = { name: "profile", icon: "contact", page: "CustomerBasicInformationPage" };
        if (!MarsAuthService.isLoggedIn()) {
            this.globals.customerInfoPages.unshift(customerBasics);
        }
    }

    public getPagesFor(role) {
        return this.globals[`${role.toLowerCase()}InfoPages`];
    }

    getUserRole() {
        if (!MarsAuthService.isLoggedIn()) return false;
        return MarsAuthService.getLoggedInUser().role;
    }

    getCurrentStep() {
        if (!MarsAuthService.isLoggedIn()) return false;
        return MarsAuthService.getLoggedInUser().signupStep;
    }

    public getCurrentStepIndex(): number {
        if (!MarsAuthService.isLoggedIn()) return 0;
        let pages = this.getPagesFor(this.getUserRole());
        let step = this.getCurrentStep();
        let stepIndex = 0;
        pages.map((current, index) => { if (current.page == step) stepIndex = index; });
        return stepIndex;
    }

    public getNextStepFor(role, page) {
        let pages = this.getPagesFor(role);
        let nextStep = 0;
        pages.forEach((current, index) => { if (current.page == page) nextStep = (index + 1); });
        return pages[nextStep] ? pages[nextStep].page : "finished";
    }

    public getPreviousStepFor(role, page) {
        let pages = this.getPagesFor(role);
        let nextStep = 0;
        pages.forEach((current, index) => { if (current.page == page) nextStep = (index - 1); });
        return pages[nextStep] ? pages[nextStep].page : "LoginPage";
    }
}