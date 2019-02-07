import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { Directive } from '@angular/core';
import * as CNPJ from "@fnando/cnpj";

@Directive({
    selector: '[mars-cnpj][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: MarsCnpjValidator,
            multi: true
        }
    ]
})
export class MarsCnpjValidator implements Validator {
    validate(control: FormControl) {
        let cnpj = control.value;
        if (cnpj && !CNPJ.isValid(cnpj)) {
            return { cnpj: { error: "Whoops! This cnpj number is not valid ;)" } }
        }
        return null;
    };
}