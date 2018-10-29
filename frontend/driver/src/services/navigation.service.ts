/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Navigation service.
 */

import { Injectable } from "@angular/core";
import { App, NavController, Tabs } from "ionic-angular";

import { AppConstants } from "@app/app.constants";
import { MarsAuthService } from "./auth.service";

@Injectable()
export class MarsNavigationService {
    navCtrl: NavController;

    static ROOT_PAGE_INDEX = 0;
    static AUTH_PAGE_REDIRECT = AppConstants.NAME.toUpperCase() + "_AUTH_PAGE_REDIRECT";
    _authRedirectPage;

    constructor(public app: App) { }

    setNavCtrl(navCtrl: NavController) {
        this.navCtrl = navCtrl;
    }

    navControllerIsDefined() {
        if (this.navCtrl) {
            return true;
        } else {
            console.warn(MarsNavigationService.name + ": Please, remember to call this.navigationService.setNavCtrl(this.navCtrl) after you instance the service ;)");
            return false;
        }
    }

    isActive(pageName: string) {
        return (this.navCtrl.getActive().name === pageName);
    }

    goBack() {
        if (this.navCtrl.canGoBack())
            this.navCtrl.pop();
        else
            this.navCtrl.goToRoot({});
    }

    goTo(page, params?: any, animation?: any) {
        if (this.navControllerIsDefined()) this.navCtrl.push(page, params, animation);
    }

    goToRootPage(params?: any, animation?: any) {
        if (this.navControllerIsDefined()) {
            this.setRoot('HomePage');
            let activeNav = this.app.getActiveNavs()[0];
            if (activeNav.getType() == "tab") {
                let rootNav = this.app.getRootNavs()[0];
                let tabs = (rootNav._children[0] as Tabs);
                tabs.select(0);
            }
        }
    }

    setRoot(page, params?: any, animation?: any) {
        this.app.getRootNavs()[0].setRoot(page, params, animation);
    }

    insertPageOnNavigationStack(navCtrl: NavController, index: number, page: any) {
        if (this.navControllerIsDefined())
            navCtrl.insert(index, page);
    }

    canGoBack() {
        return this.navCtrl.canGoBack();
    };

    authCheck(page: string, roles?: Array<string>) {

        /* User is not logged in */
        if (!MarsAuthService.isLoggedIn()) {
            localStorage[MarsNavigationService.AUTH_PAGE_REDIRECT] = page;
            this.setRoot("LoginPage", { token: "access" });
            return false;
        }

        // Clears the page redirect for future authentications
        delete localStorage[MarsNavigationService.AUTH_PAGE_REDIRECT];

        /* User has finished the signup process */
        if (!MarsAuthService.finishedSignup()) {
            this.setRoot(MarsAuthService.getLoggedInUser().signupStep);
            return false;
        }

        /* User has the proper permissions */
        if (roles) {
            let hasPermissions = false;
            roles.map((role) => { if (MarsAuthService.hasRole(role.toUpperCase())) hasPermissions = true; });
            if (!hasPermissions) {
                if (this.canGoBack()) this.goBack(); // In case there are any views to return
                else this.setRoot('HomePage'); // Otherwise, fallsback to the root page
                return false;
            }
        }
    }
}
