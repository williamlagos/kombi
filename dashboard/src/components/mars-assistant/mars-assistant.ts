/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Assistant with message.
 */

import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";

@Component({
    selector: "mars-assistant",
    templateUrl: "mars-assistant.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MarsAssistantComponent {
    
    @Input("message") message: string;

    constructor(private changeDetector: ChangeDetectorRef) { }
}
