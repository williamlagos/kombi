/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController } from "@ionic/angular";
import * as moment from "moment-mini";
import { of } from "rxjs";

@IonicPage()
@Component({
	selector: "add-event-modal",
	templateUrl: "add-event-modal.html",
})
export class AddEventModal {

	event = {
		startTime: new Date().toISOString(),
		endTime: new Date().toISOString(),
		allDay: false,
		room: {}
	};
	minDate = new Date().toISOString();
	rooms$ = of([{ id: "room1", name: "room1" }, { id: "room2", name: "room2" }, { id: "room3", name: "room3" }])

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController) {
		let preselectedDate = moment(this.navParams.get("selectedDay")).format();
		this.event.startTime = preselectedDate;
		this.event.endTime = preselectedDate;
	}

	cancel() {
		this.viewCtrl.dismiss();
	}

	save() {
		this.viewCtrl.dismiss(this.event);
	}

	blockDay($event) {
		console.log($event)
	}

	optionSelected($event) {
		console.log($event)
		this.event.room = $event
	}
}