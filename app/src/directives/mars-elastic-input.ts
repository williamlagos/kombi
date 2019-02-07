/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Elastic input directive.
 */

import { Directive, HostListener, ViewContainerRef, Input } from "@angular/core";
import { NgModel } from "@angular/forms";

@Directive({
    selector: "[mars-elastic-input]"
})

export class MarsElasticInputDirective {
    constructor(public _view: ViewContainerRef, public model: NgModel) { }

    ngOnInit() {
        this.model.valueChanges.subscribe(() => { this.updateElementHeight(); });
        window.addEventListener("resize", () => { setTimeout(() => { this.updateElementHeight() }, 250); });
    }

    updateElementHeight() {
        let nativeElement = this._view.element.nativeElement.firstElementChild;
        nativeElement.style.overflow = "hidden";
        nativeElement.style.height = "auto";
        nativeElement.style.height = (nativeElement.scrollHeight) + "px";
    }

}
