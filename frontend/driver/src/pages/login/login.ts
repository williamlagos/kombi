/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from "@angular/core";

import { App, IonicPage, NavController, NavParams, Platform } from "ionic-angular";

import { Backend } from "@backend/index";
import * as querystring from "query-string";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";
import { AppConstants } from "@app/app.constants";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";

import { MarsNavigationService } from "@services/navigation.service";
import { MarsOauthService } from "@services/oauth.service";

declare var window: any;
declare var hello: any;

@IonicPage({
    segment: "login",
    priority: "high"
})
@Component({
    selector: "page-login",
    templateUrl: "login.html",
})

export class LoginPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;

    user: any = {};
    confirmationCode: string;
    defaultOauthParams = { popup: { "location": "no" } };
    facebookParams = Object.assign(this.defaultOauthParams, { scope: ["public_profile", "user_work_history", "email"] });
    linkedinParams = Object.assign(this.defaultOauthParams, { scope: ["email"] });
    twitterParams = Object.assign(this.defaultOauthParams, { scope: ["email"] });

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public platform: Platform,
        public app: App,
        public zone: NgZone,
        public changeDetector: ChangeDetectorRef,
        public locales: AppLocales,
        public globals: AppGlobals,
        public interactionService: MarsInteractionService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    ionViewCanEnter() {
        if (MarsAuthService.isLoggedIn())
            return this.navigationService.canGoBack() ?
                this.navigationService.goBack :
                this.navigationService.setRoot('HomePage');
    }

    ionViewWillEnter() {
        this.changeDetector.detectChanges();
    }

    async login() {
        let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
        try {
            let user = (await Backend.authenticateUser({ user: this.user })).data;
            this.storeUserData(user);
            setTimeout(() => {
                if (user.signupStep == "finished") {
                    this.navigationService.setRoot('HomePage');
                    this.navCtrl.parent.select(0);
                }
                else this.navigationService.setRoot(user.signupStep);
            });
        } catch (e) {
            this.interactionService.alert(this.translations.whoops_check_the_credentials_and_try_again);
        } finally {
            this.changeDetector.detectChanges();
            spinner.dismiss();
        }
    }

    goToSignupPage() {
        if (this.confirmationCode == "admin") // In case the user tries to access as an admin
            this.navigationService.goTo("AdminBasicInformationPage")
        else // Otherwise, prompts for the role
            this.interactionService.prompt(this.translations.i_am, [], [
                { text: this.translations.a_merchant, cssClass: "strong", handler: () => { this.navigationService.goTo("MerchantBasicInformationPage") } },
                { text: this.translations.a_customer, cssClass: "strong", handler: () => { this.navigationService.goTo("CustomerBasicInformationPage") } }
            ]);
    }

    storeUserData(user) {
        MarsAuthService.setLoggedInUser(user);
        MarsAuthService.setMarsToken(user.token);
    }
}

