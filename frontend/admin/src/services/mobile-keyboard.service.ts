/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Mobile keyboard service.
 */

import { Platform } from "ionic-angular";
import { Injectable, EventEmitter } from "@angular/core";
import { MarsViewService } from "@services/view.service";
import { AppGlobals } from "@app/app.globals";

@Injectable()
export class MarsMobileKeyboardService {

    initialViewHeight;
    KEYBOARD_MIN_SIZE = 100;
    shown: EventEmitter<any> = new EventEmitter<any>();
    hidden: EventEmitter<any> = new EventEmitter<any>();

    constructor(public globals: AppGlobals) { };

    initialize() {
        if (MarsViewService.screenIsDesktopSized()) return;
        let heightDifference;
        this.initialViewHeight = window.innerHeight; // Stores the view height for comparsion purposes
        window.addEventListener("resize", () => {
            heightDifference = Math.abs(this.initialViewHeight - window.innerHeight); // Checks the height diff
            if (heightDifference > 0 && heightDifference > this.KEYBOARD_MIN_SIZE) {
                this.shown.emit(); // Checks if keyboard is shown
                this.globals.keyboardIsUp = true; // Sets it on the global scope
            } else {
                this.hidden.emit(); // Otherwise, consider it hidden
                this.globals.keyboardIsUp = false; // Sets it on the global scope
            }
        });
    }
}
