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
        let params = new URLSearchParams(window.location.search);
        this.confirmationCode = this.navParams.get("token");
        if (this.confirmationCode !== "access" && this.confirmationCode !== "admin")
            this.confirmUserEmail();
    }

    ionViewDidEnter() {
        if (this.platform.is("cordova")) {
            /*  this.splashscreen.hide();
              this.statusbar.show();
              this.statusbar.styleLightContent();
               this.statusbar.backgroundColorByHexString(AppConstants.DARKER_PRIMARY_COLOR); */
        }
    }

    async confirmUserEmail() {
        /* this.zone.run(async () => {
            let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
            try {
                (await Backend.confirmUserEmail({ confirmation: this.confirmationCode })).data;
                this.interactionService.alert(this.translations.your_email_has_been_confirmed_successfully);
            } catch (e) {
                this.interactionService.alert(this.translations.whoops_check_the_credentials_and_try_again)
            } finally {
                this.changeDetector.detectChanges();
                spinner.dismiss();
            }
        }); */
    };

    async login() {
        this.zone.run(async () => {
            let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
            try {
                let user = (await Backend.authenticateUser({ user: this.user })).data;
                this.storeUserData(user);
                if (user.signupStep == "finished") this.navigationService.setRoot('HomePage')
                else this.navigationService.setRoot(user.signupStep);
                let redirect = localStorage[MarsNavigationService.AUTH_PAGE_REDIRECT];
                if (redirect) this.app.getActiveNav().push(redirect);
            } catch (e) {
                this.interactionService.alert(this.translations.whoops_check_the_credentials_and_try_again)
            } finally {
                this.changeDetector.detectChanges();
                spinner.dismiss();
            }
        });
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

    async accessWithFacebook() {
        this.zone.run(async () => {
            let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
            try {
                hello.init({ facebook: AppConstants.FACEBOOK_CLIENT_ID }, { redirect_uri: AppConstants.OAUTH_REDIRECT });
                let facebook = await hello.login("facebook", this.facebookParams)
                let access_token = facebook && facebook.authResponse && facebook.authResponse.access_token ? facebook.authResponse.access_token : undefined;
                let data = (await Backend.accessWithFacebook({ accessToken: access_token })).data;
                if (data.created) {
                    this.globals.currentOauthUser = data.created;
                    this.storeUserData(data.created);
                    this.navigationService.goTo('CustomerBasicInformationPage');
                } else {
                    this.storeUserData(data);
                    this.navigationService.goToRootPage();
                }
            } catch (e) {
                if (e && e.status == 401) this.interactionService.alert(this.translations.error_duplicated_email);
            } finally {
                this.changeDetector.detectChanges();
                spinner.dismiss();
            }
        });

    }

    storeUserData(user) {
        MarsAuthService.setLoggedInUser(user);
        MarsAuthService.setMarsToken(user.token);
    }
}

