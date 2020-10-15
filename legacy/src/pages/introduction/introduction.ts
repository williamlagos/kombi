/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ViewChild } from "@angular/core";
import { App, Platform, NavController } from "ionic-angular";
import { IonicPage } from "ionic-angular";
import { Slides } from "ionic-angular";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";
import { AppConstants } from "@app/app.constants";
import { MarsNavigationService } from "@services/navigation.service";
import { MarsAuthService } from "@services/auth.service";

@IonicPage({
    segment: "hello",
    priority: "high"
})
@Component({
    selector: "page-introduction",
    templateUrl: "introduction.html",
})

export class IntroductionPage {

    navigationService: MarsNavigationService;

    @ViewChild("slides") slides: Slides;
    contents: Array<any>;
    translations: AppTranslations;
    showStart: boolean;
    customerSteps = [
        { icon: 'pin', text: 'customer_app_step_one' },
        { icon: 'cash', text: 'customer_app_step_two' },
        { icon: 'cart', text: 'customer_app_step_three' },
        { icon: 'paper-plane', text: 'customer_app_step_four' },
        { icon: 'checkbox-outline', text: 'customer_app_step_five' },
    ];
    merchantSteps = [
        { icon: 'pin', text: 'merchant_app_step_one' },
        { icon: 'cart', text: 'merchant_app_step_two' },
        { icon: 'wifi', text: 'merchant_app_step_three' },
        { icon: 'stats', text: 'merchant_app_step_four' },
        { icon: 'trending-up', text: 'merchant_app_step_five' },
    ];

    public static INTRODUCTION_STATUS = AppConstants.CODENAME.toUpperCase() + "_INTRODUCTION_STATUS";

    constructor(public platform: Platform,
        public app: App,
        public locales: AppLocales,
        public navCtrl: NavController,
        public authService: MarsAuthService,
        public globals: AppGlobals) {
        this.navigationService = new MarsNavigationService(this.app);
        this.navigationService.setNavCtrl(this.navCtrl);
        this.translations = this.locales.load();
        this.contents = [
            {
                picture: 'assets/images/introduction/1.jpg'
            },
            {
                picture: 'assets/images/introduction/2.jpg'
            }
        ]
    }

    ionViewCanEnter() {
        if (MarsAuthService.isLoggedIn()) {
            this.navigationService.setRoot('HomePage');
            return false;
        }
    }

    ionViewWillEnter() {
        /* if (localStorage[IntroductionPage.INTRODUCTION_STATUS]) this.navigationService.setRoot('HomePage'); */
    }

    ionViewDidEnter() {
        this.init();
    }

    ionViewDidLeave() {
    }

    init() {
        localStorage[IntroductionPage.INTRODUCTION_STATUS] = "already_seen";
        /*         setTimeout(() => {
                 let swiper = this.slides.getNativeElement();
                 let distance = 0;
                 let shouldSwipe = (e) => {
                     distance = e.deltaY;
                     if (distance > 100)
                         this.slides.slideNext();
                     if (distance < -100)
                         this.slides.slidePrev();
                 };
                 // swiper.addEventListener("mousewheel", shouldSwipe);
                 swiper.addEventListener("wheel", shouldSwipe);
             }, 1000); */

        setTimeout(() => {
            this.showStart = true;
        }, 2000);
    }

    skipIntro() {

    };
}
