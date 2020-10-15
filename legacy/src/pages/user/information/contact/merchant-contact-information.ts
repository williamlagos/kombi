/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from "@angular/core";

import { App, IonicPage, NavController, Platform } from "@ionic/angular";

import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";
import { MarsPictureService } from "@services/picture.service";

import { Backend } from "@backend/index";
import { AppUserPages } from "@pages/user-pages";
import { Form, NgModel } from "@angular/forms";

@IonicPage({ priority: "high" })
@Component({
    selector: "page-merchant-contact-information",
    templateUrl: "merchant-contact-information.html",
})

export class MerchantContactInformationPage {

    @ViewChild("username") usernameInput: NgModel;
    paymentModes: Array<any>;
    navigationService: MarsNavigationService;
    translations: AppTranslations;
    isCheckingUsername: boolean;
    isUniqueUsername: boolean;
    previousStep: string;
    nextStep: string;
    userDataForm;
    spinner: any;
    user: any = {
        role: AppConstants.CUSTOMER_ROLE,
        documents: [{ type: "CPF", number: "" }],
        address: {},
        paymentData: {},
        pictures: []
    };

    fileInputProperties = {
        dropText: " ",
        browseText: "Selecionar",
        removeText: "Remove",
        invalidFileText: "You have picked an invalid or disallowed file.",
        invalidFileTimeout: 8000,
        removable: true,
        multiple: false,
        showPreviews: true,
        extensions: ["jpg"],
    };

    changingPicture: boolean;

    constructor(public platform: Platform,
        public app: App,
        public navCtrl: NavController,
        public zone: NgZone,
        public changeDetector: ChangeDetectorRef,
        public locales: AppLocales,
        public authService: MarsAuthService,
        public globals: AppGlobals,
        public signupPages: AppUserPages,
        public interactionService: MarsInteractionService,
        public pictureService: MarsPictureService) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
    }

    ionViewWillEnter() {
        // In case the user is logged in
        if (this.authService.isLoggedIn()) this.user = this.authService.getLoggedInUser();
        // In case the user returned after starting the signup process
        this.nextStep = this.signupPages.getNextStepFor(this.user.roles, "MerchantContactInformationPage");
        this.previousStep = this.signupPages.getPreviousStepFor(this.user.roles, "MerchantContactInformationPage");
        if (!this.authService.finishedSignup()) this.user.signupStep = this.nextStep;
        // Sets the username based on the e-mail
        this.user.username = this.user.email.split("@")[0].replace(/\./g, "");
        this.getPaymentModes();
    }

    ionViewDidEnter() {
        setTimeout(() => { this.changeDetector.detectChanges(); }, 200);
    }

    async checkUsername(username) {
        let usernameChanged = MarsAuthService.getLoggedInUser().username !== username;
        if (!username || !usernameChanged) return;
        this.isCheckingUsername = true;
        try {
            this.isUniqueUsername = (await Backend.isUniqueUsername({ username: username })).data;
            if (!this.isUniqueUsername) this.usernameInput.control.setErrors({ isUnique: true }); // Sets an error on the form
            else this.usernameInput.control.updateValueAndValidity(); // Removes it
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            this.isCheckingUsername = false;
        }
    }

    getUserPicture() {
        let userHasAPicture = this.userHasAPicture();
        let latestPicture = userHasAPicture ? this.user.pictures[this.user.pictures.length - 1] : "";
        let pictureUrl = userHasAPicture ? this.pictureService.getPictureUrlFor({ _id: latestPicture }) : undefined;
        return userHasAPicture ? `background-image: url(${pictureUrl})` : "background-color: #efefef";
    }

    userHasAPicture() {
        return this.user && this.user.pictures && this.user.pictures.length > 0;
    }

    async addPicture($event) {
        let file = $event.target.files[0];
        if (!file) return;
        this.changingPicture = true;
        let rawURL = URL.createObjectURL(file);
        file = await this.pictureService.properlyRotate(file) as any;
        /* let dimensions = (await this.getPictureDimensions(rawURL) as any); */
        let mustResize = file.size > 800000;
        let scaled = mustResize ? (await this.pictureService.scale(file, 0.2)) : file;
        let picture = { sent: (new Date()).toISOString(), src: rawURL, file: scaled, loading: true };
        this.pictureService.save((picture.file as any), { sent: picture.sent }, (error, saved) => {
            setTimeout(() => (this.changingPicture = false), 2000);
            try {
                if (error) {
                    throw new Error("Error!");
                } else {
                    saved = saved && typeof saved == "string" ? JSON.parse(saved)._id : saved._id;
                    console.log(saved);
                    this.user.pictures.push(saved);
                }
            } catch (e) {
                this.interactionService.alert(this.translations.server_failure);
            }
        });
    }

    numbersOnly(str: string) {
        return str.replace(/\D/g, '');
    }

    getPictureDimensions(url) {
        return new Promise((resolve, reject) => {
            let image = new Image;
            image.onload = function () {
                resolve(image);
            };
            image.src = url;
        });
    }

    async removePicture(index) {
        let picture = this.user.pictures.splice(index, 1)[0];
        let previous = index > 0 ? (index - 1) : 0;
        if (picture) {
            try { await Backend.removePicture({ id: picture._id, xAccessToken: MarsAuthService.getMarsToken() }); } catch (e) { }
        }
    }

    async getPaymentModes() {
        try {
            this.paymentModes = (await Backend.getPaymentModes()).data;
            this.paymentModes = this.paymentModes.filter((mode, index) => mode && !(mode.value == "CASH"));
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
            this.navigationService.goBack();
        } finally {
            this.changeDetector.detectChanges();
        }
    }

    disableNextFor(form): boolean {
        return !form.valid;
    }

    async save() {
        try {
            this.spinner = this.interactionService.spinner({ content: `${this.translations.loading}...` });
            let token = MarsAuthService.getMarsToken();
            let isLoggedIn = this.authService.isLoggedIn();
            let user = isLoggedIn ? (await Backend.updateUser({ user: this.user, xAccessToken: token })).data : (await Backend.createUser({ user: this.user })).data;
            this.storeDataFor(user);
            return MarsAuthService.finishedSignup() ? this.navigationService.goBack() : this.navigationService.goTo(this.nextStep);
        } catch (e) {
            this.interactionService.alert(this.translations.server_failure);
        } finally {
            this.changeDetector.detectChanges();
            this.spinner.dismiss();
        }
    }

    storeDataFor(user) {
        MarsAuthService.setLoggedInUser(user);
        MarsAuthService.setMarsToken(user.token);
    }

    goBack() {
        this.navigationService.setRoot(this.previousStep);
    }
}