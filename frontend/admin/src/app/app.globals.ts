/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Application global variables.
 */

import { Injectable } from "@angular/core";
import { AppLocales } from "./app.locales";

@Injectable()
export class AppGlobals {

  translations: AppTranslations;

  package: string = "admin";
  hideNavbar: boolean = false;
  keyboardIsUp: boolean = false;
  disableNavigation: boolean = false;
  rootTabs: Array<any> = [];
  userPages: Array<any> = [];
  adminInfoPages: Array<any> = [];
  customerInfoPages: Array<any> = [];
  merchantInfoPages: Array<any> = [];
  ongInfoPages: Array<any> = [];
  currentHomeMap: google.maps.Map;
  notifications: Array<any> = [];
  pendingNotifications: Array<any> = [];
  mapMarkerIcon = "la-paw";
  orderNotificationsBadge: number;
  paymentInstrument: any;

  
  orderAddress: any = { street: "" };
  currentLocation: any = { street: "" };
  currentAddress: any = { street: "" };

  
  hasPendingOrders: boolean = false;
  currentOauthUser: any;
  merchantKeyword: string;
  isPlacingOrder: any;

  constructor(public locales: AppLocales) {
    this.translations = this.locales.load();
  }
}
