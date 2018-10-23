import { Injectable } from "@angular/core";

/**
 * @author @quitolabs.
 * @license MIT
 * @version 1.1.0
 * Service responsible for handling the app activity when it is on background mode.
 */

declare var Mars;

@Injectable()
export class AppConstants {

    static NAME = Mars.env.display_name;
    static CODENAME = Mars.env.codename;
    static APP_PACKAGE = Mars.env.cordova_package;

    static IS_DEVELOPMENT = Mars.env.IS_DEVELOPMENT;
    static SERVER_ADDRESS = Mars.env.SERVER_ADDRESS;
    static SOCKET_SERVER_ADDRESS = Mars.env.SOCKET_SERVER_ADDRESS;

    // Push constants
    static ONESIGNAL_APP_ID = Mars.env.ONESIGNAL_APP_ID;
    static GCM_SENDER_ID = Mars.env.GCM_SENDER_ID;

    // Oauth constants
    static FACEBOOK_CLIENT_ID = Mars.env.FACEBOOK_CLIENT_ID;
    static FACEBOOK_PICTURE_URL = "https://graph.facebook.com/userId/picture?width=200&height=200";
    static LINKEDIN_CLIENT_ID = Mars.env.LINKEDIN_CLIENT_ID;
    static TWITTER_CLIENT_ID = Mars.env.TWITTER_CLIENT_ID;
    static GOOGLE_CLIENT_ID = Mars.env.GOOGLE_CLIENT_ID;
    static IS_CORDOVA = window.location.href.indexOf("http") == -1;
    static OAUTH_REDIRECT = AppConstants.IS_CORDOVA ? AppConstants.SERVER_ADDRESS + "/assets/scripts/hellojs/redirect.html" : window.location.origin + "/assets/scripts/hellojs/redirect.html";

    // Library Constants
    static GOOGLE_MAPS_API_KEY = Mars.env.GOOGLE_MAPS_API_KEY;
    static GOOGLE_MAPS_LIB_URL = "https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places&v=3".replace("API_KEY", Mars.env.GOOGLE_MAPS_API_KEY);
    static GOOGLE_MAPS_MARKER_WITH_LABEL_URL = "assets/scripts/google-maps/markerwithlabel.js";
    static GOOGLE_MAPS_RICHMARKER_URL = "assets/scripts/google-maps/richmarker.js";
    static GEOLOCATOR_URL = "assets/scripts/misc/geolocator.min.js";
    static IP_INFO_URL = "http://ipinfo.io";
    static JS_CONSOLE_LIB_URL = "http://jsconsole.com/remote.js?CONSOLE_ID".replace("CONSOLE_ID", Mars.env.cordova_package);
    static ONESIGNAL_LIB_URL = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";
    static PACE_LIB_URL = "assets/scripts/pace.min.js";
    static PAGSEGURO_IMAGES_URL = "https://stc.pagseguro.uol.com.br//img";

    // Payment Constants
    static PAYMENT_SERVICE = Mars.env.PAYMENT_SERVICE;
    static CURRENCY_OPTIONS = { prefix: "R$ ", thousands: ".", decimal: "," };

    // Firebase Constants
    /*      static FIREBASE_API_KEY = Mars.env.FIREBASE_API_KEY;
         static FIREBASE_AUTH_DOMAIN = Mars.env.FIREBASE_AUTH_DOMAIN;
         static FIREBASE_DATABASE_URL = Mars.env.FIREBASE_DATABASE_URL;
         static FIREBASE_STORAGE_BUCKET = Mars.env.FIREBASE_STORAGE_BUCKET;
         static FIREBASE_SENDER_ID = Mars.env.FIREBASE_SENDER_ID; */

    static ADMIN_ROLE = Mars.constants.ADMIN_ROLE;
    static COMMON_ROLE = Mars.constants.COMMON_ROLE;
    static CUSTOMER_ROLE = Mars.constants.CUSTOMER_ROLE;
    static MERCHANT_ROLE = Mars.constants.MERCHANT_ROLE;
    static ONG_ROLE = Mars.constants.ONG_ROLE;
    static ORDER_NOTIFICATION = Mars.constants.ORDER_NOTIFICATION;
    static CURRENT_CART_ID = AppConstants.NAME.toUpperCase() + "_CURRENT_CART";

    constructor() { };
}