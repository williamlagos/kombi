/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Application Module.
 */

declare var window;

import { Platform, Config } from "ionic-angular";
import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { IonicApp } from "ionic-angular";
import { ErrorHandler } from "@angular/core";
import { IonicErrorHandler } from "ionic-angular";
import { LOCALE_ID } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";

import { Uploader } from "angular2-http-file-upload/uploader/uploader";

import { MyApp } from "@app/app.component";
import { AppConstants } from "@app/app.constants";
import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";
import { AppUtils } from "@app/app.utils";
import { MarsSocket } from "@app/app.socket";
import { AppMainPages } from "@pages/main-pages";
import { AppUserPages } from "@pages/user-pages";
import { Backend } from "@backend/index";

import { ComponentsModule } from "@components/components.module";
import { MarsNavbarComponent } from "@components/mars-navbar/mars-navbar";
import { DirectivesModule } from "@directives/directives.module";
import { PipesModule } from "@pipes/pipes.module";

import { MarsCartService } from "@services/cart.service";
import { MarsAuthService } from "@services/auth.service";
import { MarsFileUploaderService } from "@services/file-uploader.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";
import { MarsPushNotificationService } from "@services/push-notification.service";
import { MarsViewService } from "@services/view.service";
import { MarsPictureService } from "@services/picture.service";
import { MarsGeolocationService } from "@services/geolocation/geolocation.service";
import { MarsNearByService } from "@services/geolocation/nearby.service";
import { MarsDirectionsService } from "@services/geolocation/directions.service";
import { MarsGeocoderService } from "@services/geolocation/geocoder.service";
import { MarsMapsService } from "@services/geolocation/maps.service";
import { MarsMapMarkerService } from "@services/geolocation/marker.service";
import { MarsInfoWindowService } from "@services/geolocation/infowindow.service";
import { MarsMobileKeyboardService } from "@services/mobile-keyboard.service";

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        IonicModule.forRoot(MyApp, {
            backButtonText: "",
            mode: 'md',
            useHash: false
        }),
        BrowserModule,
        CommonModule,
        ComponentsModule,
        DirectivesModule,
        PipesModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [MyApp],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        { provide: LOCALE_ID, useValue: "pt-BR" },
        AppConstants,
        AppGlobals,
        AppLocales,
        AppMainPages,
        AppUserPages,
        AppUtils,
        MarsSocket,
        MarsCartService,
        MarsAuthService,
        MarsFileUploaderService,
        MarsInteractionService,
        MarsMobileKeyboardService,
        MarsNavigationService,
        MarsPictureService,
        MarsPushNotificationService,
        MarsViewService,
        MarsNavbarComponent,

        MarsGeolocationService,
        MarsMapsService,
        MarsNearByService,
        MarsGeocoderService,
        MarsDirectionsService,
        MarsMapMarkerService,
        MarsInfoWindowService,
        Uploader
    ]
})

export class AppModule {
    constructor(public platform: Platform,
        public config: Config,
        public keyboard: MarsMobileKeyboardService) {
        Backend.setDomain(AppConstants.SERVER_ADDRESS);
        platform.ready().then((readySource) => {
            this.keyboard.initialize();
            if (platform.is("ios")) config.set("spinner", "dots");
            if (window.cordova) {
                console.log("Hi! I'm in cordova mode.");
                (window as any).StatusBar.show();
                (window as any).StatusBar.backgroundColorByHexString(AppConstants.DARKER_SECONDARY_COLOR);
            }
        });
        registerLocaleData(localePt, 'pt-BR');
    }
}
