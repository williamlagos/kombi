/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { App, IonicPage, NavController, Platform, PopoverController, ActionSheetController, ModalController } from "ionic-angular";

import { AppGlobals } from "@app/app.globals";
import { AppLocales } from "@app/app.locales";

import { MarsAuthService } from "@services/auth.service";
import { MarsInteractionService } from "@services/interaction.service";
import { MarsNavigationService } from "@services/navigation.service";

import { Backend } from "@backend/index";
import { PaginationInstance } from "ngx-pagination";
import { MarsGeolocationService } from "@services/geolocation/geolocation.service";


import * as moment from "moment-mini";

@IonicPage({
	segment: "merchant-calendar",
	priority: "high"
})

@Component({
	selector: "page-merchant-calendar",
	templateUrl: "merchant-calendar.html"
})

export class MerchantCalendarPage {

	navigationService: MarsNavigationService;
	translations: AppTranslations;
	keyword = "";
	orders: Array<any>;
	token: string;
	location: any;
	pagination: PaginationInstance = {
		itemsPerPage: 4,
		currentPage: 1
	};

	constructor(
		private platform: Platform,
		private app: App,
		private navCtrl: NavController,
		private popoverCtrl: PopoverController,
		private changeDetector: ChangeDetectorRef,
		private globals: AppGlobals,
		private locales: AppLocales,
		private authService: MarsAuthService,
		private geolocationService: MarsGeolocationService,
		private interactionService: MarsInteractionService,
		private modalCtrl: ModalController) {
		this.navigationService = new MarsNavigationService(this.app);
		this.navigationService.setNavCtrl(this.navCtrl);
		this.translations = this.locales.load();
	}

	async ionViewWillEnter() {
		this.getJobsList();
	}

	async getJobsList() {
		try {
			this.orders = (await Backend.getOrders({ xAccessToken: MarsAuthService.getMarsToken() })).data;
		} catch (e) {
			console.log(e);
			this.interactionService.alert(this.translations.server_failure);
			this.orders = [];
		} finally {
			this.changeDetector.detectChanges();
		}
	}

	showJobDetailsFor(order) {
		if (order.status == "started") {
			this.navigationService.goTo("JobDirectionsPage", {
				orderId: order._id,
			});
		} else {
			this.navigationService.goTo("JobDetailsPage", {
				orderId: order._id,
				action: 'view'
			});
		}

	}
}