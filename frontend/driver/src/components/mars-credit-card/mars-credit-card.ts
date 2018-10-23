/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Credit card component.
 */

import { ChangeDetectorRef, Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as moment from "moment-mini";
import { NgForm } from '@angular/forms';

@Component({
    selector: 'mars-credit-card',
    templateUrl: 'mars-credit-card.html'
})
export class MarsCreditCardComponent {
    expirationMonths: Array<any>;
    expirationYears: Array<any>;
    availableBrands: Array<any>;
    showBack: boolean;
    @Input("card") card: Array<any>;
    @Input("exclude-fields") excludedFields: Array<any> = [];

    @ViewChild("cardForm") public form: NgForm;

    constructor(public changeDetector: ChangeDetectorRef) { }

    ngOnInit() { 
        this.initExpirationOptions();
    }

    getPhoneMask(phone) {
        return (phone && phone.length > 14) ? '(99) 99999-9999' : '(99) 9999-9999'
    }

    getDocumentMask(documentType: string) {
        return documentType == "CNPJ" ? "99.999.999/9999-99" : "999.999.999-99";
    }

    async initExpirationOptions() {
        let expiration = {
            months: [],
            years: []
        };
        for (let month = 1; month <= 12; month++) {
            expiration.months.push(this.pad(month));
        }
        for (let year = 0; year <= 30; year++) {
            expiration.years.push(moment().add(year, "years").format("YYYY"));
        }
        this.expirationMonths = expiration.months;
        this.expirationYears = expiration.years;
        this.changeDetector.detectChanges();
    }

    pad(num) {
        return (num < 10) ? '0' + num.toString() : num.toString();
    }
}
