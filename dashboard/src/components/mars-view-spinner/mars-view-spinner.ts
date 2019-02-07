/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Spinner component.
 */

import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
@Component({
    selector: "mars-view-spinner",
    templateUrl: "mars-view-spinner.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MarsViewSpinnerComponent {
    
    constructor(private changeDetector: ChangeDetectorRef) { }
    
    ngOnInit() { }

}
