/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Input mask directive.
 *  Special thanks to Márcio Casale de Souza <contato@kazale.com> for the kzMask on which marsMask was based on.
 */

import { Directive, Input, Output, HostListener } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Directive({
    selector: "[mars-mask]"
})

export class MarsMaskDirective {

    private MASK_PLACEHOLDER_CHARACTER = "_";
    private OPTIONAL_CHARACTER_MARK = "[";

    @Input("mars-mask") marsMask: string;
    @Input() ngModel;
    @Output() ngModelChange = new EventEmitter();

    @HostListener("keyup", ["$event"])
    onKeyup($event: any) {

        let currentValue = $event.target.value.replace(/\D/g, "");
        let maskPlaceholder = this.marsMask.replace(/\D/g, "").replace(/9/g, "_");
        let maskTemplateValue = currentValue + maskPlaceholder.substring(0, maskPlaceholder.length - currentValue.length);
        let userPressedBackspace = ("" + $event.keyCode) == "8";

        let maskTemplateValueIndex = 0;
        let currentCharIsANumber = false;
        let updatedValue = "";
        for (let i = 0; i < this.marsMask.length; i++) {
            currentCharIsANumber = !(isNaN(parseInt(this.marsMask.charAt(i))));
            if (currentCharIsANumber) {
                updatedValue += maskTemplateValue[maskTemplateValueIndex++];
            } else {
                updatedValue += this.marsMask.charAt(i);
            }
        }

        let maskPlaceholderCharacterIndex = updatedValue.indexOf(this.MASK_PLACEHOLDER_CHARACTER);
        let inputValueIsCompletelyField = !(maskPlaceholderCharacterIndex > -1);
        if (!inputValueIsCompletelyField) {
            updatedValue = updatedValue.substr(0, maskPlaceholderCharacterIndex);
        }

        if (userPressedBackspace) {
            let lastCharIsANumber = !(isNaN(parseInt(updatedValue[updatedValue.length - 1])));
            if (lastCharIsANumber)
                updatedValue = updatedValue.substring(0, updatedValue.length - 1);
            else {
                let lastNumberIndex = this.getLastNumberIndex(updatedValue);
                updatedValue = updatedValue.substring(0, lastNumberIndex + 1);
            }
        }

        this.ngModelChange.emit(updatedValue);
        $event.target.value = updatedValue;
    }

    getLastNumberIndex(str: string) {
        let char = "";
        let charIsANumber = false;
        let lastNumberIndex = -1;
        for (let i = 0; i < str.length; i++) {
            char = str[i];
            charIsANumber = !(isNaN(parseInt(char)));
            if (charIsANumber)
                lastNumberIndex = i;
        }
        return lastNumberIndex;
    }
}
