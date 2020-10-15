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

    constructor(private globals: AppGlobals) { };

    initialize() {
        if (MarsViewService.screenIsDesktopSized()) return;
        let heightDifference;
        this.initialViewHeight = window.innerHeight; 
        window.addEventListener("resize", () => {
            heightDifference = Math.abs(this.initialViewHeight - window.innerHeight); 
            if (heightDifference > 0 && heightDifference > this.KEYBOARD_MIN_SIZE) {
                this.shown.emit(); 
                this.globals.keyboardIsUp = true; 
            } else {
                this.hidden.emit(); 
                this.globals.keyboardIsUp = false; 
            }
        });
    }
}
