/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from "@angular/core";

import { App, IonicPage, NavController, NavParams, Platform } from "ionic-angular";

import { Backend } from "@backend/index";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";
import { AppConstants } from "@app/app.constants";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";

import { MarsNavigationService } from "@services/navigation.service";

declare var StatusBar;
declare var window: any;
declare var hello: any;

@IonicPage({
    segment: "auth"
})
@Component({
    selector: "page-login",
    templateUrl: "login.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginPage {

    navigationService: MarsNavigationService;
    translations: AppTranslations;

    user: any = {};
    confirmationCode: string;
    package: string;
    signupPage: string;
    defaultOauthParams = { popup: { "location": "no" } };
    facebookParams = Object.assign(this.defaultOauthParams, { scope: ["_profile", "user_work_history", "email"] });
    linkedinParams = Object.assign(this.defaultOauthParams, { scope: ["email"] });
    twitterParams = Object.assign(this.defaultOauthParams, { scope: ["email"] });

    constructor(private navCtrl: NavController,
        private navParams: NavParams,
        private platform: Platform,
        private app: App,
        private zone: NgZone,
        private changeDetector: ChangeDetectorRef,
        private locales: AppLocales,
        private globals: AppGlobals,
        private interactionService: MarsInteractionService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    ionViewCanEnter() {
        if (MarsAuthService.isLoggedIn())
            return this.navigationService.canGoBack() ? this.navigationService.goBack : this.navigationService.setRoot('HomePage');
    }

    ionViewWillEnter() {
        this.signupPage = "AdminBasicInformationPage";
        this.changeDetector.detectChanges();
    }

    ionViewDidEnter() {
        if (window.cordova) {
            StatusBar.show();
            StatusBar.styleLightContent();
            StatusBar.backgroundColorByHexString(AppConstants.DARKER_SECONDARY_COLOR);
        }
    }


    async login() {
        this.zone.run(async () => {
            let spinner = this.interactionService.spinner({ content: this.translations.loading + "..." });
            try {
                let user = (await Backend.authenticateUser({ user: this.user })).data;
                this.storeUserData(user);
                if (user.signupStep == "finished") window.location.reload();
                else this.navigationService.setRoot(user.signupStep);
            } catch (e) {
                this.interactionService.alert(this.translations.whoops_check_the_credentials_and_try_again)
            } finally {
                spinner.dismiss();
                this.changeDetector.detectChanges();
            }
        });
    }

    goToSignupPage() {
        this.navigationService.setRoot(this.signupPage);
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
                    let created = data.created;
                    created.signupStep = "CustomerBasicInformationPage";
                    this.globals.currentOauthUser = created;
                    this.storeUserData(created);
                    this.navigationService.goTo(created.signupStep);
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
        console.log(user);
        MarsAuthService.setLoggedInUser(user);
        MarsAuthService.setMarsToken(user.token);
    }
}

