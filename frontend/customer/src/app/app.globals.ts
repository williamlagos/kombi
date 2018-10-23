/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Application global variables.
 */

import { Injectable } from "@angular/core";
import { AppConstants } from "./app.constants";
import { AppLocales } from "./app.locales";

@Injectable()
export class AppGlobals {

  translations: AppTranslations;

  hideNavbar: boolean = false;
  keyboardIsUp: boolean = false;
  disableNavigation: boolean = false;
  mainPages: Array<any> = [];
  userPages: Array<any> = [];
  adminInfoPages: Array<any> = [];
  customerInfoPages: Array<any> = [];
  merchantInfoPages: Array<any> = [];
  ongInfoPages: Array<any> = [];
  currentHomeMap: google.maps.Map;
  notifications: Array<any> = [];
  pendingNotifications: Array<any> = [];
  mapMarkerIcon = "cube";
  orderNotificationsBadge: number;
  paymentInstrument: any;

  // Geolocation vars
  orderAddress: any = { street: "" };
  currentLocation: any = { street: "" };
  currentAddress: any = { street: "" };

  // Customer vars
  hasPendingOrders: boolean = false;
  currentOauthUser: any;
  merchantKeyword: string;
  isPlacingOrder: any;
  currentOrder: any = {
    items: [],
    amount: 0,
    payload: {
        receiptAddress: {}
    },
    job: {
      origin: { address: {}, items: [{ quantity: 1, description: "" }] },
      stops: [],
      destination: { address: {}, observations: "" },
    }
  };


  constructor(public locales: AppLocales) {
    this.translations = this.locales.load();
  }
}
